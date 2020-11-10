import $ from "jquery";

//Main code
$(document).ready(function () {
  let scrollStart = 0,
    scrollEnd = 0,
    scrollDistance = 100;

  $(window).on("beforeunload", function () {
    $("main").remove();
    // $(window).scrollTop(0);
  });
  $(window).on("scroll", function (e) {
    e.preventDefault();

    scrollStart = window.pageYOffset;
    console.log(window.scrollTop);
  });
  // $(window).scrollTop(0);

  // $("section.top-hero").on("animationstart webkitAnimationStart oAnimationStart", function () {
  //   $("section.top-hero").fadeOut(3000, function () {
  //     $(this).remove();
  //   });
  // });
});
