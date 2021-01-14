(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Cookie Notice JS
 * @author Alessandro Benoit
 */
(function () {
  "use strict";
  /**
   * Store current instance
   */

  var instance, originPaddingTop;
  /**
   * Defaults values
   * @type object
   */

  var defaults = {
    messageLocales: {
      it: "Utilizziamo i cookie per essere sicuri che tu possa avere la migliore esperienza sul nostro sito. Se continui ad utilizzare questo sito assumiamo che tu ne sia felice.",
      en: "We use cookies to ensure that you have the best experience on our website. If you continue to use this site we assume that you accept this.",
      fr: "Nous utilisons des cookies afin d'être sûr que vous pouvez avoir la meilleure expérience sur notre site. Si vous continuez à utiliser ce site, nous supposons que vous acceptez.",
      pt: "Utilizamos cookies para garantir que você tenha a melhor experiência em nosso site. Se você continuar a usar este site, assumimos que você aceita isso.",
      es: "Utilizamos cookies para asegurarnos de que usted tenga la mejor experiencia en nuestro sitio web. Si continúa usando este sitio, asumimos que lo acepta.",
      nl: "We gebruiken cookies om ervoor te zorgen dat u de beste ervaring heeft op onze website. Als u deze site blijft gebruiken, gaan we ervan uit dat u dit accepteert.",
      pl: "Używamy plików cookie w celu zapewnienia najlepszych doświadczeń na naszej stronie internetowej. Jeśli będziesz nadal korzystać z tej strony, zakładamy, że to akceptujesz.",
      de: "Wir verwenden Cookies, um sicherzustellen, dass Sie die beste Erfahrung auf unserer Website machen können. Wenn Sie diese Website weiterhin nutzen, gehen wir davon aus, dass Sie dies akzeptieren."
    },
    cookieNoticePosition: "bottom",
    learnMoreLinkEnabled: true,
    learnMoreLinkHref: "https://morakniv.se/en/support/privacy-policy/",
    learnMoreLinkText: {
      it: "Saperne di più",
      en: "Learn more",
      fr: "En savoir plus",
      pt: "Saber mais",
      es: "Aprende más.",
      nl: "Meer informatie",
      pl: "Dowiedz się więcej",
      de: "Mehr erfahren"
    },
    buttonLocales: {
      en: "OK"
    },
    expiresIn: 30,
    fontFamily: "inherit",
    fontSize: "12px",
    buttonBgColor: "#fff",
    buttonTextColor: "#000",
    noticeBgColor: "#090909",
    noticeTextColor: "#fff",
    linkColor: "#fff",
    linkBgColor: "#090909",
    linkTarget: "_blank",
    debug: false
  };
  /**
   * Initialize cookie notice on DOMContentLoaded
   * if not already initialized with alt params
   */

  document.addEventListener("DOMContentLoaded", function () {
    if (!instance) {
      new cookieNoticeJS();
    }
  });
  /**
   * Constructor
   * @constructor
   */

  window.cookieNoticeJS = function () {
    // If an instance is already set stop here
    if (instance !== undefined) {
      return;
    } // Set current instance


    instance = this; // If cookies are not supported or notice cookie is already set

    if (getNoticeCookie()) {
      return;
    } // 'data-' attribute - data-cookie-notice='{ "key": "value", ... }'


    var elemCfg = document.querySelector("script[ data-cookie-notice ]");
    var config;

    try {
      config = elemCfg ? JSON.parse(elemCfg.getAttribute("data-cookie-notice")) : {}; // TODO apply settings coming from data attribute and keep defaults if not overwritten -> 1.2.x
    } catch (ex) {
      console.error("data-cookie-notice JSON error:", elemCfg, ex);
      config = {};
    } // Extend default params


    var params = extendDefaults(defaults, arguments[0] || config || {});

    if (params.debug) {
      console.warn("cookie-notice:", params);
    } // Get current locale for notice text


    var noticeText = getStringForCurrentLocale(params.messageLocales); // Create notice

    var notice = createNotice(noticeText, params.noticeBgColor, params.noticeTextColor, params.fontFamily, params.fontSize, params.cookieNoticePosition);
    var learnMoreLink;

    if (params.learnMoreLinkEnabled) {
      var learnMoreLinkText = getStringForCurrentLocale(params.learnMoreLinkText);
      learnMoreLink = createLearnMoreLink(learnMoreLinkText, params.learnMoreLinkHref, params.linkTarget, params.linkColor, params.linkBgColor);
    } // Get current locale for button text


    var buttonText = getStringForCurrentLocale(params.buttonLocales); // Create dismiss button

    var dismissButton = createDismissButton(buttonText, params.buttonBgColor, params.buttonTextColor, params.fontFamily); // Dismiss button click event

    dismissButton.addEventListener("click", function (e) {
      e.preventDefault();
      setDismissNoticeCookie(parseInt(params.expiresIn + "", 10) * 60 * 1000 * 60 * 24);
      fadeElementOut(notice);
    }); // Append notice to the DOM

    var noticeDomElement = document.body.appendChild(notice);

    if (!!learnMoreLink) {
      noticeDomElement.appendChild(learnMoreLink);
    }

    noticeDomElement.appendChild(dismissButton);
  };
  /**
   * Get the string for the current locale
   * and fallback to "en" if none provided
   * @param locales
   * @returns {*}
   */


  function getStringForCurrentLocale(locales) {
    var locale = (navigator.userLanguage || navigator.language).substr(0, 2);
    return locales[locale] ? locales[locale] : locales["en"];
  }
  /**
   * Test if notice cookie is there
   * @returns {boolean}
   */


  function getNoticeCookie() {
    return document.cookie.indexOf("cookie_notice") != -1;
  }
  /**
   * Create notice
   * @param message
   * @param bgColor
   * @param textColor
   * @param position
   * @param fontFamily
   * @returns {HTMLElement}
   */


  function createNotice(message, bgColor, textColor, fontFamily, fontSize, position) {
    var notice = document.createElement("div"),
        noticeStyle = notice.style,
        lineHeight = "28px",
        paddingBottomTop = 10,
        noticeHeight = parseInt(lineHeight, 10) + paddingBottomTop * 2;
    fontSize = typeof fontSize !== "undefined" ? fontSize : "12px";
    notice.innerHTML = message + "&nbsp;";
    notice.setAttribute("id", "cookieNotice");
    notice.setAttribute("data-test-section", "cookie-notice");
    notice.setAttribute("data-test-transitioning", "false");
    noticeStyle.position = "fixed";

    if (position === "top") {
      var bodyDOMElement = document.querySelector("body");
      originPaddingTop = bodyDOMElement.style.paddingTop;
      noticeStyle.top = "0";
      bodyDOMElement.style.paddingTop = noticeHeight + "px";
    } else {
      noticeStyle.bottom = "0";
    }

    noticeStyle.left = "0";
    noticeStyle.right = "0";
    noticeStyle.background = bgColor;
    noticeStyle.color = textColor;
    noticeStyle["z-index"] = "999";
    noticeStyle.padding = paddingBottomTop + "px 5px";
    noticeStyle["text-align"] = "center";
    noticeStyle["font-size"] = fontSize;
    noticeStyle["line-height"] = lineHeight;

    if (!!fontFamily) {
      noticeStyle["fontFamily"] = fontFamily;
    }

    return notice;
  }
  /**
   * Create dismiss button
   * @param message
   * @param buttonColor
   * @param buttonTextColor
   * @returns {HTMLElement}
   */


  function createDismissButton(message, buttonColor, buttonTextColor, buttonTextFontFamily) {
    var dismissButton = document.createElement("span"),
        dismissButtonStyle = dismissButton.style; // Dismiss button

    dismissButton.href = "#";
    dismissButton.innerHTML = message;
    dismissButton.setAttribute("role", "button");
    dismissButton.className = "confirm";
    dismissButton.setAttribute("data-test-action", "dismiss-cookie-notice"); // Dismiss button style

    dismissButtonStyle.background = buttonColor;
    dismissButtonStyle.color = buttonTextColor;
    dismissButtonStyle["text-decoration"] = "none";
    dismissButtonStyle["cursor"] = "pointer";
    dismissButtonStyle.display = "inline-block";
    dismissButtonStyle.padding = "0 15px";
    dismissButtonStyle.margin = "0 0 0 10px";

    if (!!buttonTextFontFamily) {
      dismissButtonStyle.fontFamily = buttonTextFontFamily;
    }

    return dismissButton;
  }
  /**
   * Create the learn more link
   *
   * @param learnMoreLinkText
   * @param learnMoreLinkHref
   * @param linkColor
   * @returns {HTMLElement}
   */


  function createLearnMoreLink(learnMoreLinkText, learnMoreLinkHref, linkTarget, linkColor, linkBgColor) {
    var learnMoreLink = document.createElement("a"),
        learnMoreLinkStyle = learnMoreLink.style;
    learnMoreLink.href = learnMoreLinkHref;
    learnMoreLink.textContent = learnMoreLinkText;
    learnMoreLink.title = learnMoreLinkText;
    learnMoreLink.target = linkTarget;
    learnMoreLink.className = "learn-more";
    learnMoreLink.setAttribute("data-test-action", "learn-more-link");
    learnMoreLinkStyle.color = linkColor;
    learnMoreLinkStyle.backgroundColor = "transparent";
    learnMoreLinkStyle["text-decoration"] = "underline";
    learnMoreLinkStyle.display = "inline";
    return learnMoreLink;
  }
  /**
   * Set sismiss notice cookie
   * @param expireIn
   */


  function setDismissNoticeCookie(expireIn) {
    var now = new Date(),
        cookieExpire = new Date();
    cookieExpire.setTime(now.getTime() + expireIn);
    document.cookie = "cookie_notice=1; expires=" + cookieExpire.toUTCString() + "; path=/;";
  }
  /**
   * Fade a given element out
   * @param element
   */


  function fadeElementOut(element) {
    element.style.opacity = 1;
    element.setAttribute("data-test-transitioning", "true");

    (function fade() {
      if ((element.style.opacity -= 0.1) < 0.01) {
        if (originPaddingTop !== undefined) {
          var bodyDOMElement = document.querySelector("body");
          bodyDOMElement.style.paddingTop = originPaddingTop;
        }

        document.body.removeChild(element);
      } else {
        setTimeout(fade, 40);
      }
    })();
  }
  /**
   * Utility method to extend defaults with user options
   * @param source
   * @param properties
   * @returns {*}
   */


  function extendDefaults(source, properties) {
    var property;

    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        if (_typeof(source[property]) === "object") {
          source[property] = extendDefaults(source[property], properties[property]);
        } else {
          source[property] = properties[property];
        }
      }
    }

    return source;
  }
  /* test-code */


  cookieNoticeJS.extendDefaults = extendDefaults;

  cookieNoticeJS.clearInstance = function () {
    instance = undefined;
  };
  /* end-test-code */

})();

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb29raWUubm90aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLyoqXHJcbiAqIENvb2tpZSBOb3RpY2UgSlNcclxuICogQGF1dGhvciBBbGVzc2FuZHJvIEJlbm9pdFxyXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICAvKipcclxuICAgKiBTdG9yZSBjdXJyZW50IGluc3RhbmNlXHJcbiAgICovXG5cbiAgdmFyIGluc3RhbmNlLCBvcmlnaW5QYWRkaW5nVG9wO1xuICAvKipcclxuICAgKiBEZWZhdWx0cyB2YWx1ZXNcclxuICAgKiBAdHlwZSBvYmplY3RcclxuICAgKi9cblxuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgbWVzc2FnZUxvY2FsZXM6IHtcbiAgICAgIGl0OiBcIlV0aWxpenppYW1vIGkgY29va2llIHBlciBlc3NlcmUgc2ljdXJpIGNoZSB0dSBwb3NzYSBhdmVyZSBsYSBtaWdsaW9yZSBlc3BlcmllbnphIHN1bCBub3N0cm8gc2l0by4gU2UgY29udGludWkgYWQgdXRpbGl6emFyZSBxdWVzdG8gc2l0byBhc3N1bWlhbW8gY2hlIHR1IG5lIHNpYSBmZWxpY2UuXCIsXG4gICAgICBlbjogXCJXZSB1c2UgY29va2llcyB0byBlbnN1cmUgdGhhdCB5b3UgaGF2ZSB0aGUgYmVzdCBleHBlcmllbmNlIG9uIG91ciB3ZWJzaXRlLiBJZiB5b3UgY29udGludWUgdG8gdXNlIHRoaXMgc2l0ZSB3ZSBhc3N1bWUgdGhhdCB5b3UgYWNjZXB0IHRoaXMuXCIsXG4gICAgICBmcjogXCJOb3VzIHV0aWxpc29ucyBkZXMgY29va2llcyBhZmluIGQnw6p0cmUgc8O7ciBxdWUgdm91cyBwb3V2ZXogYXZvaXIgbGEgbWVpbGxldXJlIGV4cMOpcmllbmNlIHN1ciBub3RyZSBzaXRlLiBTaSB2b3VzIGNvbnRpbnVleiDDoCB1dGlsaXNlciBjZSBzaXRlLCBub3VzIHN1cHBvc29ucyBxdWUgdm91cyBhY2NlcHRlei5cIixcbiAgICAgIHB0OiBcIlV0aWxpemFtb3MgY29va2llcyBwYXJhIGdhcmFudGlyIHF1ZSB2b2PDqiB0ZW5oYSBhIG1lbGhvciBleHBlcmnDqm5jaWEgZW0gbm9zc28gc2l0ZS4gU2Ugdm9jw6ogY29udGludWFyIGEgdXNhciBlc3RlIHNpdGUsIGFzc3VtaW1vcyBxdWUgdm9jw6ogYWNlaXRhIGlzc28uXCIsXG4gICAgICBlczogXCJVdGlsaXphbW9zIGNvb2tpZXMgcGFyYSBhc2VndXJhcm5vcyBkZSBxdWUgdXN0ZWQgdGVuZ2EgbGEgbWVqb3IgZXhwZXJpZW5jaWEgZW4gbnVlc3RybyBzaXRpbyB3ZWIuIFNpIGNvbnRpbsO6YSB1c2FuZG8gZXN0ZSBzaXRpbywgYXN1bWltb3MgcXVlIGxvIGFjZXB0YS5cIixcbiAgICAgIG5sOiBcIldlIGdlYnJ1aWtlbiBjb29raWVzIG9tIGVydm9vciB0ZSB6b3JnZW4gZGF0IHUgZGUgYmVzdGUgZXJ2YXJpbmcgaGVlZnQgb3Agb256ZSB3ZWJzaXRlLiBBbHMgdSBkZXplIHNpdGUgYmxpamZ0IGdlYnJ1aWtlbiwgZ2FhbiB3ZSBlcnZhbiB1aXQgZGF0IHUgZGl0IGFjY2VwdGVlcnQuXCIsXG4gICAgICBwbDogXCJVxbx5d2FteSBwbGlrw7N3IGNvb2tpZSB3IGNlbHUgemFwZXduaWVuaWEgbmFqbGVwc3p5Y2ggZG/Fm3dpYWRjemXFhCBuYSBuYXN6ZWogc3Ryb25pZSBpbnRlcm5ldG93ZWouIEplxZtsaSBixJlkemllc3ogbmFkYWwga29yenlzdGHEhyB6IHRlaiBzdHJvbnksIHpha8WCYWRhbXksIMW8ZSB0byBha2NlcHR1amVzei5cIixcbiAgICAgIGRlOiBcIldpciB2ZXJ3ZW5kZW4gQ29va2llcywgdW0gc2ljaGVyenVzdGVsbGVuLCBkYXNzIFNpZSBkaWUgYmVzdGUgRXJmYWhydW5nIGF1ZiB1bnNlcmVyIFdlYnNpdGUgbWFjaGVuIGvDtm5uZW4uIFdlbm4gU2llIGRpZXNlIFdlYnNpdGUgd2VpdGVyaGluIG51dHplbiwgZ2VoZW4gd2lyIGRhdm9uIGF1cywgZGFzcyBTaWUgZGllcyBha3plcHRpZXJlbi5cIlxuICAgIH0sXG4gICAgY29va2llTm90aWNlUG9zaXRpb246IFwiYm90dG9tXCIsXG4gICAgbGVhcm5Nb3JlTGlua0VuYWJsZWQ6IHRydWUsXG4gICAgbGVhcm5Nb3JlTGlua0hyZWY6IFwiaHR0cHM6Ly9tb3Jha25pdi5zZS9lbi9zdXBwb3J0L3ByaXZhY3ktcG9saWN5L1wiLFxuICAgIGxlYXJuTW9yZUxpbmtUZXh0OiB7XG4gICAgICBpdDogXCJTYXBlcm5lIGRpIHBpw7lcIixcbiAgICAgIGVuOiBcIkxlYXJuIG1vcmVcIixcbiAgICAgIGZyOiBcIkVuIHNhdm9pciBwbHVzXCIsXG4gICAgICBwdDogXCJTYWJlciBtYWlzXCIsXG4gICAgICBlczogXCJBcHJlbmRlIG3DoXMuXCIsXG4gICAgICBubDogXCJNZWVyIGluZm9ybWF0aWVcIixcbiAgICAgIHBsOiBcIkRvd2llZHogc2nEmSB3acSZY2VqXCIsXG4gICAgICBkZTogXCJNZWhyIGVyZmFocmVuXCJcbiAgICB9LFxuICAgIGJ1dHRvbkxvY2FsZXM6IHtcbiAgICAgIGVuOiBcIk9LXCJcbiAgICB9LFxuICAgIGV4cGlyZXNJbjogMzAsXG4gICAgZm9udEZhbWlseTogXCJpbmhlcml0XCIsXG4gICAgZm9udFNpemU6IFwiMTJweFwiLFxuICAgIGJ1dHRvbkJnQ29sb3I6IFwiI2ZmZlwiLFxuICAgIGJ1dHRvblRleHRDb2xvcjogXCIjMDAwXCIsXG4gICAgbm90aWNlQmdDb2xvcjogXCIjMDkwOTA5XCIsXG4gICAgbm90aWNlVGV4dENvbG9yOiBcIiNmZmZcIixcbiAgICBsaW5rQ29sb3I6IFwiI2ZmZlwiLFxuICAgIGxpbmtCZ0NvbG9yOiBcIiMwOTA5MDlcIixcbiAgICBsaW5rVGFyZ2V0OiBcIl9ibGFua1wiLFxuICAgIGRlYnVnOiBmYWxzZVxuICB9O1xuICAvKipcclxuICAgKiBJbml0aWFsaXplIGNvb2tpZSBub3RpY2Ugb24gRE9NQ29udGVudExvYWRlZFxyXG4gICAqIGlmIG5vdCBhbHJlYWR5IGluaXRpYWxpemVkIHdpdGggYWx0IHBhcmFtc1xyXG4gICAqL1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICBuZXcgY29va2llTm90aWNlSlMoKTtcbiAgICB9XG4gIH0pO1xuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvclxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xuXG4gIHdpbmRvdy5jb29raWVOb3RpY2VKUyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBJZiBhbiBpbnN0YW5jZSBpcyBhbHJlYWR5IHNldCBzdG9wIGhlcmVcbiAgICBpZiAoaW5zdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gU2V0IGN1cnJlbnQgaW5zdGFuY2VcblxuXG4gICAgaW5zdGFuY2UgPSB0aGlzOyAvLyBJZiBjb29raWVzIGFyZSBub3Qgc3VwcG9ydGVkIG9yIG5vdGljZSBjb29raWUgaXMgYWxyZWFkeSBzZXRcblxuICAgIGlmIChnZXROb3RpY2VDb29raWUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gJ2RhdGEtJyBhdHRyaWJ1dGUgLSBkYXRhLWNvb2tpZS1ub3RpY2U9J3sgXCJrZXlcIjogXCJ2YWx1ZVwiLCAuLi4gfSdcblxuXG4gICAgdmFyIGVsZW1DZmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0WyBkYXRhLWNvb2tpZS1ub3RpY2UgXVwiKTtcbiAgICB2YXIgY29uZmlnO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbmZpZyA9IGVsZW1DZmcgPyBKU09OLnBhcnNlKGVsZW1DZmcuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29raWUtbm90aWNlXCIpKSA6IHt9OyAvLyBUT0RPIGFwcGx5IHNldHRpbmdzIGNvbWluZyBmcm9tIGRhdGEgYXR0cmlidXRlIGFuZCBrZWVwIGRlZmF1bHRzIGlmIG5vdCBvdmVyd3JpdHRlbiAtPiAxLjIueFxuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiZGF0YS1jb29raWUtbm90aWNlIEpTT04gZXJyb3I6XCIsIGVsZW1DZmcsIGV4KTtcbiAgICAgIGNvbmZpZyA9IHt9O1xuICAgIH0gLy8gRXh0ZW5kIGRlZmF1bHQgcGFyYW1zXG5cblxuICAgIHZhciBwYXJhbXMgPSBleHRlbmREZWZhdWx0cyhkZWZhdWx0cywgYXJndW1lbnRzWzBdIHx8IGNvbmZpZyB8fCB7fSk7XG5cbiAgICBpZiAocGFyYW1zLmRlYnVnKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJjb29raWUtbm90aWNlOlwiLCBwYXJhbXMpO1xuICAgIH0gLy8gR2V0IGN1cnJlbnQgbG9jYWxlIGZvciBub3RpY2UgdGV4dFxuXG5cbiAgICB2YXIgbm90aWNlVGV4dCA9IGdldFN0cmluZ0ZvckN1cnJlbnRMb2NhbGUocGFyYW1zLm1lc3NhZ2VMb2NhbGVzKTsgLy8gQ3JlYXRlIG5vdGljZVxuXG4gICAgdmFyIG5vdGljZSA9IGNyZWF0ZU5vdGljZShub3RpY2VUZXh0LCBwYXJhbXMubm90aWNlQmdDb2xvciwgcGFyYW1zLm5vdGljZVRleHRDb2xvciwgcGFyYW1zLmZvbnRGYW1pbHksIHBhcmFtcy5mb250U2l6ZSwgcGFyYW1zLmNvb2tpZU5vdGljZVBvc2l0aW9uKTtcbiAgICB2YXIgbGVhcm5Nb3JlTGluaztcblxuICAgIGlmIChwYXJhbXMubGVhcm5Nb3JlTGlua0VuYWJsZWQpIHtcbiAgICAgIHZhciBsZWFybk1vcmVMaW5rVGV4dCA9IGdldFN0cmluZ0ZvckN1cnJlbnRMb2NhbGUocGFyYW1zLmxlYXJuTW9yZUxpbmtUZXh0KTtcbiAgICAgIGxlYXJuTW9yZUxpbmsgPSBjcmVhdGVMZWFybk1vcmVMaW5rKGxlYXJuTW9yZUxpbmtUZXh0LCBwYXJhbXMubGVhcm5Nb3JlTGlua0hyZWYsIHBhcmFtcy5saW5rVGFyZ2V0LCBwYXJhbXMubGlua0NvbG9yLCBwYXJhbXMubGlua0JnQ29sb3IpO1xuICAgIH0gLy8gR2V0IGN1cnJlbnQgbG9jYWxlIGZvciBidXR0b24gdGV4dFxuXG5cbiAgICB2YXIgYnV0dG9uVGV4dCA9IGdldFN0cmluZ0ZvckN1cnJlbnRMb2NhbGUocGFyYW1zLmJ1dHRvbkxvY2FsZXMpOyAvLyBDcmVhdGUgZGlzbWlzcyBidXR0b25cblxuICAgIHZhciBkaXNtaXNzQnV0dG9uID0gY3JlYXRlRGlzbWlzc0J1dHRvbihidXR0b25UZXh0LCBwYXJhbXMuYnV0dG9uQmdDb2xvciwgcGFyYW1zLmJ1dHRvblRleHRDb2xvciwgcGFyYW1zLmZvbnRGYW1pbHkpOyAvLyBEaXNtaXNzIGJ1dHRvbiBjbGljayBldmVudFxuXG4gICAgZGlzbWlzc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNldERpc21pc3NOb3RpY2VDb29raWUocGFyc2VJbnQocGFyYW1zLmV4cGlyZXNJbiArIFwiXCIsIDEwKSAqIDYwICogMTAwMCAqIDYwICogMjQpO1xuICAgICAgZmFkZUVsZW1lbnRPdXQobm90aWNlKTtcbiAgICB9KTsgLy8gQXBwZW5kIG5vdGljZSB0byB0aGUgRE9NXG5cbiAgICB2YXIgbm90aWNlRG9tRWxlbWVudCA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm90aWNlKTtcblxuICAgIGlmICghIWxlYXJuTW9yZUxpbmspIHtcbiAgICAgIG5vdGljZURvbUVsZW1lbnQuYXBwZW5kQ2hpbGQobGVhcm5Nb3JlTGluayk7XG4gICAgfVxuXG4gICAgbm90aWNlRG9tRWxlbWVudC5hcHBlbmRDaGlsZChkaXNtaXNzQnV0dG9uKTtcbiAgfTtcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzdHJpbmcgZm9yIHRoZSBjdXJyZW50IGxvY2FsZVxyXG4gICAqIGFuZCBmYWxsYmFjayB0byBcImVuXCIgaWYgbm9uZSBwcm92aWRlZFxyXG4gICAqIEBwYXJhbSBsb2NhbGVzXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICovXG5cblxuICBmdW5jdGlvbiBnZXRTdHJpbmdGb3JDdXJyZW50TG9jYWxlKGxvY2FsZXMpIHtcbiAgICB2YXIgbG9jYWxlID0gKG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLmxhbmd1YWdlKS5zdWJzdHIoMCwgMik7XG4gICAgcmV0dXJuIGxvY2FsZXNbbG9jYWxlXSA/IGxvY2FsZXNbbG9jYWxlXSA6IGxvY2FsZXNbXCJlblwiXTtcbiAgfVxuICAvKipcclxuICAgKiBUZXN0IGlmIG5vdGljZSBjb29raWUgaXMgdGhlcmVcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGdldE5vdGljZUNvb2tpZSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCJjb29raWVfbm90aWNlXCIpICE9IC0xO1xuICB9XG4gIC8qKlxyXG4gICAqIENyZWF0ZSBub3RpY2VcclxuICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAqIEBwYXJhbSBiZ0NvbG9yXHJcbiAgICogQHBhcmFtIHRleHRDb2xvclxyXG4gICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAqIEBwYXJhbSBmb250RmFtaWx5XHJcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxyXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gY3JlYXRlTm90aWNlKG1lc3NhZ2UsIGJnQ29sb3IsIHRleHRDb2xvciwgZm9udEZhbWlseSwgZm9udFNpemUsIHBvc2l0aW9uKSB7XG4gICAgdmFyIG5vdGljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgICAgIG5vdGljZVN0eWxlID0gbm90aWNlLnN0eWxlLFxuICAgICAgICBsaW5lSGVpZ2h0ID0gXCIyOHB4XCIsXG4gICAgICAgIHBhZGRpbmdCb3R0b21Ub3AgPSAxMCxcbiAgICAgICAgbm90aWNlSGVpZ2h0ID0gcGFyc2VJbnQobGluZUhlaWdodCwgMTApICsgcGFkZGluZ0JvdHRvbVRvcCAqIDI7XG4gICAgZm9udFNpemUgPSB0eXBlb2YgZm9udFNpemUgIT09IFwidW5kZWZpbmVkXCIgPyBmb250U2l6ZSA6IFwiMTJweFwiO1xuICAgIG5vdGljZS5pbm5lckhUTUwgPSBtZXNzYWdlICsgXCImbmJzcDtcIjtcbiAgICBub3RpY2Uuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb29raWVOb3RpY2VcIik7XG4gICAgbm90aWNlLnNldEF0dHJpYnV0ZShcImRhdGEtdGVzdC1zZWN0aW9uXCIsIFwiY29va2llLW5vdGljZVwiKTtcbiAgICBub3RpY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS10ZXN0LXRyYW5zaXRpb25pbmdcIiwgXCJmYWxzZVwiKTtcbiAgICBub3RpY2VTdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gXCJ0b3BcIikge1xuICAgICAgdmFyIGJvZHlET01FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICBvcmlnaW5QYWRkaW5nVG9wID0gYm9keURPTUVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcDtcbiAgICAgIG5vdGljZVN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgYm9keURPTUVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IG5vdGljZUhlaWdodCArIFwicHhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgbm90aWNlU3R5bGUuYm90dG9tID0gXCIwXCI7XG4gICAgfVxuXG4gICAgbm90aWNlU3R5bGUubGVmdCA9IFwiMFwiO1xuICAgIG5vdGljZVN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgbm90aWNlU3R5bGUuYmFja2dyb3VuZCA9IGJnQ29sb3I7XG4gICAgbm90aWNlU3R5bGUuY29sb3IgPSB0ZXh0Q29sb3I7XG4gICAgbm90aWNlU3R5bGVbXCJ6LWluZGV4XCJdID0gXCI5OTlcIjtcbiAgICBub3RpY2VTdHlsZS5wYWRkaW5nID0gcGFkZGluZ0JvdHRvbVRvcCArIFwicHggNXB4XCI7XG4gICAgbm90aWNlU3R5bGVbXCJ0ZXh0LWFsaWduXCJdID0gXCJjZW50ZXJcIjtcbiAgICBub3RpY2VTdHlsZVtcImZvbnQtc2l6ZVwiXSA9IGZvbnRTaXplO1xuICAgIG5vdGljZVN0eWxlW1wibGluZS1oZWlnaHRcIl0gPSBsaW5lSGVpZ2h0O1xuXG4gICAgaWYgKCEhZm9udEZhbWlseSkge1xuICAgICAgbm90aWNlU3R5bGVbXCJmb250RmFtaWx5XCJdID0gZm9udEZhbWlseTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm90aWNlO1xuICB9XG4gIC8qKlxyXG4gICAqIENyZWF0ZSBkaXNtaXNzIGJ1dHRvblxyXG4gICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICogQHBhcmFtIGJ1dHRvbkNvbG9yXHJcbiAgICogQHBhcmFtIGJ1dHRvblRleHRDb2xvclxyXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cclxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZURpc21pc3NCdXR0b24obWVzc2FnZSwgYnV0dG9uQ29sb3IsIGJ1dHRvblRleHRDb2xvciwgYnV0dG9uVGV4dEZvbnRGYW1pbHkpIHtcbiAgICB2YXIgZGlzbWlzc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLFxuICAgICAgICBkaXNtaXNzQnV0dG9uU3R5bGUgPSBkaXNtaXNzQnV0dG9uLnN0eWxlOyAvLyBEaXNtaXNzIGJ1dHRvblxuXG4gICAgZGlzbWlzc0J1dHRvbi5ocmVmID0gXCIjXCI7XG4gICAgZGlzbWlzc0J1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGRpc21pc3NCdXR0b24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBkaXNtaXNzQnV0dG9uLmNsYXNzTmFtZSA9IFwiY29uZmlybVwiO1xuICAgIGRpc21pc3NCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS10ZXN0LWFjdGlvblwiLCBcImRpc21pc3MtY29va2llLW5vdGljZVwiKTsgLy8gRGlzbWlzcyBidXR0b24gc3R5bGVcblxuICAgIGRpc21pc3NCdXR0b25TdHlsZS5iYWNrZ3JvdW5kID0gYnV0dG9uQ29sb3I7XG4gICAgZGlzbWlzc0J1dHRvblN0eWxlLmNvbG9yID0gYnV0dG9uVGV4dENvbG9yO1xuICAgIGRpc21pc3NCdXR0b25TdHlsZVtcInRleHQtZGVjb3JhdGlvblwiXSA9IFwibm9uZVwiO1xuICAgIGRpc21pc3NCdXR0b25TdHlsZVtcImN1cnNvclwiXSA9IFwicG9pbnRlclwiO1xuICAgIGRpc21pc3NCdXR0b25TdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICBkaXNtaXNzQnV0dG9uU3R5bGUucGFkZGluZyA9IFwiMCAxNXB4XCI7XG4gICAgZGlzbWlzc0J1dHRvblN0eWxlLm1hcmdpbiA9IFwiMCAwIDAgMTBweFwiO1xuXG4gICAgaWYgKCEhYnV0dG9uVGV4dEZvbnRGYW1pbHkpIHtcbiAgICAgIGRpc21pc3NCdXR0b25TdHlsZS5mb250RmFtaWx5ID0gYnV0dG9uVGV4dEZvbnRGYW1pbHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc21pc3NCdXR0b247XG4gIH1cbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBsZWFybiBtb3JlIGxpbmtcclxuICAgKlxyXG4gICAqIEBwYXJhbSBsZWFybk1vcmVMaW5rVGV4dFxyXG4gICAqIEBwYXJhbSBsZWFybk1vcmVMaW5rSHJlZlxyXG4gICAqIEBwYXJhbSBsaW5rQ29sb3JcclxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XHJcbiAgICovXG5cblxuICBmdW5jdGlvbiBjcmVhdGVMZWFybk1vcmVMaW5rKGxlYXJuTW9yZUxpbmtUZXh0LCBsZWFybk1vcmVMaW5rSHJlZiwgbGlua1RhcmdldCwgbGlua0NvbG9yLCBsaW5rQmdDb2xvcikge1xuICAgIHZhciBsZWFybk1vcmVMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIiksXG4gICAgICAgIGxlYXJuTW9yZUxpbmtTdHlsZSA9IGxlYXJuTW9yZUxpbmsuc3R5bGU7XG4gICAgbGVhcm5Nb3JlTGluay5ocmVmID0gbGVhcm5Nb3JlTGlua0hyZWY7XG4gICAgbGVhcm5Nb3JlTGluay50ZXh0Q29udGVudCA9IGxlYXJuTW9yZUxpbmtUZXh0O1xuICAgIGxlYXJuTW9yZUxpbmsudGl0bGUgPSBsZWFybk1vcmVMaW5rVGV4dDtcbiAgICBsZWFybk1vcmVMaW5rLnRhcmdldCA9IGxpbmtUYXJnZXQ7XG4gICAgbGVhcm5Nb3JlTGluay5jbGFzc05hbWUgPSBcImxlYXJuLW1vcmVcIjtcbiAgICBsZWFybk1vcmVMaW5rLnNldEF0dHJpYnV0ZShcImRhdGEtdGVzdC1hY3Rpb25cIiwgXCJsZWFybi1tb3JlLWxpbmtcIik7XG4gICAgbGVhcm5Nb3JlTGlua1N0eWxlLmNvbG9yID0gbGlua0NvbG9yO1xuICAgIGxlYXJuTW9yZUxpbmtTdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgbGVhcm5Nb3JlTGlua1N0eWxlW1widGV4dC1kZWNvcmF0aW9uXCJdID0gXCJ1bmRlcmxpbmVcIjtcbiAgICBsZWFybk1vcmVMaW5rU3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgcmV0dXJuIGxlYXJuTW9yZUxpbms7XG4gIH1cbiAgLyoqXHJcbiAgICogU2V0IHNpc21pc3Mgbm90aWNlIGNvb2tpZVxyXG4gICAqIEBwYXJhbSBleHBpcmVJblxyXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gc2V0RGlzbWlzc05vdGljZUNvb2tpZShleHBpcmVJbikge1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBjb29raWVFeHBpcmUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvb2tpZUV4cGlyZS5zZXRUaW1lKG5vdy5nZXRUaW1lKCkgKyBleHBpcmVJbik7XG4gICAgZG9jdW1lbnQuY29va2llID0gXCJjb29raWVfbm90aWNlPTE7IGV4cGlyZXM9XCIgKyBjb29raWVFeHBpcmUudG9VVENTdHJpbmcoKSArIFwiOyBwYXRoPS87XCI7XG4gIH1cbiAgLyoqXHJcbiAgICogRmFkZSBhIGdpdmVuIGVsZW1lbnQgb3V0XHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGZhZGVFbGVtZW50T3V0KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10ZXN0LXRyYW5zaXRpb25pbmdcIiwgXCJ0cnVlXCIpO1xuXG4gICAgKGZ1bmN0aW9uIGZhZGUoKSB7XG4gICAgICBpZiAoKGVsZW1lbnQuc3R5bGUub3BhY2l0eSAtPSAwLjEpIDwgMC4wMSkge1xuICAgICAgICBpZiAob3JpZ2luUGFkZGluZ1RvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIGJvZHlET01FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICAgICAgYm9keURPTUVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IG9yaWdpblBhZGRpbmdUb3A7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChmYWRlLCA0MCk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfVxuICAvKipcclxuICAgKiBVdGlsaXR5IG1ldGhvZCB0byBleHRlbmQgZGVmYXVsdHMgd2l0aCB1c2VyIG9wdGlvbnNcclxuICAgKiBAcGFyYW0gc291cmNlXHJcbiAgICogQHBhcmFtIHByb3BlcnRpZXNcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGV4dGVuZERlZmF1bHRzKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgIHZhciBwcm9wZXJ0eTtcblxuICAgIGZvciAocHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIGlmIChfdHlwZW9mKHNvdXJjZVtwcm9wZXJ0eV0pID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IGV4dGVuZERlZmF1bHRzKHNvdXJjZVtwcm9wZXJ0eV0sIHByb3BlcnRpZXNbcHJvcGVydHldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb3VyY2VbcHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIC8qIHRlc3QtY29kZSAqL1xuXG5cbiAgY29va2llTm90aWNlSlMuZXh0ZW5kRGVmYXVsdHMgPSBleHRlbmREZWZhdWx0cztcblxuICBjb29raWVOb3RpY2VKUy5jbGVhckluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIGluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9O1xuICAvKiBlbmQtdGVzdC1jb2RlICovXG5cbn0pKCk7XG5cbn0se31dfSx7fSxbMV0pO1xuIl0sImZpbGUiOiJjb29raWUubm90aWNlLmpzIn0=
