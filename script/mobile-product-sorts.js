// ===============================
// PRODUCTS MOBILE DRAWERS
// ===============================

const productsMobileOverlay = document.getElementById(
  "products-mobile-overlay"
);

// Category
const productsMobileCategoryDrawer = document.getElementById(
  "products-mobile-category-drawer"
);

const productsMobileCategoryTrigger = document.getElementById(
  "products-mobile-category-trigger"
);

// Filter
const productsMobileFilterDrawer = document.getElementById(
  "products-mobile-fitler-drawer"
);

const productsMobileFilterTrigger = document.getElementById(
  "products-mobile-fitler-trigger"
);

// Sort
const productsMobileSortDrawer = document.getElementById(
  "products-mobile-sort-drawer"
);

const productsMobileSortTrigger = document.getElementById(
  "products-mobile-sort-sorting"
);

// ===============================
// HELPERS
// ===============================

const allDrawers = [
  productsMobileCategoryDrawer,
  productsMobileFilterDrawer,
  productsMobileSortDrawer,
];

function isDrawerOpen(drawer) {
  return drawer?.classList.contains("swipe-in-bottom");
}

function openDrawer(drawer) {
  if (!drawer) return;

  // Close all other drawers
  allDrawers.forEach((item) => {
    if (item !== drawer && isDrawerOpen(item)) {
      closeDrawer(item, false);
    }
  });

  productsMobileOverlay?.classList.remove("hidden");

  drawer.classList.remove(
    "translate-y-bottom",
    "swipe-out-bottom"
  );

  drawer.classList.add("swipe-in-bottom");

  document.body.style.overflow = "hidden";
}

function closeDrawer(drawer, hideOverlay = true) {
  if (!drawer) return;

  drawer.classList.remove("swipe-in-bottom");
  drawer.classList.add("swipe-out-bottom");

  if (hideOverlay) {
    productsMobileOverlay?.classList.add("hidden");
    document.body.style.overflow = "";
  }

  setTimeout(() => {
    drawer.classList.add("translate-y-bottom");
  }, 400);
}

// ===============================
// CATEGORY
// ===============================

productsMobileCategoryTrigger?.addEventListener("click", (e) => {
  e.stopPropagation();

  if (isDrawerOpen(productsMobileCategoryDrawer)) {
    closeDrawer(productsMobileCategoryDrawer);
  } else {
    openDrawer(productsMobileCategoryDrawer);
  }
});

// ===============================
// FILTER
// ===============================

productsMobileFilterTrigger?.addEventListener("click", (e) => {
  e.stopPropagation();

  if (isDrawerOpen(productsMobileFilterDrawer)) {
    closeDrawer(productsMobileFilterDrawer);
  } else {
    openDrawer(productsMobileFilterDrawer);
  }
});

// ===============================
// SORT
// ===============================

productsMobileSortTrigger?.addEventListener("click", (e) => {
  e.stopPropagation();

  if (isDrawerOpen(productsMobileSortDrawer)) {
    closeDrawer(productsMobileSortDrawer);
  } else {
    openDrawer(productsMobileSortDrawer);
  }
});

// ===============================
// OVERLAY CLICK
// ===============================

productsMobileOverlay?.addEventListener("click", (e) => {
  if (e.target !== productsMobileOverlay) return;

  allDrawers.forEach((drawer) => {
    if (isDrawerOpen(drawer)) {
      closeDrawer(drawer);
    }
  });
});

// ===============================
// ESC KEY
// ===============================

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  allDrawers.forEach((drawer) => {
    if (isDrawerOpen(drawer)) {
      closeDrawer(drawer);
    }
  });
});