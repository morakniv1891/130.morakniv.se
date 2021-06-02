import $ from "jquery";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

$(document).ready(() => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".first-page",
    start: "top top",
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: ".second-page",
    start: "top top",
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: ".third-page",
    start: "top top",
    pin: true,
  });

  //Make first page text follow scroll though section is pinned
  gsap.to(".first-page .text-container", {
    y: "-100vh",
    opacity: -1,
    scrollTrigger: {
      trigger: ".first-image",
      start: "1% bottom",
      scrub: true,
    },
  });
});
