window.addEventListener("load", () => {
  // =========================
  // Categories Slider
  // =========================
  new Swiper(".categories-swiper", {
    observer: true,
    observeParents: true,

    slidesPerView: "auto",

    navigation: {
      nextEl: ".categories .swiper-button-next",
      prevEl: ".categories .swiper-button-prev",
    },

    breakpoints: {
      1000: {
        slidesPerView: 3,
      },

      1100: {
        slidesPerView: 4,
      },

      1200: {
        slidesPerView: 5,
      },

      1300: {
        slidesPerView: 6,
      },
    },
  });

// =========================
// Avatar Shell Slider
// =========================
let resumeTimeout = null;

const avatarSwiper = new Swiper(".avatar-swiper", {
  observer: true,
  observeParents: true,

  freeMode: true,

  loop: true,
  speed: 4500,
  slidesPerView: "auto",

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  navigation: {
    nextEl: ".avatar-shell .swiper-button-next",
    prevEl: ".avatar-shell .swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    560: {
      slidesPerView: 4,
    },
    660: {
      slidesPerView: 5,
    },
    768: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 6,
    },
    1300: {
      slidesPerView: 7,
    },
  },

  // ─── Auto‑resume after 2s ───
  on: {
    // Cancel pending resume when user starts interacting
    touchStart: function () {
      clearTimeout(resumeTimeout);
    },

    // Restart autoplay 2 seconds after touch/mouse drag ends
    touchEnd: function () {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        this.autoplay.start();
      }, 2000);
    },

    // Handles desktop clicks (also fires on touch devices after touchEnd)
    click: function () {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        this.autoplay.start();
      }, 2000);
    },
  },
});

  // =========================
  // Minimal Slider
  // =========================
  document.querySelectorAll(".minimal-swiper").forEach((slider) => {
    new Swiper(slider, {
      observer: true,
      observeParents: true,

      slidesPerView: 5,
      spaceBetween: 15,

      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        type: "progressbar",
      },

      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 5,
        },

        480: {
          slidesPerView: 2,
          spaceBetween: 5,
        },

        676: {
          slidesPerView: 3,
          spaceBetween: 5,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 3,
        },

        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },

        1300: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
      },
    });
  });

  // =========================
  // Campaign Slider
  // =========================
  document.querySelectorAll(".campaign-swiper").forEach((slider) => {
    new Swiper(slider, {
      observer: true,
      observeParents: true,

      slidesPerView: 5,
      spaceBetween: 15,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        type: "progressbar",
      },

      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 5,
        },

        400: {
          slidesPerView: 2.3,
          spaceBetween: 5,
        },

        676: {
          slidesPerView: 3,
          spaceBetween: 5,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 3,
        },

        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },

        1300: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
      },
    });
  });

  // =========================
  // Shops Slider
  // =========================
  document.querySelectorAll(".shops-swiper").forEach((slider) => {
    new Swiper(slider, {
      observer: true,
      observeParents: true,

      slidesPerView: 4,
      spaceBetween: 15,

      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 5,
        },

        480: {
          slidesPerView: 2,
          spaceBetween: 5,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 5,
        },

        1124: {
          slidesPerView: 3,
          spaceBetween: 10,
        },

        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
    });
  });

  // =========================
  // Showcase Slider
  // =========================
  document.querySelectorAll(".showcase-swiper").forEach((slider) => {
    new Swiper(slider, {
      observer: true,
      observeParents: true,

      loop: true,

      slidesPerView: 4,
      spaceBetween: 15,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 5,
        },

        530: {
          slidesPerView: 2,
          spaceBetween: 5,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 5,
        },

        1124: {
          slidesPerView: 3,
          spaceBetween: 10,
        },

        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
    });
  });
  // =========================
  // Login ad Slider
  // =========================
  document.querySelectorAll(".reviews").forEach((slider) => {
    new Swiper(slider, {
      observer: true,
      observeParents: true,

      loop: true,

      spaceBetween: 25,

      slidesPerView: 3,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },

        680: {
          slidesPerView: 2,
        },

        1124: {
          slidesPerView: 3,
        },

        1200: {
          slidesPerView: 4,
        },
      },

      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  });
  document.querySelectorAll(".login-ad-swiper").forEach((slider) => {
    new Swiper(slider, {
      observer: true,
      observeParents: true,

      loop: true,

      spaceBetween: 25,

      slidesPerView: 1,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  });
  // =========================
  // Plans Slider
  // =========================
  new Swiper(".plans-swiper", {
    observer: true,
    observeParents: true,

    navigation: {
      nextEl: ".plans-swiper .swiper-button-next",
      prevEl: ".plans-swiper .swiper-button-prev",
    },

    pagination: {
      el: ".plans-swiper .swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 2,
      },

      480: {
        slidesPerView: 2,
      },

      768: {
        slidesPerView: 3,
      },

      1200: {
        slidesPerView: 4,
      },
    },
  });
  // =========================
  // Plan Slider
  // =========================
  new Swiper(".plan-swiper", {
    observer: true,
    observeParents: true,
    spaceBetween: 25,

    navigation: {
      nextEl: ".plan-swiper .swiper-button-next",
      prevEl: ".plan-swiper .swiper-button-prev",
    },

    pagination: {
      el: ".plan-swiper .swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },

      480: {
        slidesPerView: 2,
      },

      768: {
        spaceBetween: 15,
        slidesPerView: 3,
      },

      1200: {
        slidesPerView: 4,
      },
    },
  });
  // =========================
  // Product Gallery
  // =========================
  const thumbsSwiper = document.querySelector(".product-gallery-thumbs");

  if (thumbsSwiper) {
    const galleryThumbs = new Swiper(".product-gallery-thumbs", {
      observer: true,
      observeParents: true,

      spaceBetween: 8,

      slidesPerView: 5,

      watchSlidesProgress: true,

      breakpoints: {
        0: {
          slidesPerView: 4,
        },

        768: {
          slidesPerView: 5,
        },

        1024: {
          slidesPerView: 6,
        },
      },
    });

    const galleryMain = new Swiper(".product-gallery-main", {
      observer: true,
      observeParents: true,

      spaceBetween: 10,

      navigation: {
        nextEl: ".gallery-next",
        prevEl: ".gallery-prev",
      },

      thumbs: {
        swiper: galleryThumbs,
      },

      on: {
        init(swiper) {
          const total = document.getElementById("gallery-total");
          const current = document.getElementById("gallery-current");

          if (total) total.textContent = swiper.slides.length;
          if (current) current.textContent = swiper.realIndex + 1;
        },

        slideChange(swiper) {
          const current = document.getElementById("gallery-current");

          if (current) {
            current.textContent = swiper.realIndex + 1;
          }
        },
      },
    });
  }
  // =========================
// Related Products Slider
// =========================
document.querySelectorAll(".related-products-swiper").forEach((slider) => {
  new Swiper(slider, {
    observer: true,
    observeParents: true,

    slidesPerView: 3,
    spaceBetween: 15,

    pagination: {
      el: slider.querySelector(".swiper-pagination"),
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },
  });
});
});
