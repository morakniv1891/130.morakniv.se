import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

//Main code
$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  scroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  scroll.stop();

  /*
  /*
  /*
  /*
  /*
  /**/

  //"Scroll to explore" text coming in from the bottom
  gsap.from(".scroll-to-explore h5", {
    y: 200,
    duration: 1.5,
    delay: 4,
    onComplete: () => {
      scroll.start();
    },
  });

  //Pin "Scroll to explore" text until faded out
  ScrollTrigger.create({
    scroller: "#main",
    trigger: "#page-1",
    start: "bottom bottom",
    end: "bottom top",
    pin: ".scroll-to-explore",
  });

  //Fade out page-1 when starting to scroll down
  gsap.to(".page-1", {
    opacity: 0,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page-2",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
  });

  //Pin knife when reaching center of screen until ready to move out
  ScrollTrigger.create({
    scroller: "#main",
    trigger: "#page-2",
    endTrigger: "#page-4",
    start: "center center",
    end: "top bottom",
    pin: "#knife-image",
  });

  /*
  /*
  /*
  /*
  /*
  /**/

  $(window).on("beforeunload", function () {
    $("main").remove();
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => scroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
});
