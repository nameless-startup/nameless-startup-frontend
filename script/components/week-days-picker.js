document.querySelectorAll(".days-picker").forEach((picker) => {
    const name = picker.dataset.name;
  
    const days = [
      { id: "sat", label: "شنبه" },
      { id: "sun", label: "یکشنبه" },
      { id: "mon", label: "دوشنبه" },
      { id: "tue", label: "سه‌شنبه" },
      { id: "wed", label: "چهارشنبه" },
      { id: "thu", label: "پنجشنبه" },
      { id: "fri", label: "جمعه" },
    ];
  
    let selected = [];
  
    picker.innerHTML = `
      <button type="button" class="days-trigger">
        <span>انتخاب روزها</span>
      </button>
  
      <div class="days-dropdown">
        <div class="days-list primary-scrollbar"></div>
      </div>
  
      <input type="hidden" name="${name}" />
    `;
  
    const trigger = picker.querySelector(".days-trigger");
    const dropdown = picker.querySelector(".days-dropdown");
    const list = picker.querySelector(".days-list");
    const hidden = picker.querySelector("input");
    const text = trigger.querySelector("span");
  
    function update() {
      const labels = days
        .filter((d) => selected.includes(d.id))
        .map((d) => d.label);
  
      text.textContent = labels.length ? labels.join("، ") : "انتخاب روزها";
      hidden.value = selected.join(",");
  
      list.querySelectorAll("button").forEach((btn) => {
        const id = btn.dataset.id;
        btn.classList.toggle("active", selected.includes(id));
      });
    }
  
    // =========================
    // DAYS ONLY (NO ALL WEEK)
    // =========================
    days.forEach((day) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.id = day.id;
      btn.textContent = day.label;
  
      btn.addEventListener("click", () => {
        if (selected.includes(day.id)) {
          selected = selected.filter((d) => d !== day.id);
        } else {
          selected.push(day.id);
        }
        update();
      });
  
      list.appendChild(btn);
    });
  
    // =========================
    // OPEN / CLOSE DROPDOWN
    // =========================
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