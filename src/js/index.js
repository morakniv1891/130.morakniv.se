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
    if (t === "menuappear" && e === "enter") {
      $("#menu-bar").css("display", "flex");
      $("#menu-bar").css("top", "0");
      $("#menu-bar").hide();
      $("#menu-bar").fadeIn(3000);
      let target = document.getElementById("page-1");
      scroll.scrollTo(target, -80, 3000);
    } else if (t === "hero" && e === "exit") {
      menuSticky = false;
    }
    console.log(t);
    console.log(e);
    console.log(i);
  });
});
