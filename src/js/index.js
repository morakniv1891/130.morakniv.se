import $ from "jquery";

//Main code
$(document).ready(function () {
  window.scrollTo(0, 0);
  $(window).on("scroll", function (e) {
    console.log(e);
  });
});
