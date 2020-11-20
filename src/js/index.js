import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";

//Main code
$(document).ready(function () {
  let menuActive = false,
    menuHide = false;
  const scroll = new LocomotiveScroll({
    el: document.querySelector("body"),
    smooth: true,
  });

  scroll.stop();

  setTimeout(function () {
    scroll.start();
  }, 4500);

  $(window).on("beforeunload", function () {
    $("main").remove();
  });
});
