import $ from "jquery";

//Main code
$(document).ready(function () {
  $(this).scrollTop(0);
  var viewportHeight = $(window).height();

  setTimeout(function () {
    $("html, body").animate(
      {
        scrollTop: viewportHeight * 2,
        complete: function () {
          //Hide your button here
        },
      },
      2000
    );
  }, 1500);
});
