import $ from "jquery";

//Main code
$(document).ready(function () {
  $(window).on("beforeunload", function () {
    $(window).scrollTop(0);
  });

  $("section.top-hero").on("animationend webkitNaimationEnd oAnimationEnd", function () {
    $("section.top-hero").fadeOut(300, function () {
      $(this).remove();
    });
  });
});
