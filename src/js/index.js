import $ from "jquery";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../../assets/js/cookie.notice.js";
import fitVids from "fitvids";

//Main code
$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  $(window).on("beforeunload", function () {
    $("main").remove();
  });

  fitVids(".page-11");
});
