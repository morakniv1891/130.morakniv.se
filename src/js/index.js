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
  //       complete: function () {
  //         //Hide top image
  //       },
  //     },
  //     2000
  //   );
  // }, 1500);
});
