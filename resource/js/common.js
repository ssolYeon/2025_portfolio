/* gsap 등록 */
gsap.registerPlugin(ScrollTrigger);

/* lenis */
const lenis = new Lenis({
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// lenis.on("scroll", (e) => {
//   console.log(e);
// });

/* footer */
gsap.to(".footer-front", {
  height: "100%",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 40%",
    end: "top top",
    scrub: true,
    //markers: true,
  },
});
