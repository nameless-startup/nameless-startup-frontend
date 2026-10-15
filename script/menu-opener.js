const menu = document.getElementById("account-menu");
const button = document.getElementById("account-menu-button");
const overlay = document.getElementById("account-menu-overlay");

function isOpen() {
  return menu.classList.contains("translate-x-none");
}

function openMenu() {
  // Open menu
  menu.classList.remove("xl-is-closed");
  menu.classList.add("is-open");

  // Show overlay
  overlay.classList.remove("hidden");

  // Lock scroll
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  // Close menu
  menu.classList.remove("is-open");
  menu.classList.add("xl-is-closed");

  // Hide overlay immediately (sync with transition)
  overlay.classList.add("hidden");

  // Unlock scroll
  document.body.style.overflow = "";
}

// Toggle button
button.addEventListener("click", (e) => {
  e.stopPropagation();

  if (isOpen()) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Click outside (optional safety layer)
document.addEventListener("click", (e) => {
  if (
    isOpen() &&
    !menu.contains(e.target) &&
    !button.contains(e.target)
  ) {
    closeMenu();
  }
});

// Overlay click closes menu
overlay.addEventListener("click", closeMenu);

// ESC key closes menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen()) {
    closeMenu();
  }
});