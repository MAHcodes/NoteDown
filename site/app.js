gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  defaults: {
    duration: 2,
    ease: Power4.easeOut,
  },
});

tl.from(".fadein", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  y: -50,
  opacity: 0,
  stagger: 0.25,
})
  .from(".preview", { y: 40, scale: 0.95, opacity: 0 }, "-=2.5")
  .from(".delay", { opacity: 0, duration: 2.5 }, "-=1.25");

//const prev = document.querySelector(".preview img");
//prev.addEventListener(
//"mousemove",
//debounce((e) => {
//prev.style.transform = "rotate3d(1,1,1,1deg)";
//}, 16)
//);

//function debounce(func, timeout = 50) {
//let timeoutID;
//return function (...args) {
//if (timeoutID) clearTimeout(timeoutID);
//timeoutID = setTimeout(() => {
//func(...args);
//}, timeout);
//};
//}

const tl2 = gsap.timeline({
  defaults: {
    ease: Power4.easeOut,
  },
});

tl2
  .to(".features__ul > li", {
    color: "#000",
    duration: 2,
    stagger: 2,
    x: 10,
    scale: 1.5,
  })
  .to(
    ".features__ul > li",
    {
      color: "#aaa",
      duration: 2,
      stagger: 2,
      scale: 1,
      x: 0,
    },
    "-=6"
  );

ScrollTrigger.create({
  animation: tl2,
  trigger: "#Features",
  start: "top top",
  scrub: true,
  pin: true,
  anticipatePin: 1,
});
