(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: ".first-page",
  start: "top top",
  pin: true,
  pinSpacing: false
});
ScrollTrigger.create({
  trigger: ".second-page",
  start: "top top",
  pin: true,
  pinSpacing: false
});
ScrollTrigger.create({
  trigger: ".third-page",
  start: "top top",
  pin: true
});

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5nc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xuU2Nyb2xsVHJpZ2dlci5jcmVhdGUoe1xuICB0cmlnZ2VyOiBcIi5maXJzdC1wYWdlXCIsXG4gIHN0YXJ0OiBcInRvcCB0b3BcIixcbiAgcGluOiB0cnVlLFxuICBwaW5TcGFjaW5nOiBmYWxzZVxufSk7XG5TY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gIHRyaWdnZXI6IFwiLnNlY29uZC1wYWdlXCIsXG4gIHN0YXJ0OiBcInRvcCB0b3BcIixcbiAgcGluOiB0cnVlLFxuICBwaW5TcGFjaW5nOiBmYWxzZVxufSk7XG5TY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gIHRyaWdnZXI6IFwiLnRoaXJkLXBhZ2VcIixcbiAgc3RhcnQ6IFwidG9wIHRvcFwiLFxuICBwaW46IHRydWVcbn0pO1xuXG59LHt9XX0se30sWzFdKTtcbiJdLCJmaWxlIjoiaW5kZXguanMifQ==
