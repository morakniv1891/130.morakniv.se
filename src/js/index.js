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
  });

  $(window).on("beforeunload", function () {
    $("main").remove();
  });

  scroll.on("scroll", function (o) {
    if (o.direction === "up") {
      document.getElementById("menu-bar").style.top = "0";
    } else {
      document.getElementById("menu-bar").style.top = "-80px";
    }

    console.log(o);
  });
});
