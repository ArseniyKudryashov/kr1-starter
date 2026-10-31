const announcements = [
  { title: "Консультація з веб-технологій", category: "Навчання", date: "2026-10-28", urgent: false, text: "Ауд. 305, 14:00. Приносьте питання по PR." },
  { title: "Зміна розкладу на п'ятницю", category: "Адмін", date: "2026-10-30", urgent: true, text: "Пари переносяться на годину раніше." },
  { title: "Хакатон кафедри", category: "Події", date: "2026-11-14", urgent: false, text: "Реєстрація до 10 листопада. Команди по 3." },
  { title: "Здати залікові книжки", category: "Адмін", date: "2026-11-03", urgent: true, text: "Деканат, до 16:00." },
  { title: "Лекція гостя з індустрії", category: "Події", date: "2026-11-06", urgent: false, text: "Про роботу з ШІ-агентами в команді." },
  { title: "Дедлайн по лабораторній 5", category: "Навчання", date: "2026-10-31", urgent: true, text: "PR має бути злитий до пари." },
];

const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const select = document.querySelector("#category");

function render(items) {
  list.textContent = "";
  for (const a of items) {
    const li = document.createElement("li");
    li.className = "card";
    const tag = document.createElement("span");
    tag.className = a.urgent ? "tag urgent" : "tag";
    tag.textContent = a.category;
    const h3 = document.createElement("h3");
    h3.textContent = a.title;
    const date = document.createElement("time");
    date.dateTime = a.date;
    date.textContent = a.date;
    const p = document.createElement("p");
    p.textContent = a.text;
    li.append(tag, h3, date, p);
    list.append(li);
  }
  empty.hidden = items.length > 0;
}

function applyFilter() {
  const value = select.value;
  const filtered = value === "all" ? announcements : announcements.filter((a) => a.category.toLowerCase() === value);
  render(filtered);
}

select.addEventListener("change", applyFilter);
render(announcements);

// Блок «Державні свята України» (завдання 2)
// API: https://date.nager.at/api/v3/PublicHolidays/2026/UA
const holidaysBtn = document.querySelector("#holidays-btn");
const holidaysStatus = document.querySelector("#holidays-status");
const holidaysList = document.querySelector("#holidays-list");
function getTodayLocalISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
async function loadHolidays() {
  if (!holidaysBtn || !holidaysStatus || !holidaysList) {
    return;
  }
  holidaysBtn.disabled = true;
  holidaysStatus.textContent = "Завантажую…";
  try {
    const year = new Date().getFullYear();
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/UA`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const todayStr = getTodayLocalISO();
    const upcoming = Array.isArray(data)
      ? data
          .filter((h) => typeof h.date === "string" && h.date > todayStr)
          .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
          .slice(0, 3)
      : [];
    // Очищення перед рендером, щоб повторне натискання не дублювало список.
    holidaysList.textContent = "";
    if (upcoming.length === 0) {
      const li = document.createElement("li");
      li.className = "card";
      li.textContent = "До кінця року свят більше немає.";
      holidaysList.append(li);
    } else {
      for (const h of upcoming) {
        const li = document.createElement("li");
        li.className = "card";
        const time = document.createElement("time");
        time.dateTime = h.date;
        time.textContent = h.date;
        const span = document.createElement("span");
        span.textContent = ` — ${h.localName}`;
        li.append(time, span);
        holidaysList.append(li);
      }
    }
    holidaysStatus.textContent = "";
  } catch (error) {
    holidaysStatus.textContent = "Не вдалося завантажити свята. Перевірте з’єднання з інтернетом і спробуйте ще раз.";
  } finally {
    holidaysBtn.disabled = false;
  }
}
if (holidaysBtn) {
  holidaysBtn.addEventListener("click", loadHolidays);
}