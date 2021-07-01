import $ from "jquery";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import "../../assets/js/cookie.notice.js";
import fitVids from "fitvids";

$(document).ready(() => {
  let mobileMenuOpen = false;

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true,
  });

  //Show/Hide Menu
  const showMenu = gsap
    .from("header", {
      yPercent: -100,
      paused: true,
      duration: 0.2,
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      !mobileMenuOpen ? (self.direction === -1 ? showMenu.play() : showMenu.reverse()) : null;
    },
  });

  //Disable scroll when mobile menu open
  $("#mobile-menu-toggle").click(() => {
    mobileMenuOpen = !mobileMenuOpen;
    mobileMenuOpen ? disableBodyScroll($("#mobile-menu-wrapper")) : clearAllBodyScrollLocks();
  });

  //Bounce down-arrows
  gsap.to(".down-arrow-mobile, .down-arrow-desktop", {
    duration: 1,
    y: -15,
    ease: "sine.in",
    repeat: -1,
    yoyo: true,
  });

  ScrollTrigger.matchMedia({
    "(max-width: 1024px)": function () {
      //Pin Mora 2000 page
      ScrollTrigger.create({
        trigger: ".mora2000-usp",
        start: "top top",
        end: "+=400%",
        pin: ".mora2000-usp",
        anticipatePin: true,
      });
      //Fade in and out knife text
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mora2000-usp",
          start: "top bottom",
          end: "+=400%",
          scrub: true,
        },
      });
      tl.to(".mora2000-usp .knife-image", { opacity: 0.5, duration: 5 }, 1);
      tl.from(".mora2000-usp .text, .mora2000-usp .title, .mora2000-usp .product-page-button", { opacity: 0, duration: 1 });
      tl.to(".mora2000-usp .text, .mora2000-usp .title, .mora2000-usp .product-page-button", { opacity: 1, duration: 3 });
      tl.to(".mora2000-usp .text, .mora2000-usp .title, .mora2000-usp .product-page-button", { opacity: 0, duration: 1 });
      tl.to(".mora2000-usp .knife-image", { opacity: 1, duration: 1 });
      tl.to(".usp1", { opacity: 1, duration: 1 });
      tl.to(".usp2", { opacity: 1, duration: 1 });
      tl.to(".usp1", { opacity: 0, duration: 1 });
      tl.to(".usp2", { opacity: 0, duration: 1 });
      tl.to(".usp3", { opacity: 1, duration: 1 });
      tl.to(".usp4", { opacity: 1, duration: 1 });
    },
    "(min-width: 1025px)": function () {
      //Pin second page when reaching top
      ScrollTrigger.create({
        trigger: ".mora2000-usp",
        start: "top top",
        end: "+=300%",
        pin: ".mora2000-usp",
        anticipatePin: true,
      });

      //Fade in and out knife intro text
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mora2000-usp",
          start: "top bottom",
          end: "+=400%",
          scrub: true,
        },
      });

      tl.to(".mora2000-usp .knife-image", { opacity: 1, duration: 5 }, 1);
      tl.from(".mora2000-usp .text, .mora2000-usp .title, .mora2000-usp .product-page-button", { opacity: 0, duration: 1 });
      tl.to(".mora2000-usp .text, .mora2000-usp .title, .mora2000-usp .product-page-button", { opacity: 1, duration: 2 });
      tl.to(".mora2000-usp .text, .mora2000-usp .title, .mora2000-usp .product-page-button", { opacity: 0, duration: 1 });
      tl.to(".usp1", { opacity: 1, duration: 1 });
      tl.to(".usp2", { opacity: 1, duration: 1 });
      tl.to(".usp3", { opacity: 1, duration: 1 });
      tl.to(".usp4", { opacity: 1, duration: 1 });
    },
    all: function () {
      //Layered pinning of first few pages
      ScrollTrigger.create({
        trigger: ".start-page",
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        anticipatePin: true,
      });

      ScrollTrigger.create({
        trigger: ".first-layer",
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        anticipatePin: true,
      });

      ScrollTrigger.create({
        trigger: ".second-layer",
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        anticipatePin: true,
      });

      ScrollTrigger.create({
        trigger: ".third-layer",
        start: "top top",
        end: "center top",
        pin: true,
        anticipatePin: true,
      });

      //Make first page text follow scroll though section is pinned
      gsap.to(".start-page .text-container", {
        y: "-100vh",
        opacity: -1,
        scrollTrigger: {
          trigger: ".first-layer",
          start: "1% bottom",
          scrub: true,
        },
      });

      gsap.from(".history-through-time picture", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".history-through-time picture",
          start: "top bottom",
          end: "bottom+=50% bottom",
          scrub: true,
        },
      });

      //Pin forest page when reaching top
      ScrollTrigger.create({
        trigger: ".forest",
        start: "top top",
        end: "+=300%",
        pin: ".forest",
        // pinSpacing: false,
        anticipatePin: true,
      });

      //Bring in content from below
      gsap.from(".forest .knife-in-hand", {
        y: "100%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".forest",
          start: "top center",
          end: "+=100%",
          scrub: true,
        },
      });

      gsap.from(".forest .first-content-wrapper .text-wrapper", {
        y: "150vh",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".forest",
          start: "top center",
          end: "+=100%",
          scrub: true,
        },
      });

      //Grow square image
      gsap.to(".forest .knife-in-hand", {
        scale: 10,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: ".history-1",
          start: "top bottom+=225%",
          end: "top bottom+=150%",
          scrub: true,
        },
      });

      //Fade to black
      gsap.to(".forest .black-fade", {
        opacity: 1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: ".history-1",
          start: "top bottom+=225%",
          end: "top bottom+=125%",
          scrub: true,
        },
      });

      //Fade in movie
      gsap.to(".forest .second-content-wrapper video", {
        opacity: 1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: ".history-1",
          start: "top bottom+=100%",
          end: "top bottom+=50",
          scrub: true,
        },
      });

      //Image entry grow
      gsap.from(".history-1 .image-wrapper", {
        scale: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-1",
          start: "top bottom",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry gradient
      gsap.to(".history-1 .gradient", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-1",
          start: "top bottom-=33%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Text entry opacity
      gsap.from(".history-1 .text, .history-1 .header", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-1",
          start: "top center-=25%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry grow
      gsap.from(".history-2 .image-wrapper", {
        scale: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-2",
          start: "top bottom",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry gradient
      gsap.to(".history-2 .gradient", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-2",
          start: "top bottom-=33%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Text entry opacity
      gsap.from(".history-2 .text", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-2",
          start: "top center-=25%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry grow
      gsap.from(".history-3 .image-wrapper", {
        scale: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-3",
          start: "top bottom",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Image entry gradient
      gsap.to(".history-3 .gradient", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-3",
          start: "top bottom-=33%",
          end: "center+=33% center",
          scrub: true,
        },
      });

      //Text entry opacity
      gsap.from(".history-3 .text", {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".history-3",
          start: "top center-=25%",
          end: "center+=33% center",
          scrub: true,
        },
      });
    },
  });

  //Fit videos to screen
  fitVids(".third-layer, .second-movie");
});
