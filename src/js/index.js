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

  //Reset page on unload
  $(window).on("beforeunload", function () {
    $("main").remove();
  });
});
