import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";

//Main code
$(document).ready(function () {
  const scroll = new LocomotiveScroll({
    el: this.el,
    smooth: true,
  });
  $(window).on("beforeunload", function () {
    $("main").remove();
    // $(window).scrollTop(0);
  });
  $(window).on("scroll", function (e) {
    console.log(window.pageYOffset);
  });

  // $(window).scrollTop(0);

  // $("section.top-hero").on("animationstart webkitAnimationStart oAnimationStart", function () {
  //   $("section.top-hero").fadeOut(3000, function () {
  //     $(this).remove();
  //   });
  // });
});
