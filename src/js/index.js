import $ from "jquery";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../../assets/js/cookie.notice.js";
import fitVids from "fitvids";

//Main code
$(document).ready(function () {
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

  //Layered pinning of first pages
  gsap.utils.toArray(".layer").forEach((layer, i) => {
    ScrollTrigger.create({
      trigger: layer,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });
  });

  ScrollTrigger.create({
    trigger: ".last-layer",
    start: "top top",
    end: "bottom bottom",
    pin: true,
  });

  //Make first page text follow scroll though section is pinned
  gsap.to(".start-page .text-container", {
    y: "-100vh",
    opacity: -1,
    scrollTrigger: {
      trigger: ".first-image",
      start: "1% bottom",
      scrub: true,
    },
  });

  // ScrollTrigger.create({
  //   snap: 1 / 4, // snap whole page to the closest section!
  // });

  //Reset page on unload
  $(window).on("beforeunload", function () {
    $("main").remove();
  });
});
