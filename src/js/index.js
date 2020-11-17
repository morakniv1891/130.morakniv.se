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
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    let scrollY = o.scroll.y;
    console.log(vh);
    console.log(scrollY);
    console.log(o);
  });

  scroll.on("call", function (t, e, i) {
    console.log(t);
    console.log(e);
    console.log(i);
  });
});
