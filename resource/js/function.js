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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target, {
        offset: 0, // 필요 시 헤더 높이만큼 보정
        duration: 1.2, // 이동 시간
        easing: (t) => 1 - Math.pow(1 - t, 3), // 부드러운 커브
      });
    }
  });
});

/* cursor */
// const cursor = document.querySelector(".cursor");

// document.addEventListener("mousemove", (e) => {
//   cursor.style.left = `${e.clientX}px`;
//   cursor.style.top = `${e.clientY}px`;
// });

// document.addEventListener("mousedown", () => {
//   cursor.classList.add("active");
// });
// document.addEventListener("mouseup", () => {
//   cursor.classList.remove("active");
// });

/* header */
const navigation = document.querySelector(".navigation");
let prevScrollTop = 0;

window.addEventListener("scroll", function () {
  let nowScrollTop = this.window.scrollY;

  if (nowScrollTop > prevScrollTop) {
    navigation.classList.add("scrolled");
  } else {
    navigation.classList.remove("scrolled");
  }

  prevScrollTop = nowScrollTop;
});

/* bounce title */
const bounceBoxes = gsap.utils.toArray(".bounce_title");
bounceBoxes.forEach((box) => {
  const titleHidden = box.querySelector(".bounce_title .hidden");
  gsap.fromTo(
    titleHidden,
    { yPercent: 0 },
    {
      yPercent: 100,
      duration: 0.5,
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
        //markers: true,
      },
    }
  );
});

/* intro */
// intro : name path 길이 구하기
const namePath = document.querySelectorAll(".intro-name path");

namePath.forEach((item) => {
  const totalLength = item.getTotalLength();
  console.log(totalLength);
});

// intro : tl1
ScrollTrigger.matchMedia({
  "(min-width: 1025px)": function () {
    const tl1 = gsap.timeline();

    tl1
      .fromTo(".video-clip", { width: "50rem", borderRadius: "1.25rem 1.25rem 0 0" }, { width: "100%", borderRadius: "0", ease: "none", duration: 10 }, 0)
      .fromTo(".video-cover", { opacity: "0" }, { opacity: "1", ease: "none", duration: 10 }, 0)
      .to(".intro-name", { bottom: "17.5rem", ease: "none", duration: 10 }, 0);

    ScrollTrigger.create({
      animation: tl1,
      trigger: ".intro-video",
      start: "0% 40%",
      end: "top top",
      scrub: 1,
      onEnter: () => {
        document.querySelector("#nameSvg").classList.add("scrolled");
      },
      onLeaveBack: () => {
        document.querySelector("#nameSvg").classList.remove("scrolled");
      },
    });
  },

  "(max-width: 1024px)": function () {
    const tl1 = gsap.timeline();

    tl1
      .fromTo(".video-clip", { width: "85%", borderRadius: "1.25rem 1.25rem 0 0" }, { width: "100%", borderRadius: "0", ease: "none", duration: 10 }, 0)
      .fromTo(".video-cover", { opacity: "0" }, { opacity: "1", ease: "none", duration: 10 }, 0)
      .to(".intro-name", { bottom: "14rem", ease: "none", duration: 10 }, 0);

    ScrollTrigger.create({
      animation: tl1,
      trigger: ".intro-video",
      start: "0% 40%",
      end: "top top",
      scrub: 1,
      onEnter: () => {
        document.querySelector("#nameSvg").classList.add("scrolled");
      },
      onLeaveBack: () => {
        document.querySelector("#nameSvg").classList.remove("scrolled");
      },
    });
  },
});

// intro : tl2
const tl2 = gsap.timeline();
tl2.from(".intro-text .text1", { autoAlpha: 0, duration: 5, y: 50 }, "+=1").from(".intro-text .text2", { autoAlpha: 0, duration: 5, y: 50 }, "+=1");

ScrollTrigger.create({
  animation: tl2,
  trigger: ".intro-video",
  start: "top top",
  end: "+=1000",
  scrub: true,
  pin: true,
  anticipatePin: 1,
  onUpdate: (self) => {
    const name = document.querySelector(".intro-name");
    const text = document.querySelector(".intro-text");

    if (self.progress > 0.99) {
      name.style.position = "absolute";
      text.style.position = "absolute";
    } else {
      name.style.position = "";
      text.style.position = "";
    }
  },
});

/* project */
// project : 스크롤 시 이질감
gsap.to(".project-item", {
  yPercent: -30,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".project-list",
    start: "top 80%",
    end: "bottom 60%",
    scrub: true,
    // markers: true,
  },
  stagger: {
    each: 0.1, // 딜레이
    from: "start", // 시작 기준 (start, center, end, edges, random 등 가능)
  },
});

// project : hover 위치에 따라 반응
const pdLinks = document.querySelectorAll(".project-link");
pdLinks.forEach((link) => {
  link.addEventListener("mousemove", function (e) {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 30;
    const rotateY = (x - centerX) / 30;

    link.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  link.addEventListener("mouseleave", function () {
    link.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

// project : marquee
const marqueeCont = document.querySelector(".project-marquee");
const marqueeList = document.querySelector(".project-marqueeList");
const originalMarquee = [...marqueeList.children];

originalMarquee.forEach((item) => {
  const marqueeClone = item.cloneNode(true);
  marqueeList.appendChild(marqueeClone);
});

const marqueeTween = gsap.to(marqueeList, {
  xPercent: -50,
  duration: 15,
  repeat: -1,
  ease: "linear",
});

marqueeCont.addEventListener("mouseenter", () => marqueeTween.pause());
marqueeCont.addEventListener("mouseleave", () => marqueeTween.resume());

/* about me */
ScrollTrigger.matchMedia({
  "(min-width: 1401px)": function () {
    const tl3 = gsap.timeline();
    tl3
      .fromTo(".front-list .item1", { top: "150px", left: "-600px" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item2", { top: "-310px", left: "-470px" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item3", { top: "-210px", left: "-290px" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item4", { top: "350px", left: "0" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item5", { top: "-330px", left: "195px" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item6", { top: "190px", left: "350px" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item7", { top: "-110px", left: "595px" }, { top: "0", left: "0", duration: 5 }, 0)

      .to(".skills-inner", { rotateY: 180 }, ">+=1")
      .to(".skills-inner", { rotateY: 180, y: 250 }, ">+=2")
      .to({}, { duration: 1 });
    ScrollTrigger.create({
      animation: tl3,
      trigger: ".skills",
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    });
  },

  "(min-width: 769px) and (max-width: 1400px)": function () {
    const tl3 = gsap.timeline();
    tl3
      .fromTo(".front-list .item1", { top: "19.714vw", left: "-39.857vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item2", { top: "-26.143vw", left: "-35.571vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item3", { top: "-19vw", left: "-15.714vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item4", { top: "31vw", left: "0" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item5", { top: "-28.571vw", left: "13.929vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item6", { top: "19.571vw", left: "29vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item7", { top: "-13.857vw", left: "41.5vw" }, { top: "0", left: "0", duration: 5 }, 0)

      .to(".skills-inner", { rotateY: 180 }, ">+=1")
      .to(".skills-inner", { rotateY: 180, y: 250 }, ">+=2")
      .to({}, { duration: 1 });
    ScrollTrigger.create({
      animation: tl3,
      trigger: ".skills",
      start: "top top",
      end: "+=1500",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    });
  },

  "(min-width: 481px) and (max-width: 768px)": function () {
    const tl3 = gsap.timeline();
    tl3
      .fromTo(".front-list .item1", { top: "29.714vw", left: "-44.857vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item2", { top: "-42.143vw", left: "-36.571vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item3", { top: "-31vw", left: "-15.714vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item4", { top: "48vw", left: "0" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item5", { top: "-43.571vw", left: "21.929vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item6", { top: "26.571vw", left: "33vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item7", { top: "-10.857vw", left: "44.5vw" }, { top: "0", left: "0", duration: 5 }, 0)

      .to(".skills-inner", { rotateY: 180 }, ">+=1")
      .to(".skills-inner", { rotateY: 180, y: "25vh" }, ">+=2")
      .to({}, { duration: 1 });
    ScrollTrigger.create({
      animation: tl3,
      trigger: ".skills",
      start: "top top",
      end: "+=1500",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    });
  },

  "(max-width: 480px)": function () {
    const tl3 = gsap.timeline();
    tl3
      .fromTo(".front-list .item1", { top: "32.714vw", left: "-44.857vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item2", { top: "-48.143vw", left: "-36.571vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item3", { top: "-34vw", left: "-15.714vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item4", { top: "53vw", left: "0" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item5", { top: "-60.571vw", left: "21.929vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item6", { top: "26.571vw", left: "33vw" }, { top: "0", left: "0", duration: 5 }, 0)
      .fromTo(".front-list .item7", { top: "-21.857vw", left: "44.5vw" }, { top: "0", left: "0", duration: 5 }, 0)

      .to(".skills-inner", { rotateY: 180 }, ">+=1")
      .to(".skills-inner", { rotateY: 180, y: "25vh" }, ">+=2")
      .to({}, { duration: 1 });
    ScrollTrigger.create({
      animation: tl3,
      trigger: ".skills",
      start: "top top",
      end: "+=1000",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    });
  },
});

/* like it */
// like it : 스크롤 시 텍스트 배경 채워짐
const likeElems = gsap.utils.toArray(".likeIt-item");

likeElems.forEach((elem) => {
  gsap.to(elem, {
    backgroundSize: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: elem,
      start: "center 80%",
      end: "center 20%",
      scrub: true,
      //markers: true,
    },
  });
});

// like it : 마우스 호버 시 효과
const likeItItems = document.querySelectorAll(".likeIt-item");

likeItItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    item.style.setProperty("--x", `${x}px`);
    item.style.setProperty("--y", `${y}px`);
  });
});

// if (window.matchMedia("(hover: hover)").matches) {
//   // PC: hover 효과
//   likeItItems.forEach((item) => {
//     item.addEventListener("mousemove", (e) => {
//       const rect = item.getBoundingClientRect();
//       let x = e.clientX - rect.left;
//       let y = e.clientY - rect.top;
//       item.style.setProperty("--x", `${x}px`);
//       item.style.setProperty("--y", `${y}px`);
//     });
//   });
// } else {
//   gsap.registerPlugin(ScrollTrigger);
//   likeItItems.forEach((item) => {
//     let icon = item.querySelector(".likeIt-icon");
//     if (icon) {
//       gsap.to(icon, {
//         scrollTrigger: {
//           trigger: item,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//         autoAlpha: 1,
//         duration: 0.5,
//         scale: 1,
//       });
//     }
//   });
// }

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
