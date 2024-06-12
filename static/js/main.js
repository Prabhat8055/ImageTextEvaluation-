// configuration
gsap.config({
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
  units: { left: "%", top: "%", rotation: "rad" },
});
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

// main sections
const container = document.querySelector(".wrapper");
const sections = gsap.utils.toArray(".wrapper section");

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".scroller",
    pin: true,
    scrub: 1,
    end: "+=4100",
    snap: 1 / (sections.length - 1),
  },
});

sections.forEach((section) => {
  let text = section.querySelectorAll(".anim");
  gsap.from(text, {
    y: -130,
    opacity: 0,
    duration: 3,
    ease: "elastic",
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      scrub: 1,
      containerAnimation: scrollTween,
      start: "left center",
    },
  });
});

// 4 images  animation on start
let images_anim = document.querySelectorAll(".magnets");
gsap.fromTo(
  ".magnets",
  { y: -150, opacity: 0 },
  {
    y: 0,
    duration: 2,
    opacity: 1,
    duration: 1,
    ease: "elastic.out(1,0.3)",
    stagger: 0.1,
  }
);
gsap.fromTo(
  ".item1-h1",
  { fontSize: "1rem" },
  {
    fontSize: "5rem",
    duration: 1,
    ease: "power3.out",
    stagger: 0.1,
  }
);

// page3 cards animation on scroll
let imageContainer = document.querySelector(".card-container");
const section = document.querySelector(".page3");

// gsap.from(imageContainer, {
//   yPercent: 100,
//   opacity: 0,
//   duration: 2.5,
//   ease: "power2.out",
//   stagger: 0.1,
//   scrollTrigger: {
//     trigger: section,
//     scrub: 1,
//     containerAnimation: scrollTween,
//     start: "left center",
//   }
// });
// gsap.to(imageContainer,{
//   yPercent: 100,
//   opacity: 0,
//   ease: "bounce.out",
// })
gsap.fromTo(
  imageContainer,
  {
    yPercent: 100,
    opacity: 0,
    duration: 2.5,
    ease: "circ.out",

  },
  {
    yPercent: -20,
    opacity: 1,
    duration: 1,
    ease: "circ.out",
    scrollTrigger: {
      trigger: section,
      scrub: 1,
      containerAnimation: scrollTween,
      stop: " left center",
    },
  }
);
