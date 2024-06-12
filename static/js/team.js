// MOuse trailer following
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) `,
  };

  trailer.animate(keyframes, {
    duration: 800,
    fill: "forwards",
  });
};
window.onmousemove = (e) => {
  const interactable = e.target.closest("#logo"),
    interacting = interactable !== null;

  animateTrailer(e, interacting);
  // trailer.dataset.type = interacting ? interactable.dataset.type : "";
};


// logo animation

const logo = document.getElementById("logo"),
  images = logo.querySelectorAll("img");

const getActive = () => document.body.dataset.active === "true",
  setActiveTo = (active) => (document.body.dataset.active = active);

const shift = (image, index, rangeX, rangeY) => {
  const active = getActive();

  const translationIntensity = active ? 24 : 4,
    maxTranslation = translationIntensity * (index + 1),
    currentTranslation = `${maxTranslation * rangeX}% ${
      maxTranslation * rangeY
    }%`;

  const scale = active ? 1 + index * 0.4 : 1;

  image.animate(
    {
      translate: currentTranslation,
      scale,
    },
    { duration: 750, fill: "forwards", easing: "ease" }
  );
};

const shiftAll = (images, rangeX, rangeY) => {
  images.forEach((image, index) => shift(image, index, rangeX, rangeY));
};
const shiftLogo = (e, images) => {
  const rect = logo.getBoundingClientRect(),
    radius = 1000;

  const centerX = rect.left + rect.width / 2,
    centerY = rect.top + rect.height / 2;

  const rangeX = (e.clientX - centerX) / radius,
    rangeY = (e.clientY - centerY) / radius;
  console.log(rect, radius, centerX, centerY, rangeX, rangeY);

  shiftAll(images, rangeX, rangeY);
};

const resetLogo = () => {
  setActiveTo(false);
  shiftAll(images, 0.4, -0.7);
};

// window.onmousemove = (e) => shiftLogo(e, images);

// document.body.onmouseleave = () => {
//   if (!getActive()) resetLogo();
// };

window.onmousedown = (e) => {
  setActiveTo(true);
  shiftLogo(e, images);
};

window.onmouseup = () => resetLogo();
resetLogo();


// navigation
let menuToggle = document.querySelector(".js-menu-btn");
let menuBar = gsap.timeline({ reversed: true });

menuBar.to(
  ".bar-1",
  0.5,
  {
    attr: { d: "M8,2 L2,8" },
    x: 1,
    ease: Power2.easeInOut,
  },
  "start"
);

menuBar.to(
  ".bar-2",
  0.5,
  {
    autoAlpha: 0,
  },
  "start"
);

menuBar.to(
  ".bar-3",
  0.5,
  {
    attr: { d: "M8,8 L2,2" },
    x: 1,
    ease: Power2.easeInOut,
  },
  "start"
);
menuBar.reversed();
let navT1 = gsap.timeline({ reversed: true });
navT1.to(
  ".fullpage-menu",
  {
    duration: 0,
    display: "block",
    ease: Expo.easeInOut,
  },
  "<"
);

navT1.to(
  ".menu-bg",
  {
    duration: 0.5,
    opacity: 1,
    ease: Expo.easeInOut,
  },
  "<"
);

navT1.from(
  ".main-menu li a",
  {
    duration: 1,
    y: "100%",
    rotateY: 30,
    stagger: 0.1,
    ease: Expo.easeInOut,
  },
  "-=0.5"
);

navT1.reversed();

menuToggle.addEventListener("click", function () {
  menuBar.reversed(!menuBar.reversed());
  navT1.reversed(!navT1.reversed());
});
