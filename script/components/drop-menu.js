const selects = document.querySelectorAll("[data-select]");

selects.forEach((select) => {
  const trigger = select.querySelector(".select-trigger");
  const text = select.querySelector(".select-text");
  const options = select.querySelectorAll(".select-option");
  const hiddenInput = select.querySelector("input");

  trigger.addEventListener("click", () => {
    document.querySelectorAll(".custom-select").forEach((item) => {
      if (item !== select) {
        item.classList.remove("active");
      }
    });

    select.classList.toggle("active");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;
      const label = option.textContent;

      text.textContent = label;
      hiddenInput.value = value;

      select.classList.remove("active");
    });
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select")) {
    document.querySelectorAll(".custom-select").forEach((select) => {
      select.classList.remove("active");
    });
  }
});