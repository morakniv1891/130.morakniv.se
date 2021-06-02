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
});
