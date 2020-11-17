import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";

//Main code
$(document).ready(function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smoothMobile: true,
    lerp: 0.1,
    getDirection: true,
    getSpeed: true,
    repeat: true,
  });

  scroll.stop();

  setTimeout(function () {
    scroll.start();
  }, 4500);

  $(window).on("beforeunload", function () {
    $("main").remove();
  });

  scroll.on("scroll", function (o) {
    console.log(o.scroll.y / o.limit);
  });

  scroll.on("call", function (t, e, i) {
    console.log(t);
    console.log(e);
    console.log(i);
  });
});
