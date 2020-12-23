import $ from "jquery";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

//Main code
$(document).ready(function () {
  $("header").css("display", "flex");
  $("header").hide();

  gsap.registerPlugin(ScrollTrigger);

  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    smoothMobile: true,
    touchMultiplier: 3,
    getDirection: true,
    lerp: 0.05,
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  scroll.on("scroll", (args) => {
    if (args.direction === "down") {
      $("header.hideable").css("top", "-80px");
    } else if (args.direction === "up") {
      $("header.hideable").css("top", "0");
    }

    ScrollTrigger.update();
  });

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

  ScrollTrigger.matchMedia({
    "(max-width: 1024px)": function () {
      //Pin second page when reaching top
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-2",
        start: "top top",
        end: "+=400%",
        pin: ".page-2",
        onLeave: () => $("header").addClass("hideable"),
      });

      //Fade in and out knife intro text
      let tl = gsap.timeline({
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-2",
          start: "top top",
          end: "+=400%",
          scrub: true,
        },
      });

      tl.from(".page-2 .intro-text", { opacity: 0, duration: 1 });
      tl.to(".page-2 .intro-text", { opacity: 1, duration: 1 });
      tl.to(".page-2 .intro-text", { opacity: 0, duration: 1 });
      tl.to(".page-2 .knife-image", { opacity: 1, duration: 1 }, 2);
      tl.to(".usp1", { opacity: 1, duration: 1 });
      tl.to(".usp2", { opacity: 1, duration: 1 });
      tl.to(".usp1", { opacity: 0, duration: 1 }, 5);
      tl.to(".usp2", { opacity: 0, duration: 1 }, 5);
      tl.to(".usp3", { opacity: 1, duration: 1 });
      tl.to(".usp4", { opacity: 1, duration: 1 });
    },
    "(min-width: 1025px)": function () {
      //Pin second page when reaching top
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-2",
        start: "top top",
        end: "+=300%",
        pin: ".page-2",
        onLeave: () => $("header").addClass("hideable"),
      });

      //Fade in and out knife intro text
      let tl = gsap.timeline({
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-2",
          start: "top top",
          end: "+=300%",
          scrub: true,
        },
      });

      tl.from(".page-2 .intro-text", { opacity: 0, duration: 1 });
      tl.to(".page-2 .intro-text", { opacity: 1, duration: 1 });
      tl.to(".page-2 .intro-text", { opacity: 0, duration: 1 });
      tl.to(".page-2 .knife-image", { opacity: 1, duration: 1 }, 2);
      tl.to(".usp1", { opacity: 1, duration: 1 });
      tl.to(".usp2", { opacity: 1, duration: 1 });
      tl.to(".usp3", { opacity: 1, duration: 1 });
      tl.to(".usp4", { opacity: 1, duration: 1 });
    },
    all: function () {
      //Background "scrolling" away upwards
      gsap.to(".page-1", {
        backgroundPositionY: "-150vh",
        duration: 4,
        delay: 1.5,
        ease: "power2.inOut",
      });

      //Anniversary logo coming in from below and shrinking into position
      gsap.to(".anniversary-logo", {
        scale: 1,
        y: "0",
        duration: 3.5,
        delay: 1.5,
        ease: "power1.inOut",
      });

      //Anniversary text coming in from below and shrinking into position
      gsap.from(".anniversary-text", {
        scale: 3,
        y: "120vh",
        duration: 3.5,
        delay: 1.5,
        ease: "power1.inOut",
      });

      //Top line moving in from below
      gsap.from(".left", {
        y: "100vh",
        duration: 3,
        delay: 1.5,
        ease: "power1.inOut",
      });

      //"Scroll to explore" text coming in from the bottom
      gsap.from(".scroll-to-explore", {
        y: "30vh",
        duration: 1.5,
        delay: 4,
        ease: "power1.inOut",
        onComplete: () => {
          scroll.start();
        },
      });

      //Pin first page directly
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-1",
        start: "top top",
        pin: ".page-1",
        pinSpacing: false,
      });

      //Start "scrolling" away everything but scroll to explore and fade it out
      gsap.to(".page-1 .content-wrapper", {
        y: "-100vh",
        scale: 0.25,
        opacity: -1,
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-2",
          start: "1% bottom",
          scrub: true,
        },
      });

      //Show menu when logo hits top
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-1 .content-wrapper",
        start: "bottom center",
        end: "top bottom",
        onEnter: () => $("header").fadeIn(),
      });

      //Fade out scroll to explore
      gsap.to(".scroll-to-explore", {
        opacity: 0,
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-2",
          endTrigger: ".page-2 .knife-image",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      //Pin third page when reaching top
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-3",
        start: "top top",
        end: "+=600%",
        pin: ".page-3",
        pinSpacing: false,
      });

      //Bring in content from below
      gsap.from(".page-3 .knife-in-hand", {
        y: "100vh",
        ease: "power1.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-3",
          start: "top center",
          end: "+=100%",
          scrub: true,
        },
      });

      gsap.from(".page-3 .first-content-wrapper .text-wrapper", {
        y: "150vh",
        ease: "power1.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-3",
          start: "top center",
          end: "+=100%",
          scrub: true,
        },
      });

      //Grow square image
      gsap.to(".page-3 .knife-in-hand", {
        scale: 10,
        ease: "power1.in",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-4",
          start: "top bottom+=325%",
          end: "top bottom+=125%",
          scrub: true,
        },
      });

      //Fade to white
      gsap.to(".page-3 .first-content-wrapper", {
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-4",
          start: "top bottom+=275%",
          end: "top bottom+=175%",
          scrub: true,
        },
      });

      //Fade in knife image and then text
      let t2 = gsap.timeline({
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-4",
          start: "top bottom+=150%",
          end: "top bottom+=50%",
          scrub: true,
        },
      });

      t2.from(".page-3 .second-content-wrapper .knife-image", { opacity: 0, duration: 1 });
      t2.from(".page-3 .second-content-wrapper .text-wrapper", { opacity: 0, duration: 1 });

      //Minus offset on page 4 to fake pre-pinning
      gsap.from(".page-4 .outer-wrapper", {
        y: "-100vh",
        ease: "none",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-4",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      //Pin fourth page when reaching top
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-4",
        start: "top top",
        pin: ".page-4",
      });

      //Move and scale down title into position
      gsap.from(".page-6 .title", {
        y: "-200px",
        scale: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-6",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      //Pin first history page
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-7",
        start: "top top",
        end: "20%",
        pin: ".page-7",
      });

      //Image entry grow
      gsap.from(".page-7 .image", {
        scale: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-7",
          start: "top bottom",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry gradient
      gsap.to(".page-7 .gradient", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-7",
          start: "top bottom-=33%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Text entry opacity
      gsap.from(".page-7 .text", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-7",
          start: "top center-=25%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Pin first history page
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-8",
        start: "top top",
        end: "20%",
        pin: ".page-8",
      });

      //Image entry grow
      gsap.from(".page-8 .image", {
        scale: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-8",
          start: "top bottom",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry gradient
      gsap.to(".page-8 .gradient", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-8",
          start: "top bottom-=33%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Text entry opacity
      gsap.from(".page-8 .text", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-8",
          start: "top center-=25%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Pin first history page
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-9",
        start: "top top",
        end: "20%",
        pin: ".page-9",
      });

      //Image entry grow
      gsap.from(".page-9 .image", {
        scale: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-9",
          start: "top bottom",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry gradient
      gsap.to(".page-9 .gradient", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-9",
          start: "top bottom-=33%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Text entry opacity
      gsap.from(".page-9 .text", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-9",
          start: "top center-=25%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Pin first history page
      ScrollTrigger.create({
        scroller: "#main",
        trigger: ".page-10",
        start: "top top",
        end: "20%",
        pin: ".page-10",
      });

      //Image entry grow
      gsap.from(".page-10 .image", {
        scale: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-10",
          start: "top bottom",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry gradient
      gsap.to(".page-10 .gradient", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-10",
          start: "top bottom-=33%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Text entry opacity
      gsap.from(".page-10 .text", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          scroller: "#main",
          trigger: ".page-10",
          start: "top center-=25%",
          end: "center+=33% center",
          scrub: true,
        },
      });
    },
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
