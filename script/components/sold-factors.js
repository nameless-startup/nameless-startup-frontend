document.querySelectorAll(".sold-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".sold-item");
      const details = item.querySelector(".sold-details");
  
      // Close all other items (optional)
      document.querySelectorAll(".sold-item").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
  
          const otherButton = otherItem.querySelector(".sold-toggle");
          const otherDetails = otherItem.querySelector(".sold-details");
  
          otherButton.classList.remove("bg-background-alt");
          otherDetails.style.maxHeight = "0px";
        }
      });
  
      // Toggle current item
      if (item.classList.contains("active")) {
        item.classList.remove("active");
  
        button.classList.remove("bg-background-alt");
  
        details.style.maxHeight = "0px";
      } else {
        item.classList.add("active");
  
        button.classList.add("bg-background-alt");
  
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
  });