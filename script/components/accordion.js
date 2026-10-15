document.querySelectorAll(".accordion").forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");
  
    items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      const content = item.querySelector(".accordion-content");
  
      trigger.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
  
        items.forEach((otherItem) => {
          otherItem.classList.remove("active");
  
          const otherContent =
            otherItem.querySelector(".accordion-content");
  
          otherContent.style.maxHeight = null;
        });
  
        if (!isActive) {
          item.classList.add("active");
  
          content.style.maxHeight =
            content.scrollHeight + "px";
        }
      });
    });
  });