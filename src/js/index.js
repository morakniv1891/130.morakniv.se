import $ from "jquery";

//Main code
$(document).ready(function () {
  $(window).on("beforeunload", function () {
    $(window).scrollTop(0);
  });
  var viewportHeight = $(window).height();

  setTimeout(function () {
    $("html, body").animate(
      {
        scrollTop: viewportHeight * 2,
        complete: function () {
          $("section.top-hero").height("100vh");
        },
      },
      3000
    );
  }, 1500);
});
