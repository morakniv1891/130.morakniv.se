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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb29raWUubm90aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLyoqXG4gKiBDb29raWUgTm90aWNlIEpTXG4gKiBAYXV0aG9yIEFsZXNzYW5kcm8gQmVub2l0XG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICAvKipcbiAgICogU3RvcmUgY3VycmVudCBpbnN0YW5jZVxuICAgKi9cblxuICB2YXIgaW5zdGFuY2UsIG9yaWdpblBhZGRpbmdUb3A7XG4gIC8qKlxuICAgKiBEZWZhdWx0cyB2YWx1ZXNcbiAgICogQHR5cGUgb2JqZWN0XG4gICAqL1xuXG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICBtZXNzYWdlTG9jYWxlczoge1xuICAgICAgaXQ6IFwiVXRpbGl6emlhbW8gaSBjb29raWUgcGVyIGVzc2VyZSBzaWN1cmkgY2hlIHR1IHBvc3NhIGF2ZXJlIGxhIG1pZ2xpb3JlIGVzcGVyaWVuemEgc3VsIG5vc3RybyBzaXRvLiBTZSBjb250aW51aSBhZCB1dGlsaXp6YXJlIHF1ZXN0byBzaXRvIGFzc3VtaWFtbyBjaGUgdHUgbmUgc2lhIGZlbGljZS5cIixcbiAgICAgIGVuOiBcIldlIHVzZSBjb29raWVzIHRvIGVuc3VyZSB0aGF0IHlvdSBoYXZlIHRoZSBiZXN0IGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuIElmIHlvdSBjb250aW51ZSB0byB1c2UgdGhpcyBzaXRlIHdlIGFzc3VtZSB0aGF0IHlvdSBhY2NlcHQgdGhpcy5cIixcbiAgICAgIGZyOiBcIk5vdXMgdXRpbGlzb25zIGRlcyBjb29raWVzIGFmaW4gZCfDqnRyZSBzw7tyIHF1ZSB2b3VzIHBvdXZleiBhdm9pciBsYSBtZWlsbGV1cmUgZXhww6lyaWVuY2Ugc3VyIG5vdHJlIHNpdGUuIFNpIHZvdXMgY29udGludWV6IMOgIHV0aWxpc2VyIGNlIHNpdGUsIG5vdXMgc3VwcG9zb25zIHF1ZSB2b3VzIGFjY2VwdGV6LlwiLFxuICAgICAgcHQ6IFwiVXRpbGl6YW1vcyBjb29raWVzIHBhcmEgZ2FyYW50aXIgcXVlIHZvY8OqIHRlbmhhIGEgbWVsaG9yIGV4cGVyacOqbmNpYSBlbSBub3NzbyBzaXRlLiBTZSB2b2PDqiBjb250aW51YXIgYSB1c2FyIGVzdGUgc2l0ZSwgYXNzdW1pbW9zIHF1ZSB2b2PDqiBhY2VpdGEgaXNzby5cIixcbiAgICAgIGVzOiBcIlV0aWxpemFtb3MgY29va2llcyBwYXJhIGFzZWd1cmFybm9zIGRlIHF1ZSB1c3RlZCB0ZW5nYSBsYSBtZWpvciBleHBlcmllbmNpYSBlbiBudWVzdHJvIHNpdGlvIHdlYi4gU2kgY29udGluw7phIHVzYW5kbyBlc3RlIHNpdGlvLCBhc3VtaW1vcyBxdWUgbG8gYWNlcHRhLlwiLFxuICAgICAgbmw6IFwiV2UgZ2VicnVpa2VuIGNvb2tpZXMgb20gZXJ2b29yIHRlIHpvcmdlbiBkYXQgdSBkZSBiZXN0ZSBlcnZhcmluZyBoZWVmdCBvcCBvbnplIHdlYnNpdGUuIEFscyB1IGRlemUgc2l0ZSBibGlqZnQgZ2VicnVpa2VuLCBnYWFuIHdlIGVydmFuIHVpdCBkYXQgdSBkaXQgYWNjZXB0ZWVydC5cIixcbiAgICAgIHBsOiBcIlXFvHl3YW15IHBsaWvDs3cgY29va2llIHcgY2VsdSB6YXBld25pZW5pYSBuYWpsZXBzenljaCBkb8Wbd2lhZGN6ZcWEIG5hIG5hc3plaiBzdHJvbmllIGludGVybmV0b3dlai4gSmXFm2xpIGLEmWR6aWVzeiBuYWRhbCBrb3J6eXN0YcSHIHogdGVqIHN0cm9ueSwgemFrxYJhZGFteSwgxbxlIHRvIGFrY2VwdHVqZXN6LlwiLFxuICAgICAgZGU6IFwiV2lyIHZlcndlbmRlbiBDb29raWVzLCB1bSBzaWNoZXJ6dXN0ZWxsZW4sIGRhc3MgU2llIGRpZSBiZXN0ZSBFcmZhaHJ1bmcgYXVmIHVuc2VyZXIgV2Vic2l0ZSBtYWNoZW4ga8O2bm5lbi4gV2VubiBTaWUgZGllc2UgV2Vic2l0ZSB3ZWl0ZXJoaW4gbnV0emVuLCBnZWhlbiB3aXIgZGF2b24gYXVzLCBkYXNzIFNpZSBkaWVzIGFremVwdGllcmVuLlwiXG4gICAgfSxcbiAgICBjb29raWVOb3RpY2VQb3NpdGlvbjogXCJib3R0b21cIixcbiAgICBsZWFybk1vcmVMaW5rRW5hYmxlZDogdHJ1ZSxcbiAgICBsZWFybk1vcmVMaW5rSHJlZjogXCJodHRwczovL21vcmFrbml2LnNlL2VuL3N1cHBvcnQvcHJpdmFjeS1wb2xpY3kvXCIsXG4gICAgbGVhcm5Nb3JlTGlua1RleHQ6IHtcbiAgICAgIGl0OiBcIlNhcGVybmUgZGkgcGnDuVwiLFxuICAgICAgZW46IFwiTGVhcm4gbW9yZVwiLFxuICAgICAgZnI6IFwiRW4gc2F2b2lyIHBsdXNcIixcbiAgICAgIHB0OiBcIlNhYmVyIG1haXNcIixcbiAgICAgIGVzOiBcIkFwcmVuZGUgbcOhcy5cIixcbiAgICAgIG5sOiBcIk1lZXIgaW5mb3JtYXRpZVwiLFxuICAgICAgcGw6IFwiRG93aWVkeiBzacSZIHdpxJljZWpcIixcbiAgICAgIGRlOiBcIk1laHIgZXJmYWhyZW5cIlxuICAgIH0sXG4gICAgYnV0dG9uTG9jYWxlczoge1xuICAgICAgZW46IFwiT0tcIlxuICAgIH0sXG4gICAgZXhwaXJlc0luOiAzMCxcbiAgICBmb250RmFtaWx5OiBcImluaGVyaXRcIixcbiAgICBmb250U2l6ZTogXCIxMnB4XCIsXG4gICAgYnV0dG9uQmdDb2xvcjogXCIjZmZmXCIsXG4gICAgYnV0dG9uVGV4dENvbG9yOiBcIiMwMDBcIixcbiAgICBub3RpY2VCZ0NvbG9yOiBcIiMwOTA5MDlcIixcbiAgICBub3RpY2VUZXh0Q29sb3I6IFwiI2ZmZlwiLFxuICAgIGxpbmtDb2xvcjogXCIjZmZmXCIsXG4gICAgbGlua0JnQ29sb3I6IFwiIzA5MDkwOVwiLFxuICAgIGxpbmtUYXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgZGVidWc6IGZhbHNlXG4gIH07XG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGNvb2tpZSBub3RpY2Ugb24gRE9NQ29udGVudExvYWRlZFxuICAgKiBpZiBub3QgYWxyZWFkeSBpbml0aWFsaXplZCB3aXRoIGFsdCBwYXJhbXNcbiAgICovXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgIG5ldyBjb29raWVOb3RpY2VKUygpO1xuICAgIH1cbiAgfSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG5cbiAgd2luZG93LmNvb2tpZU5vdGljZUpTID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIElmIGFuIGluc3RhbmNlIGlzIGFscmVhZHkgc2V0IHN0b3AgaGVyZVxuICAgIGlmIChpbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBTZXQgY3VycmVudCBpbnN0YW5jZVxuXG5cbiAgICBpbnN0YW5jZSA9IHRoaXM7IC8vIElmIGNvb2tpZXMgYXJlIG5vdCBzdXBwb3J0ZWQgb3Igbm90aWNlIGNvb2tpZSBpcyBhbHJlYWR5IHNldFxuXG4gICAgaWYgKGdldE5vdGljZUNvb2tpZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyAnZGF0YS0nIGF0dHJpYnV0ZSAtIGRhdGEtY29va2llLW5vdGljZT0neyBcImtleVwiOiBcInZhbHVlXCIsIC4uLiB9J1xuXG5cbiAgICB2YXIgZWxlbUNmZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzY3JpcHRbIGRhdGEtY29va2llLW5vdGljZSBdXCIpO1xuICAgIHZhciBjb25maWc7XG5cbiAgICB0cnkge1xuICAgICAgY29uZmlnID0gZWxlbUNmZyA/IEpTT04ucGFyc2UoZWxlbUNmZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb2tpZS1ub3RpY2VcIikpIDoge307IC8vIFRPRE8gYXBwbHkgc2V0dGluZ3MgY29taW5nIGZyb20gZGF0YSBhdHRyaWJ1dGUgYW5kIGtlZXAgZGVmYXVsdHMgaWYgbm90IG92ZXJ3cml0dGVuIC0+IDEuMi54XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJkYXRhLWNvb2tpZS1ub3RpY2UgSlNPTiBlcnJvcjpcIiwgZWxlbUNmZywgZXgpO1xuICAgICAgY29uZmlnID0ge307XG4gICAgfSAvLyBFeHRlbmQgZGVmYXVsdCBwYXJhbXNcblxuXG4gICAgdmFyIHBhcmFtcyA9IGV4dGVuZERlZmF1bHRzKGRlZmF1bHRzLCBhcmd1bWVudHNbMF0gfHwgY29uZmlnIHx8IHt9KTtcblxuICAgIGlmIChwYXJhbXMuZGVidWcpIHtcbiAgICAgIGNvbnNvbGUud2FybihcImNvb2tpZS1ub3RpY2U6XCIsIHBhcmFtcyk7XG4gICAgfSAvLyBHZXQgY3VycmVudCBsb2NhbGUgZm9yIG5vdGljZSB0ZXh0XG5cblxuICAgIHZhciBub3RpY2VUZXh0ID0gZ2V0U3RyaW5nRm9yQ3VycmVudExvY2FsZShwYXJhbXMubWVzc2FnZUxvY2FsZXMpOyAvLyBDcmVhdGUgbm90aWNlXG5cbiAgICB2YXIgbm90aWNlID0gY3JlYXRlTm90aWNlKG5vdGljZVRleHQsIHBhcmFtcy5ub3RpY2VCZ0NvbG9yLCBwYXJhbXMubm90aWNlVGV4dENvbG9yLCBwYXJhbXMuZm9udEZhbWlseSwgcGFyYW1zLmZvbnRTaXplLCBwYXJhbXMuY29va2llTm90aWNlUG9zaXRpb24pO1xuICAgIHZhciBsZWFybk1vcmVMaW5rO1xuXG4gICAgaWYgKHBhcmFtcy5sZWFybk1vcmVMaW5rRW5hYmxlZCkge1xuICAgICAgdmFyIGxlYXJuTW9yZUxpbmtUZXh0ID0gZ2V0U3RyaW5nRm9yQ3VycmVudExvY2FsZShwYXJhbXMubGVhcm5Nb3JlTGlua1RleHQpO1xuICAgICAgbGVhcm5Nb3JlTGluayA9IGNyZWF0ZUxlYXJuTW9yZUxpbmsobGVhcm5Nb3JlTGlua1RleHQsIHBhcmFtcy5sZWFybk1vcmVMaW5rSHJlZiwgcGFyYW1zLmxpbmtUYXJnZXQsIHBhcmFtcy5saW5rQ29sb3IsIHBhcmFtcy5saW5rQmdDb2xvcik7XG4gICAgfSAvLyBHZXQgY3VycmVudCBsb2NhbGUgZm9yIGJ1dHRvbiB0ZXh0XG5cblxuICAgIHZhciBidXR0b25UZXh0ID0gZ2V0U3RyaW5nRm9yQ3VycmVudExvY2FsZShwYXJhbXMuYnV0dG9uTG9jYWxlcyk7IC8vIENyZWF0ZSBkaXNtaXNzIGJ1dHRvblxuXG4gICAgdmFyIGRpc21pc3NCdXR0b24gPSBjcmVhdGVEaXNtaXNzQnV0dG9uKGJ1dHRvblRleHQsIHBhcmFtcy5idXR0b25CZ0NvbG9yLCBwYXJhbXMuYnV0dG9uVGV4dENvbG9yLCBwYXJhbXMuZm9udEZhbWlseSk7IC8vIERpc21pc3MgYnV0dG9uIGNsaWNrIGV2ZW50XG5cbiAgICBkaXNtaXNzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2V0RGlzbWlzc05vdGljZUNvb2tpZShwYXJzZUludChwYXJhbXMuZXhwaXJlc0luICsgXCJcIiwgMTApICogNjAgKiAxMDAwICogNjAgKiAyNCk7XG4gICAgICBmYWRlRWxlbWVudE91dChub3RpY2UpO1xuICAgIH0pOyAvLyBBcHBlbmQgbm90aWNlIHRvIHRoZSBET01cblxuICAgIHZhciBub3RpY2VEb21FbGVtZW50ID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub3RpY2UpO1xuXG4gICAgaWYgKCEhbGVhcm5Nb3JlTGluaykge1xuICAgICAgbm90aWNlRG9tRWxlbWVudC5hcHBlbmRDaGlsZChsZWFybk1vcmVMaW5rKTtcbiAgICB9XG5cbiAgICBub3RpY2VEb21FbGVtZW50LmFwcGVuZENoaWxkKGRpc21pc3NCdXR0b24pO1xuICB9O1xuICAvKipcbiAgICogR2V0IHRoZSBzdHJpbmcgZm9yIHRoZSBjdXJyZW50IGxvY2FsZVxuICAgKiBhbmQgZmFsbGJhY2sgdG8gXCJlblwiIGlmIG5vbmUgcHJvdmlkZWRcbiAgICogQHBhcmFtIGxvY2FsZXNcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gZ2V0U3RyaW5nRm9yQ3VycmVudExvY2FsZShsb2NhbGVzKSB7XG4gICAgdmFyIGxvY2FsZSA9IChuYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8IG5hdmlnYXRvci5sYW5ndWFnZSkuc3Vic3RyKDAsIDIpO1xuICAgIHJldHVybiBsb2NhbGVzW2xvY2FsZV0gPyBsb2NhbGVzW2xvY2FsZV0gOiBsb2NhbGVzW1wiZW5cIl07XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgbm90aWNlIGNvb2tpZSBpcyB0aGVyZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBmdW5jdGlvbiBnZXROb3RpY2VDb29raWUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiY29va2llX25vdGljZVwiKSAhPSAtMTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIG5vdGljZVxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKiBAcGFyYW0gYmdDb2xvclxuICAgKiBAcGFyYW0gdGV4dENvbG9yXG4gICAqIEBwYXJhbSBwb3NpdGlvblxuICAgKiBAcGFyYW0gZm9udEZhbWlseVxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gY3JlYXRlTm90aWNlKG1lc3NhZ2UsIGJnQ29sb3IsIHRleHRDb2xvciwgZm9udEZhbWlseSwgZm9udFNpemUsIHBvc2l0aW9uKSB7XG4gICAgdmFyIG5vdGljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgICAgIG5vdGljZVN0eWxlID0gbm90aWNlLnN0eWxlLFxuICAgICAgICBsaW5lSGVpZ2h0ID0gXCIyOHB4XCIsXG4gICAgICAgIHBhZGRpbmdCb3R0b21Ub3AgPSAxMCxcbiAgICAgICAgbm90aWNlSGVpZ2h0ID0gcGFyc2VJbnQobGluZUhlaWdodCwgMTApICsgcGFkZGluZ0JvdHRvbVRvcCAqIDI7XG4gICAgZm9udFNpemUgPSB0eXBlb2YgZm9udFNpemUgIT09IFwidW5kZWZpbmVkXCIgPyBmb250U2l6ZSA6IFwiMTJweFwiO1xuICAgIG5vdGljZS5pbm5lckhUTUwgPSBtZXNzYWdlICsgXCImbmJzcDtcIjtcbiAgICBub3RpY2Uuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb29raWVOb3RpY2VcIik7XG4gICAgbm90aWNlLnNldEF0dHJpYnV0ZShcImRhdGEtdGVzdC1zZWN0aW9uXCIsIFwiY29va2llLW5vdGljZVwiKTtcbiAgICBub3RpY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS10ZXN0LXRyYW5zaXRpb25pbmdcIiwgXCJmYWxzZVwiKTtcbiAgICBub3RpY2VTdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcblxuICAgIGlmIChwb3NpdGlvbiA9PT0gXCJ0b3BcIikge1xuICAgICAgdmFyIGJvZHlET01FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgICBvcmlnaW5QYWRkaW5nVG9wID0gYm9keURPTUVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcDtcbiAgICAgIG5vdGljZVN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgYm9keURPTUVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IG5vdGljZUhlaWdodCArIFwicHhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgbm90aWNlU3R5bGUuYm90dG9tID0gXCIwXCI7XG4gICAgfVxuXG4gICAgbm90aWNlU3R5bGUubGVmdCA9IFwiMFwiO1xuICAgIG5vdGljZVN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgbm90aWNlU3R5bGUuYmFja2dyb3VuZCA9IGJnQ29sb3I7XG4gICAgbm90aWNlU3R5bGUuY29sb3IgPSB0ZXh0Q29sb3I7XG4gICAgbm90aWNlU3R5bGVbXCJ6LWluZGV4XCJdID0gXCI5OTlcIjtcbiAgICBub3RpY2VTdHlsZS5wYWRkaW5nID0gcGFkZGluZ0JvdHRvbVRvcCArIFwicHggNXB4XCI7XG4gICAgbm90aWNlU3R5bGVbXCJ0ZXh0LWFsaWduXCJdID0gXCJjZW50ZXJcIjtcbiAgICBub3RpY2VTdHlsZVtcImZvbnQtc2l6ZVwiXSA9IGZvbnRTaXplO1xuICAgIG5vdGljZVN0eWxlW1wibGluZS1oZWlnaHRcIl0gPSBsaW5lSGVpZ2h0O1xuXG4gICAgaWYgKCEhZm9udEZhbWlseSkge1xuICAgICAgbm90aWNlU3R5bGVbXCJmb250RmFtaWx5XCJdID0gZm9udEZhbWlseTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm90aWNlO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgZGlzbWlzcyBidXR0b25cbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICogQHBhcmFtIGJ1dHRvbkNvbG9yXG4gICAqIEBwYXJhbSBidXR0b25UZXh0Q29sb3JcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZURpc21pc3NCdXR0b24obWVzc2FnZSwgYnV0dG9uQ29sb3IsIGJ1dHRvblRleHRDb2xvciwgYnV0dG9uVGV4dEZvbnRGYW1pbHkpIHtcbiAgICB2YXIgZGlzbWlzc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLFxuICAgICAgICBkaXNtaXNzQnV0dG9uU3R5bGUgPSBkaXNtaXNzQnV0dG9uLnN0eWxlOyAvLyBEaXNtaXNzIGJ1dHRvblxuXG4gICAgZGlzbWlzc0J1dHRvbi5ocmVmID0gXCIjXCI7XG4gICAgZGlzbWlzc0J1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGRpc21pc3NCdXR0b24uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICBkaXNtaXNzQnV0dG9uLmNsYXNzTmFtZSA9IFwiY29uZmlybVwiO1xuICAgIGRpc21pc3NCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS10ZXN0LWFjdGlvblwiLCBcImRpc21pc3MtY29va2llLW5vdGljZVwiKTsgLy8gRGlzbWlzcyBidXR0b24gc3R5bGVcblxuICAgIGRpc21pc3NCdXR0b25TdHlsZS5iYWNrZ3JvdW5kID0gYnV0dG9uQ29sb3I7XG4gICAgZGlzbWlzc0J1dHRvblN0eWxlLmNvbG9yID0gYnV0dG9uVGV4dENvbG9yO1xuICAgIGRpc21pc3NCdXR0b25TdHlsZVtcInRleHQtZGVjb3JhdGlvblwiXSA9IFwibm9uZVwiO1xuICAgIGRpc21pc3NCdXR0b25TdHlsZVtcImN1cnNvclwiXSA9IFwicG9pbnRlclwiO1xuICAgIGRpc21pc3NCdXR0b25TdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICBkaXNtaXNzQnV0dG9uU3R5bGUucGFkZGluZyA9IFwiMCAxNXB4XCI7XG4gICAgZGlzbWlzc0J1dHRvblN0eWxlLm1hcmdpbiA9IFwiMCAwIDAgMTBweFwiO1xuXG4gICAgaWYgKCEhYnV0dG9uVGV4dEZvbnRGYW1pbHkpIHtcbiAgICAgIGRpc21pc3NCdXR0b25TdHlsZS5mb250RmFtaWx5ID0gYnV0dG9uVGV4dEZvbnRGYW1pbHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc21pc3NCdXR0b247XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgbGVhcm4gbW9yZSBsaW5rXG4gICAqXG4gICAqIEBwYXJhbSBsZWFybk1vcmVMaW5rVGV4dFxuICAgKiBAcGFyYW0gbGVhcm5Nb3JlTGlua0hyZWZcbiAgICogQHBhcmFtIGxpbmtDb2xvclxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gY3JlYXRlTGVhcm5Nb3JlTGluayhsZWFybk1vcmVMaW5rVGV4dCwgbGVhcm5Nb3JlTGlua0hyZWYsIGxpbmtUYXJnZXQsIGxpbmtDb2xvciwgbGlua0JnQ29sb3IpIHtcbiAgICB2YXIgbGVhcm5Nb3JlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpLFxuICAgICAgICBsZWFybk1vcmVMaW5rU3R5bGUgPSBsZWFybk1vcmVMaW5rLnN0eWxlO1xuICAgIGxlYXJuTW9yZUxpbmsuaHJlZiA9IGxlYXJuTW9yZUxpbmtIcmVmO1xuICAgIGxlYXJuTW9yZUxpbmsudGV4dENvbnRlbnQgPSBsZWFybk1vcmVMaW5rVGV4dDtcbiAgICBsZWFybk1vcmVMaW5rLnRpdGxlID0gbGVhcm5Nb3JlTGlua1RleHQ7XG4gICAgbGVhcm5Nb3JlTGluay50YXJnZXQgPSBsaW5rVGFyZ2V0O1xuICAgIGxlYXJuTW9yZUxpbmsuY2xhc3NOYW1lID0gXCJsZWFybi1tb3JlXCI7XG4gICAgbGVhcm5Nb3JlTGluay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRlc3QtYWN0aW9uXCIsIFwibGVhcm4tbW9yZS1saW5rXCIpO1xuICAgIGxlYXJuTW9yZUxpbmtTdHlsZS5jb2xvciA9IGxpbmtDb2xvcjtcbiAgICBsZWFybk1vcmVMaW5rU3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGxlYXJuTW9yZUxpbmtTdHlsZVtcInRleHQtZGVjb3JhdGlvblwiXSA9IFwidW5kZXJsaW5lXCI7XG4gICAgbGVhcm5Nb3JlTGlua1N0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgIHJldHVybiBsZWFybk1vcmVMaW5rO1xuICB9XG4gIC8qKlxuICAgKiBTZXQgc2lzbWlzcyBub3RpY2UgY29va2llXG4gICAqIEBwYXJhbSBleHBpcmVJblxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHNldERpc21pc3NOb3RpY2VDb29raWUoZXhwaXJlSW4pIHtcbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKSxcbiAgICAgICAgY29va2llRXhwaXJlID0gbmV3IERhdGUoKTtcbiAgICBjb29raWVFeHBpcmUuc2V0VGltZShub3cuZ2V0VGltZSgpICsgZXhwaXJlSW4pO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IFwiY29va2llX25vdGljZT0xOyBleHBpcmVzPVwiICsgY29va2llRXhwaXJlLnRvVVRDU3RyaW5nKCkgKyBcIjsgcGF0aD0vO1wiO1xuICB9XG4gIC8qKlxuICAgKiBGYWRlIGEgZ2l2ZW4gZWxlbWVudCBvdXRcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICovXG5cblxuICBmdW5jdGlvbiBmYWRlRWxlbWVudE91dChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGVzdC10cmFuc2l0aW9uaW5nXCIsIFwidHJ1ZVwiKTtcblxuICAgIChmdW5jdGlvbiBmYWRlKCkge1xuICAgICAgaWYgKChlbGVtZW50LnN0eWxlLm9wYWNpdHkgLT0gMC4xKSA8IDAuMDEpIHtcbiAgICAgICAgaWYgKG9yaWdpblBhZGRpbmdUb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciBib2R5RE9NRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICAgICAgICAgIGJvZHlET01FbGVtZW50LnN0eWxlLnBhZGRpbmdUb3AgPSBvcmlnaW5QYWRkaW5nVG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoZmFkZSwgNDApO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH1cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIHRvIGV4dGVuZCBkZWZhdWx0cyB3aXRoIHVzZXIgb3B0aW9uc1xuICAgKiBAcGFyYW0gc291cmNlXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGV4dGVuZERlZmF1bHRzKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgIHZhciBwcm9wZXJ0eTtcblxuICAgIGZvciAocHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIGlmIChfdHlwZW9mKHNvdXJjZVtwcm9wZXJ0eV0pID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IGV4dGVuZERlZmF1bHRzKHNvdXJjZVtwcm9wZXJ0eV0sIHByb3BlcnRpZXNbcHJvcGVydHldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb3VyY2VbcHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIC8qIHRlc3QtY29kZSAqL1xuXG5cbiAgY29va2llTm90aWNlSlMuZXh0ZW5kRGVmYXVsdHMgPSBleHRlbmREZWZhdWx0cztcblxuICBjb29raWVOb3RpY2VKUy5jbGVhckluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIGluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9O1xuICAvKiBlbmQtdGVzdC1jb2RlICovXG5cbn0pKCk7XG5cbn0se31dfSx7fSxbMV0pO1xuIl0sImZpbGUiOiJjb29raWUubm90aWNlLmpzIn0=
