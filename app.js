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
  const filtered = value === "all" ? announcements : announcements.filter((a) => a.category === value);
  render(filtered);
}

select.addEventListener("change", applyFilter);
render(announcements);
