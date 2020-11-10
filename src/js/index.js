import $ from "jquery";

//Main code
$(document).ready(function () {
  $(window).on("beforeunload", function () {
    $("main").remove();
    // $(window).scrollTop(0);
  });
  $(window).on("scroll", function (e) {
    console.log(document.body.scrollTop);
  });

  // $(window).scrollTop(0);

  // $("section.top-hero").on("animationstart webkitAnimationStart oAnimationStart", function () {
  //   $("section.top-hero").fadeOut(3000, function () {
  //     $(this).remove();
  //   });
  // });
});
