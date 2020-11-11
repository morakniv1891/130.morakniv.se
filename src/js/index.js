import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";

//Main code
$(document).ready(function () {
  let menuSticky = true;
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smoothMobile: true,
    lerp: 0.1,
    getDirection: true,
    getSpeed: true,
    repeat: true,
  });

  $(window).on("beforeunload", function () {
    $("main").remove();
  });

  scroll.on("scroll", function (o) {
    if (o.direction === "up") {
      document.getElementById("menu-bar").style.top = "0";
    } else if (o.direction === "down" && !menuSticky) {
      document.getElementById("menu-bar").style.top = "-80px";
    }
  });

  scroll.on("call", function (t, e, i) {
    if (t === "menuappear") {
      $("#menu-bar").fadeIn(1500);
    }

    if (t === "menudisappear") {
      $("#menu-bar").fadeIn(1500);
      menuSticky = false;
    }
    console.log(t);
    console.log(e);
    console.log(i);
  });
});
