import $ from "jquery";

$(document).ready(function () {
  var viewportHeight = $(window).height();

  $("html, body")
    .animate(
      {
        scrollTop: viewportHeight * 2,
        complete: function () {
          //Hide your button here
        },
      },
      2000
    )
    .delay(1000);
});
