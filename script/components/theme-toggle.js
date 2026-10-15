const html = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const logos = document.querySelectorAll(".theme-logo");

// =========================
// Update Theme
// =========================
function applyTheme(theme) {
  html.dataset.theme = theme;
  toggle.dataset.mode = theme;

  logos.forEach((logo) => {
    logo.src =
      theme === "dark"
        ? "assets/logo/chakod-white.png"
        : "assets/logo/chakod.png";
  });

  localStorage.setItem("theme", theme);
}

// =========================
// Initialize theme
// =========================
const savedTheme =
  localStorage.getItem("theme") ||
  html.dataset.theme ||
  "light";

applyTheme(savedTheme);

// =========================
// Theme Toggle
// =========================
toggle.addEventListener("click", () => {
  const switchTheme = () => {
    const current = html.dataset.theme;

    const next =
      current === "dark"
        ? "light"
        : "dark";

    applyTheme(next);
  };

  // Fallback for browsers without View Transitions
  if (!document.startViewTransition) {
    switchTheme();
    return;
  }

  const rect = toggle.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    switchTheme();
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 700,
        easing: "cubic-bezier(.76,0,.24,1)",
        pseudoElement: "::view-transition-new(root)"
      }
    );
  });
});