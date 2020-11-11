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
  });

  $(window).on("beforeunload", function () {
    $("main").remove();
  });

  scroll.on("scroll", function (o) {
    if (o.direction === "up") {
      document.getElementById("menu-bar").style.top = "0";
    } else {
      setTimeout(function () {
        document.getElementById("menu-bar").style.top = "-80px";
      }, 5000);
    }
  });

  scroll.on("call", function (t, e, i) {
    if (t === "usps") {
      $("#menu-bar").fadeIn(1500);
    }
    console.log(t);
    console.log(e);
    console.log(i);
  });
});
