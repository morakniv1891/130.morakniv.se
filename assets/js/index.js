(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// import $ from "jquery";
// import LocomotiveScroll from "locomotive-scroll";
// import { gsap } from "gsap/dist/gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// //Main code
// $(document).ready(function () {
//   gsap.registerPlugin(ScrollTrigger);
//   const scroll = new LocomotiveScroll({
//     el: document.querySelector("body"),
//     smooth: true,
//   });
//   // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
//   scroll.on("scroll", ScrollTrigger.update);
//   // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
//   ScrollTrigger.scrollerProxy("body", {
//     scrollTop(value) {
//       return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
//     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//     getBoundingClientRect() {
//       return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//     },
//     // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//     pinType: document.querySelector("body").style.transform ? "transform" : "fixed",
//   });
//   scroll.stop();
//   /*
//   /*
//   /*
//   /*
//   /*
//   /**/
//   ScrollTrigger.matchMedia({
//     "(max-width: 767px)": function () {
//       //Fade out page-1 when starting to scroll down
//       gsap.to(".page-1", {
//         opacity: 0,
//         scrollTrigger: {
//           scroller: "body",
//           trigger: "#page-2",
//           start: "top bottom",
//           end: "center bottom",
//           scrub: true,
//         },
//       });
//     },
//     "(min-width: 768px)": function () {
//       //Fade out page-1 when starting to scroll down
//       gsap.to(".page-1", {
//         opacity: 0,
//         scrollTrigger: {
//           scroller: "body",
//           trigger: "#page-2",
//           start: "top bottom",
//           end: "bottom bottom",
//           scrub: true,
//         },
//       });
//     },
//     all: function () {
//       //"Scroll to explore" text coming in from the bottom
//       gsap.from(".scroll-to-explore h5", {
//         y: 200,
//         duration: 1.5,
//         delay: 4,
//         onComplete: () => {
//           scroll.start();
//         },
//       });
//       //Pin "Scroll to explore" text until faded out
//       ScrollTrigger.create({
//         scroller: "body",
//         trigger: "#page-1",
//         start: "bottom bottom",
//         end: "bottom top",
//         pin: ".scroll-to-explore",
//       });
//       //Pin knife when reaching center of screen until ready to move out
//       ScrollTrigger.create({
//         scroller: "body",
//         trigger: "#page-2",
//         endTrigger: "#page-6",
//         start: "center center",
//         end: "bottom bottom",
//         pin: "#knife-intro",
//       });
//       //Fade in and out knife intro text
//       let tl = gsap.timeline({
//         scrollTrigger: {
//           scroller: "body",
//           trigger: "#knife-intro",
//           endTrigger: "#page-4",
//           start: "center center",
//           end: "bottom bottom",
//           scrub: true,
//         },
//       });
//       tl.to(".knife-intro__text", { opacity: 1, duration: 1 });
//       tl.to(".knife-intro__text", { opacity: 1, duration: 2 });
//       tl.to(".knife-intro__text", { opacity: 0, duration: 1 });
//       //Fade in USP1
//       gsap.to(".usp1", {
//         opacity: 1,
//         scrollTrigger: {
//           scroller: "body",
//           trigger: "#page-4",
//           // endTrigger: "#page-6",
//           start: "center center",
//           end: "center top",
//           scrub: true,
//         },
//       });
//       //Fade in USP2
//       gsap.to(".usp2", {
//         opacity: 1,
//         scrollTrigger: {
//           scroller: "body",
//           trigger: "#page-4",
//           // endTrigger: "#page-6",
//           start: "center top",
//           end: "bottom top",
//           scrub: true,
//         },
//       });
//       //Fade in USP3
//       gsap.to(".usp3", {
//         opacity: 1,
//         scrollTrigger: {
//           scroller: "body",
//           trigger: "#page-5",
//           // endTrigger: "#page-6",
//           start: "center center",
//           end: "center top",
//           scrub: true,
//         },
//       });
//       //Fade in USP4
//       gsap.to(".usp4", {
//         opacity: 1,
//         scrollTrigger: {
//           scroller: "body",
//           trigger: "#page-5",
//           // endTrigger: "#page-6",
//           start: "center top",
//           end: "bottom top",
//           scrub: true,
//         },
//       });
//     },
//   });
//   /*
//   /*
//   /*
//   /*
//   /*
//   /**/
//   $(window).on("beforeunload", function () {
//     $("main").remove();
//   });
//   // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
//   ScrollTrigger.addEventListener("refresh", () => scroll.update());
//   // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
//   ScrollTrigger.refresh();
// });
"use strict";

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIGltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcbi8vIGltcG9ydCBMb2NvbW90aXZlU2Nyb2xsIGZyb20gXCJsb2NvbW90aXZlLXNjcm9sbFwiO1xuLy8gaW1wb3J0IHsgZ3NhcCB9IGZyb20gXCJnc2FwL2Rpc3QvZ3NhcFwiO1xuLy8gaW1wb3J0IHsgU2Nyb2xsVHJpZ2dlciB9IGZyb20gXCJnc2FwL2Rpc3QvU2Nyb2xsVHJpZ2dlclwiO1xuLy8gLy9NYWluIGNvZGVcbi8vICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbi8vICAgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKTtcbi8vICAgY29uc3Qgc2Nyb2xsID0gbmV3IExvY29tb3RpdmVTY3JvbGwoe1xuLy8gICAgIGVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSxcbi8vICAgICBzbW9vdGg6IHRydWUsXG4vLyAgIH0pO1xuLy8gICAvLyBlYWNoIHRpbWUgTG9jb21vdGl2ZSBTY3JvbGwgdXBkYXRlcywgdGVsbCBTY3JvbGxUcmlnZ2VyIHRvIHVwZGF0ZSB0b28gKHN5bmMgcG9zaXRpb25pbmcpXG4vLyAgIHNjcm9sbC5vbihcInNjcm9sbFwiLCBTY3JvbGxUcmlnZ2VyLnVwZGF0ZSk7XG4vLyAgIC8vIHRlbGwgU2Nyb2xsVHJpZ2dlciB0byB1c2UgdGhlc2UgcHJveHkgbWV0aG9kcyBmb3IgdGhlIFwiLnNtb290aC1zY3JvbGxcIiBlbGVtZW50IHNpbmNlIExvY29tb3RpdmUgU2Nyb2xsIGlzIGhpamFja2luZyB0aGluZ3Ncbi8vICAgU2Nyb2xsVHJpZ2dlci5zY3JvbGxlclByb3h5KFwiYm9keVwiLCB7XG4vLyAgICAgc2Nyb2xsVG9wKHZhbHVlKSB7XG4vLyAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHNjcm9sbC5zY3JvbGxUbyh2YWx1ZSwgMCwgMCkgOiBzY3JvbGwuc2Nyb2xsLmluc3RhbmNlLnNjcm9sbC55O1xuLy8gICAgIH0sIC8vIHdlIGRvbid0IGhhdmUgdG8gZGVmaW5lIGEgc2Nyb2xsTGVmdCBiZWNhdXNlIHdlJ3JlIG9ubHkgc2Nyb2xsaW5nIHZlcnRpY2FsbHkuXG4vLyAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkge1xuLy8gICAgICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwLCB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IH07XG4vLyAgICAgfSxcbi8vICAgICAvLyBMb2NvbW90aXZlU2Nyb2xsIGhhbmRsZXMgdGhpbmdzIGNvbXBsZXRlbHkgZGlmZmVyZW50bHkgb24gbW9iaWxlIGRldmljZXMgLSBpdCBkb2Vzbid0IGV2ZW4gdHJhbnNmb3JtIHRoZSBjb250YWluZXIgYXQgYWxsISBTbyB0byBnZXQgdGhlIGNvcnJlY3QgYmVoYXZpb3IgYW5kIGF2b2lkIGppdHRlcnMsIHdlIHNob3VsZCBwaW4gdGhpbmdzIHdpdGggcG9zaXRpb246IGZpeGVkIG9uIG1vYmlsZS4gV2Ugc2Vuc2UgaXQgYnkgY2hlY2tpbmcgdG8gc2VlIGlmIHRoZXJlJ3MgYSB0cmFuc2Zvcm0gYXBwbGllZCB0byB0aGUgY29udGFpbmVyICh0aGUgTG9jb21vdGl2ZVNjcm9sbC1jb250cm9sbGVkIGVsZW1lbnQpLlxuLy8gICAgIHBpblR5cGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLnN0eWxlLnRyYW5zZm9ybSA/IFwidHJhbnNmb3JtXCIgOiBcImZpeGVkXCIsXG4vLyAgIH0pO1xuLy8gICBzY3JvbGwuc3RvcCgpO1xuLy8gICAvKlxuLy8gICAvKlxuLy8gICAvKlxuLy8gICAvKlxuLy8gICAvKlxuLy8gICAvKiovXG4vLyAgIFNjcm9sbFRyaWdnZXIubWF0Y2hNZWRpYSh7XG4vLyAgICAgXCIobWF4LXdpZHRoOiA3NjdweClcIjogZnVuY3Rpb24gKCkge1xuLy8gICAgICAgLy9GYWRlIG91dCBwYWdlLTEgd2hlbiBzdGFydGluZyB0byBzY3JvbGwgZG93blxuLy8gICAgICAgZ3NhcC50byhcIi5wYWdlLTFcIiwge1xuLy8gICAgICAgICBvcGFjaXR5OiAwLFxuLy8gICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4vLyAgICAgICAgICAgc2Nyb2xsZXI6IFwiYm9keVwiLFxuLy8gICAgICAgICAgIHRyaWdnZXI6IFwiI3BhZ2UtMlwiLFxuLy8gICAgICAgICAgIHN0YXJ0OiBcInRvcCBib3R0b21cIixcbi8vICAgICAgICAgICBlbmQ6IFwiY2VudGVyIGJvdHRvbVwiLFxuLy8gICAgICAgICAgIHNjcnViOiB0cnVlLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgfSk7XG4vLyAgICAgfSxcbi8vICAgICBcIihtaW4td2lkdGg6IDc2OHB4KVwiOiBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAvL0ZhZGUgb3V0IHBhZ2UtMSB3aGVuIHN0YXJ0aW5nIHRvIHNjcm9sbCBkb3duXG4vLyAgICAgICBnc2FwLnRvKFwiLnBhZ2UtMVwiLCB7XG4vLyAgICAgICAgIG9wYWNpdHk6IDAsXG4vLyAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbi8vICAgICAgICAgICBzY3JvbGxlcjogXCJib2R5XCIsXG4vLyAgICAgICAgICAgdHJpZ2dlcjogXCIjcGFnZS0yXCIsXG4vLyAgICAgICAgICAgc3RhcnQ6IFwidG9wIGJvdHRvbVwiLFxuLy8gICAgICAgICAgIGVuZDogXCJib3R0b20gYm90dG9tXCIsXG4vLyAgICAgICAgICAgc2NydWI6IHRydWUsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICB9KTtcbi8vICAgICB9LFxuLy8gICAgIGFsbDogZnVuY3Rpb24gKCkge1xuLy8gICAgICAgLy9cIlNjcm9sbCB0byBleHBsb3JlXCIgdGV4dCBjb21pbmcgaW4gZnJvbSB0aGUgYm90dG9tXG4vLyAgICAgICBnc2FwLmZyb20oXCIuc2Nyb2xsLXRvLWV4cGxvcmUgaDVcIiwge1xuLy8gICAgICAgICB5OiAyMDAsXG4vLyAgICAgICAgIGR1cmF0aW9uOiAxLjUsXG4vLyAgICAgICAgIGRlbGF5OiA0LFxuLy8gICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4vLyAgICAgICAgICAgc2Nyb2xsLnN0YXJ0KCk7XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICB9KTtcbi8vICAgICAgIC8vUGluIFwiU2Nyb2xsIHRvIGV4cGxvcmVcIiB0ZXh0IHVudGlsIGZhZGVkIG91dFxuLy8gICAgICAgU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xuLy8gICAgICAgICBzY3JvbGxlcjogXCJib2R5XCIsXG4vLyAgICAgICAgIHRyaWdnZXI6IFwiI3BhZ2UtMVwiLFxuLy8gICAgICAgICBzdGFydDogXCJib3R0b20gYm90dG9tXCIsXG4vLyAgICAgICAgIGVuZDogXCJib3R0b20gdG9wXCIsXG4vLyAgICAgICAgIHBpbjogXCIuc2Nyb2xsLXRvLWV4cGxvcmVcIixcbi8vICAgICAgIH0pO1xuLy8gICAgICAgLy9QaW4ga25pZmUgd2hlbiByZWFjaGluZyBjZW50ZXIgb2Ygc2NyZWVuIHVudGlsIHJlYWR5IHRvIG1vdmUgb3V0XG4vLyAgICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4vLyAgICAgICAgIHNjcm9sbGVyOiBcImJvZHlcIixcbi8vICAgICAgICAgdHJpZ2dlcjogXCIjcGFnZS0yXCIsXG4vLyAgICAgICAgIGVuZFRyaWdnZXI6IFwiI3BhZ2UtNlwiLFxuLy8gICAgICAgICBzdGFydDogXCJjZW50ZXIgY2VudGVyXCIsXG4vLyAgICAgICAgIGVuZDogXCJib3R0b20gYm90dG9tXCIsXG4vLyAgICAgICAgIHBpbjogXCIja25pZmUtaW50cm9cIixcbi8vICAgICAgIH0pO1xuLy8gICAgICAgLy9GYWRlIGluIGFuZCBvdXQga25pZmUgaW50cm8gdGV4dFxuLy8gICAgICAgbGV0IHRsID0gZ3NhcC50aW1lbGluZSh7XG4vLyAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbi8vICAgICAgICAgICBzY3JvbGxlcjogXCJib2R5XCIsXG4vLyAgICAgICAgICAgdHJpZ2dlcjogXCIja25pZmUtaW50cm9cIixcbi8vICAgICAgICAgICBlbmRUcmlnZ2VyOiBcIiNwYWdlLTRcIixcbi8vICAgICAgICAgICBzdGFydDogXCJjZW50ZXIgY2VudGVyXCIsXG4vLyAgICAgICAgICAgZW5kOiBcImJvdHRvbSBib3R0b21cIixcbi8vICAgICAgICAgICBzY3J1YjogdHJ1ZSxcbi8vICAgICAgICAgfSxcbi8vICAgICAgIH0pO1xuLy8gICAgICAgdGwudG8oXCIua25pZmUtaW50cm9fX3RleHRcIiwgeyBvcGFjaXR5OiAxLCBkdXJhdGlvbjogMSB9KTtcbi8vICAgICAgIHRsLnRvKFwiLmtuaWZlLWludHJvX190ZXh0XCIsIHsgb3BhY2l0eTogMSwgZHVyYXRpb246IDIgfSk7XG4vLyAgICAgICB0bC50byhcIi5rbmlmZS1pbnRyb19fdGV4dFwiLCB7IG9wYWNpdHk6IDAsIGR1cmF0aW9uOiAxIH0pO1xuLy8gICAgICAgLy9GYWRlIGluIFVTUDFcbi8vICAgICAgIGdzYXAudG8oXCIudXNwMVwiLCB7XG4vLyAgICAgICAgIG9wYWNpdHk6IDEsXG4vLyAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbi8vICAgICAgICAgICBzY3JvbGxlcjogXCJib2R5XCIsXG4vLyAgICAgICAgICAgdHJpZ2dlcjogXCIjcGFnZS00XCIsXG4vLyAgICAgICAgICAgLy8gZW5kVHJpZ2dlcjogXCIjcGFnZS02XCIsXG4vLyAgICAgICAgICAgc3RhcnQ6IFwiY2VudGVyIGNlbnRlclwiLFxuLy8gICAgICAgICAgIGVuZDogXCJjZW50ZXIgdG9wXCIsXG4vLyAgICAgICAgICAgc2NydWI6IHRydWUsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICB9KTtcbi8vICAgICAgIC8vRmFkZSBpbiBVU1AyXG4vLyAgICAgICBnc2FwLnRvKFwiLnVzcDJcIiwge1xuLy8gICAgICAgICBvcGFjaXR5OiAxLFxuLy8gICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4vLyAgICAgICAgICAgc2Nyb2xsZXI6IFwiYm9keVwiLFxuLy8gICAgICAgICAgIHRyaWdnZXI6IFwiI3BhZ2UtNFwiLFxuLy8gICAgICAgICAgIC8vIGVuZFRyaWdnZXI6IFwiI3BhZ2UtNlwiLFxuLy8gICAgICAgICAgIHN0YXJ0OiBcImNlbnRlciB0b3BcIixcbi8vICAgICAgICAgICBlbmQ6IFwiYm90dG9tIHRvcFwiLFxuLy8gICAgICAgICAgIHNjcnViOiB0cnVlLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgfSk7XG4vLyAgICAgICAvL0ZhZGUgaW4gVVNQM1xuLy8gICAgICAgZ3NhcC50byhcIi51c3AzXCIsIHtcbi8vICAgICAgICAgb3BhY2l0eTogMSxcbi8vICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuLy8gICAgICAgICAgIHNjcm9sbGVyOiBcImJvZHlcIixcbi8vICAgICAgICAgICB0cmlnZ2VyOiBcIiNwYWdlLTVcIixcbi8vICAgICAgICAgICAvLyBlbmRUcmlnZ2VyOiBcIiNwYWdlLTZcIixcbi8vICAgICAgICAgICBzdGFydDogXCJjZW50ZXIgY2VudGVyXCIsXG4vLyAgICAgICAgICAgZW5kOiBcImNlbnRlciB0b3BcIixcbi8vICAgICAgICAgICBzY3J1YjogdHJ1ZSxcbi8vICAgICAgICAgfSxcbi8vICAgICAgIH0pO1xuLy8gICAgICAgLy9GYWRlIGluIFVTUDRcbi8vICAgICAgIGdzYXAudG8oXCIudXNwNFwiLCB7XG4vLyAgICAgICAgIG9wYWNpdHk6IDEsXG4vLyAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcbi8vICAgICAgICAgICBzY3JvbGxlcjogXCJib2R5XCIsXG4vLyAgICAgICAgICAgdHJpZ2dlcjogXCIjcGFnZS01XCIsXG4vLyAgICAgICAgICAgLy8gZW5kVHJpZ2dlcjogXCIjcGFnZS02XCIsXG4vLyAgICAgICAgICAgc3RhcnQ6IFwiY2VudGVyIHRvcFwiLFxuLy8gICAgICAgICAgIGVuZDogXCJib3R0b20gdG9wXCIsXG4vLyAgICAgICAgICAgc2NydWI6IHRydWUsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICB9KTtcbi8vICAgICB9LFxuLy8gICB9KTtcbi8vICAgLypcbi8vICAgLypcbi8vICAgLypcbi8vICAgLypcbi8vICAgLypcbi8vICAgLyoqL1xuLy8gICAkKHdpbmRvdykub24oXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24gKCkge1xuLy8gICAgICQoXCJtYWluXCIpLnJlbW92ZSgpO1xuLy8gICB9KTtcbi8vICAgLy8gZWFjaCB0aW1lIHRoZSB3aW5kb3cgdXBkYXRlcywgd2Ugc2hvdWxkIHJlZnJlc2ggU2Nyb2xsVHJpZ2dlciBhbmQgdGhlbiB1cGRhdGUgTG9jb21vdGl2ZVNjcm9sbC5cbi8vICAgU2Nyb2xsVHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwicmVmcmVzaFwiLCAoKSA9PiBzY3JvbGwudXBkYXRlKCkpO1xuLy8gICAvLyBhZnRlciBldmVyeXRoaW5nIGlzIHNldCB1cCwgcmVmcmVzaCgpIFNjcm9sbFRyaWdnZXIgYW5kIHVwZGF0ZSBMb2NvbW90aXZlU2Nyb2xsIGJlY2F1c2UgcGFkZGluZyBtYXkgaGF2ZSBiZWVuIGFkZGVkIGZvciBwaW5uaW5nLCBldGMuXG4vLyAgIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpO1xuLy8gfSk7XG5cInVzZSBzdHJpY3RcIjtcblxufSx7fV19LHt9LFsxXSk7XG4iXSwiZmlsZSI6ImluZGV4LmpzIn0=
