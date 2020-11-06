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
          console.log($("section.top-hero").height());
        },
      },
      3000
    );
  }, 1500);
});
