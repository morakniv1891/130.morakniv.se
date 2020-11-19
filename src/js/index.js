import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";

//Main code
$(document).ready(function () {
  let menuActive = false;
  let menuHide = false;
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smoothMobile: true,
    lerp: 0.1,
    getDirection: true,
    getSpeed: true,
    repeat: true,
    touchMultiplier: 1,
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

    //First page movements
    if ($(".page-1[data-scroll-section-inview]")) {
      $(".page-1[data-scroll-section-inview] .middle img").css("opacity", 1 - scrollY / (vh / 2.5));
      $(".page-1[data-scroll-section-inview] .middle img").css("transform", "scale(0.5)");
      $(".page-1[data-scroll-section-inview] .top-line .left").css("opacity", 1 - scrollY / (vh / 3));
      $(".page-1[data-scroll-section-inview] .bottom-line .left").css("opacity", 1 - scrollY / (vh / 2));
    }
    $(".scroll-to-explore").css("opacity", 1 - scrollY / (vh / 3));

    if (menuActive) {
      $("header").css("top", "0");
    }

    if (o.direction === "down" && menuHide) {
      $("header").css("top", "-80px");
    }

    if (o.direction === "up" && menuActive) {
      $("header").css("top", "0");
    }
    // console.log(vh);
    // console.log(scrollY);
    // console.log(o);
  });

  scroll.on("call", function (t, e, i) {
    switch (t) {
      case "menu-entry":
        if (e === "exit") {
          menuActive = true;
        }
        break;
      case "menu-hide":
        menuHide = true;
        break;
      case "knife-trigger":
        if (e === "enter") {
          console.log("Entering");
        } else if (e === "exit") {
          console.log("exiting");
        }
        break;

      default:
        break;
    }
    // console.log(t);
    // console.log(e);
    // console.log(i);
  });
});
