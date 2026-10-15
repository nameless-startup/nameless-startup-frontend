document.querySelectorAll(".time-picker").forEach((picker) => {
  const name = picker.dataset.name;

  let selectedHour = "09";
  let selectedMinute = "00";

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  function toPersianNumber(input) {
    return String(input)
      .split("")
      .map((char) => {
        const digit = Number(char);
  
        if (Number.isNaN(digit)) return char;
  
        return persianDigits[digit];
      })
      .join("");
  }
  const formatTime = () => `${selectedHour}:${selectedMinute}`;

  picker.innerHTML = `
    <button type="button" class="time-picker-trigger">
      <span>${toPersianNumber(formatTime())}</span>
    </button>

    <div class="time-picker-dropdown">

      <div class="time-picker-header">
        <div>ساعت</div>
        <div>دقیقه</div>
      </div>

      <div class="time-picker-columns">
        <div class="time-picker-hours"></div>
        <div class="time-picker-minutes"></div>
      </div>

    </div>

    <input type="hidden" name="${name}" value="${formatTime()}" />
  `;

  const trigger = picker.querySelector(".time-picker-trigger");
  const valueText = trigger.querySelector("span");
  const dropdown = picker.querySelector(".time-picker-dropdown");
  const hoursContainer = picker.querySelector(".time-picker-hours");
  const minutesContainer = picker.querySelector(".time-picker-minutes");
  const hiddenInput = picker.querySelector("input");

  // ===============================
  // HOURS (24H ONLY)
  // ===============================

  for (let h = 0; h < 24; h++) {
    const hour = String(h).padStart(2, "0");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = toPersianNumber(hour);

    btn.addEventListener("click", () => {
      selectedHour = hour;
      update();
    });

    hoursContainer.appendChild(btn);
  }

  // ===============================
  // MINUTES
  // ===============================

  ["00", "15", "30", "45"].forEach((minute) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = toPersianNumber(minute);

    btn.addEventListener("click", () => {
      selectedMinute = minute;
      update();
    });

    minutesContainer.appendChild(btn);
  });

  function update() {
    const value = formatTime();

    valueText.textContent = toPersianNumber(value);
    hiddenInput.value = value;

    hoursContainer.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.textContent === toPersianNumber(selectedHour)
      );
    });

    minutesContainer.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.textContent === toPersianNumber(selectedMinute)
      );
    });
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!picker.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });

  update();
});