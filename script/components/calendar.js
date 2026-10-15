const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");

const startDateEl = document.getElementById("startDate");
const endDateEl = document.getElementById("endDate");
const daysCountEl = document.getElementById("daysCount");
const totalPriceEl = document.getElementById("totalPrice");

const PRICE_PER_DAY = 350000;

let currentDate = new Date();

let startDate = null;
let endDate = null;
let rangeSet = new Set();

const bookedDates = [
  "2026-06-10",
  "2026-06-11",
  "2026-06-18",
  "2026-06-22"
];

/* =========================
   DATE KEY
========================= */
function toKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* =========================
   BOOKED
========================= */
function isBooked(dateStr) {
  return bookedDates.includes(dateStr);
}

/* =========================
   RANGE BUILD
========================= */
function buildRange(start, end) {
  const result = new Set();

  let current = new Date(start);
  const last = new Date(end);

  current.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  while (current <= last) {
    result.add(toKey(current));
    current.setDate(current.getDate() + 1);
  }

  return result;
}

/* =========================
   RANGE CHECK
========================= */
function hasBookedInRange(start, end) {
  let temp = new Date(start);
  const last = new Date(end);

  temp.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);

  while (temp <= last) {
    if (isBooked(toKey(temp))) return true;
    temp.setDate(temp.getDate() + 1);
  }

  return false;
}

/* =========================
   PRICE FORMAT
========================= */
function formatPrice(value) {
  return value.toLocaleString("en-US");
}

/* =========================
   RENDER
========================= */
function renderCalendar() {
  calendarDays.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent =
    currentDate.toLocaleString("fa-IR", {
      month: "long",
      year: "numeric"
    });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const key = toKey(date);

    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;

    if (isBooked(key)) cell.classList.add("disabled");
    if (rangeSet.has(key)) cell.classList.add("in-range");

    if (key === startDate || key === endDate) {
      cell.classList.add("selected");
    }

    cell.addEventListener("click", () => handleSelect(key));

    calendarDays.appendChild(cell);
  }
}

/* =========================
   HANDLE SELECT (FIXED TOGGLE)
========================= */
function handleSelect(dateStr) {
  if (isBooked(dateStr)) return;

  /* ✅ CLICK SAME START DATE => CLEAR EVERYTHING */
  if (startDate && !endDate && dateStr === startDate) {
    startDate = null;
    endDate = null;
    rangeSet = new Set();
    renderCalendar();
    updateSummary();
    return;
  }

  /* RESET FLOW */
  if (!startDate || (startDate && endDate)) {
    startDate = dateStr;
    endDate = null;
    rangeSet = new Set();
    renderCalendar();
    updateSummary();
    return;
  }

  let start = new Date(startDate);
  let end = new Date(dateStr);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (end < start) {
    [start, end] = [end, start];
  }

  if (hasBookedInRange(start, end)) return;

  startDate = toKey(start);
  endDate = toKey(end);

  rangeSet = buildRange(start, end);

  renderCalendar();
  updateSummary();
}

/* =========================
   SUMMARY
========================= */
function updateSummary() {
  if (!startDate) {
    startDateEl.textContent = "—";
    endDateEl.textContent = "—";
    daysCountEl.textContent = 0;
    totalPriceEl.textContent = "0";
    return;
  }

  startDateEl.textContent = startDate;

  if (endDate) {
    endDateEl.textContent = endDate;

    const days =
      (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24) +
      1;

    const total = days * PRICE_PER_DAY;

    daysCountEl.textContent = days;
    totalPriceEl.textContent = `${formatPrice(total)} `;
  } else {
    endDateEl.textContent = "—";
    daysCountEl.textContent = 1;
    totalPriceEl.textContent = `${formatPrice(PRICE_PER_DAY)} `;
  }
}

/* =========================
   NAV
========================= */
document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
updateSummary();