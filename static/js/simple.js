// Preloader
setTimeout(() => {
  const page = document.querySelector(".block-page");
  page.style.display = 'none';
}, 5000);

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

// ------------------------------------------------------------------------------------------

// magnetic home image
let boxes = document.querySelectorAll(".magnets");

boxes.forEach((box) => {
  box.addEventListener("mousemove", (e) => {
    let rect = box.getBoundingClientRect();
    let x = e.clientX - rect.left - rect.width / 2;
    let y = e.clientY - rect.top - rect.height / 2;
    box.style.transform = `translate(${x}px, ${y}px)`;
  });
  box.addEventListener("mouseout", (e) => {
    box.style.transform = "";
  });
});

// ------------------------------------------------------------------------------------------

// image revel on hover
const link = document.querySelectorAll(".link");
const linkHoverReveal = document.querySelectorAll(".hover-reveal");
const linkImages = document.querySelectorAll(".hidden-img");

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("mousemove", (e) => {
    linkHoverReveal[i].style.opacity = 1;
    linkHoverReveal[i].style.transform = `translate(-100%, -50% ) rotate(5deg)`;
    linkImages[i].style.transform = "scale(1,1)";
    linkHoverReveal[i].style.left = e.clientX + "px";
  });

  link[i].addEventListener("mouseleave", (e) => {
    linkHoverReveal[i].style.opacity = 0;
    linkHoverReveal[i].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
    linkImages[i].style.transform = "scale(0.8, 0.8)";
  });
}

// ------------------------------------------------------------------------------------------

// audio files on hover

// let clickDiv = document.querySelectorAll(".text-hover-sound");
// let heartbeat = document.getElementById("heartbeat");
// let audios = document.querySelectorAll("audio");
// console.log(audios);

// clickDiv.forEach((clickDiv) => {
//   clickDiv.addEventListener("mouseover", () => {
//     audios.forEach(function (audio) {
//       audio.play();
//     });
//   });
// }, false);

// clickDiv.forEach((e) => {
//   e.addEventListener("mouseleave", ()=> {
//     heartbeat.pause();
//     heartbeat.currentTime = 0;
//   });
// }, false);

// animating svg line semicircle
// let icon = document.querySelector("#drawable-illustration");

// if (icon) {
//   let paths = icon.querySelectorAll("path");
//   if (paths.length) {
//     for ([index, path] of paths.entries()) {
//       let pathLength = path.getTotalLength();
//       console.log(`Path #${index + 1}: ${pathLength}`);
//     }
//   }
// }

// navvigate to the team-page
// let  teamPage = document.getElementById("team-page");
// teamPage.addEventListener('click',()=>{
//  teamPage.href =  'team.html';
// })

// ------------------------------------------------------------------------------------------

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
