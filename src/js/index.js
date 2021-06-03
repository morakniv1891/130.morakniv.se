import $ from "jquery";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import "../../assets/js/cookie.notice.js";

$(document).ready(() => {
  let mobileMenuOpen = false;

  gsap.registerPlugin(ScrollTrigger);

  //Show/Hide Menu
  const showMenu = gsap
    .from("header", {
      yPercent: -100,
      paused: true,
      duration: 0.2,
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showMenu.play() : showMenu.reverse();
    },
  });

  //Disable scroll when mobile menu open
  $("#mobile-menu-toggle").click(() => {
    mobileMenuOpen = !mobileMenuOpen;
    mobileMenuOpen ? disableBodyScroll() : enableBodyScroll();
    console.log(mobileMenuOpen);
  });

  //Layered pinning of first few pages
  ScrollTrigger.create({
    trigger: ".start-page",
    start: "top top",
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: ".first-layer",
    start: "top top",
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: ".second-layer",
    start: "top top",
    pin: true,
    pinSpacing: false,
  });

  ScrollTrigger.create({
    trigger: ".third-layer",
    start: "top top",
    end: "top top",
    pin: true,
  });

  //Make first page text follow scroll though section is pinned
  gsap.to(".start-page .text-container", {
    y: "-100vh",
    opacity: -1,
    scrollTrigger: {
      trigger: ".first-layer",
      start: "1% bottom",
      scrub: true,
    },
  });
});
