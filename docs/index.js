let today = new Date();
let cMonth = today.getMonth();
let cYear = today.getFullYear();
let dayArray = [];
let daysFromTo = [-1, -1];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function daysDiference(f, l) {
  const diffTime = Math.abs(f - l);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

function renderCalendar() {
  const monthAndYear = document.getElementById("current-month-year");
  monthAndYear.innerText = months[cMonth] + " " + cYear;

  const lastPriorMonthDay = new Date(cYear, cMonth, 0);
  const lWeekDay = lastPriorMonthDay.getDay() + 1;

  const daysOfMonth = daysDiference(
    new Date(cYear, cMonth, 1),
    new Date(cYear, cMonth + 1, 0)
  );
  const daysOfPriorMonth = daysDiference(
    new Date(cYear, cMonth - 1, 1),
    lastPriorMonthDay
  );

  dayArray = [];

  for (let i = lWeekDay - 1; i > -1; i--) {
    dayArray.push({
      day: daysOfPriorMonth - i,
      month: (cMonth === 0 ? 11 : cMonth - 1) + 1,
      year: cMonth === 0 ? cYear - 1 : cYear,
    });
  }

  for (let i = 1; i <= daysOfMonth; i++) {
    dayArray.push({ day: i, month: cMonth + 1, year: cYear });
  }

  const d = 42 - dayArray.length;

  for (let i = 1; i <= d; i++) {
    dayArray.push({
      day: i,
      month: ((cMonth + 1) % 12) + 1,
      year: cMonth === 11 ? cYear + 1 : cYear,
    });
  }

  const days = document.getElementById("days");
  days.innerHTML = "";

  dayArray.forEach((a, i) => {
    let day = document.createElement("div");
    day.dataset.date = Object.values(a).join("/");
    day.classList.add("sq");
    if (day.dataset.date === new Date().toLocaleDateString()) {
      day.classList.add("today");
    }
    day.id = "cel-" + i;
    day.innerText = a.day;
    day.addEventListener("click", function () {
      const index = i;

      day.classList.toggle("day-of");

      const isSelected = day.classList.contains("day-of");

      if (isSelected && !daysFromTo.includes(index)) {
        daysFromTo[0] = daysFromTo[1];
        daysFromTo[1] = index;
      } else {
        daysFromTo[1] = daysFromTo[0] !== index ? daysFromTo[0] : daysFromTo[1];
        daysFromTo[0] = -1;
      }

      daysFromTo = daysFromTo.sort((a, b) => a - b);

      for (let i = 0; i < 42; i++) {
        const cel = document.getElementById("cel-" + i);
        if (daysFromTo[1] !== i && daysFromTo[0] !== i) {
          cel.classList.remove("day-of");
        }

        if (daysFromTo[0] > -1 && i <= daysFromTo[1] && i >= daysFromTo[0]) {
          cel.classList.add("selected");
        } else {
          cel.classList.remove("selected");
        }
      }
    });
    days.appendChild(day);
  });
}

function next() {
  cYear = cMonth === 11 ? cYear + 1 : cYear;
  cMonth = (cMonth + 1) % 12;
  renderCalendar();
}

function prior() {
  cYear = cMonth === 0 ? cYear - 1 : cYear;
  cMonth = cMonth === 0 ? 11 : cMonth - 1;
  renderCalendar();
}

renderCalendar();
