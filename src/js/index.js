import $ from "jquery";

//Main code
$(document).ready(function () {
  $(window).on("beforeunload", function () {
    $(window).scrollTop(0);
  });
  var viewportHeight = $(window).height();

  // setTimeout(function () {
  //   $("html, body").animate(
  //     {
  //       scrollTop: viewportHeight * 2,
  //     },
  //     3000,
  //     function () {
  //       $("section.top-hero").fadeOut(300, function () {
  //         $(this).remove();
  //       });
  //     }
  //   );
  // }, 1500);
});
