<?php
  $year = 2021;
  $month = 1;
  $day = 25;
  $hour = 16;
  $min = 0;
  $sec = 0;

  $target = mktime($hour,$min,$sec,$month,$day,$year);
  $current = time();
  $difference = $target - $current;

  $rDay = floor($difference/60/60/24);
  $rHour = floor(($difference-($rDay*60*60*24))/60/60);
  $rMin = floor(($difference-($rDay*60*60*24)-$rHour*60*60)/60);
  $rSec = floor(($difference-($rDay*60*60*24)-($rHour*60*60))-($rMin*60));
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Morakniv 130 Year Anniversary</title>
  <link rel="stylesheet" href="https://use.typekit.net/llc0wgb.css">
  <link rel="stylesheet" href="/assets/css/main.min.css">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  <script>
    var days = <?php echo $rDay; ?>;
    var hours = <?php echo $rHour; ?>;
    var minutes = <?php echo $rMin; ?>;
    var seconds = <?php echo $rSec; ?>;
    var daysElements,hoursElements,minutesElements,secondsElements,elements;
    var timeExpired = false;

    function countdown(){
      seconds--;

      if(seconds < 0){
        minutes--;
        seconds = 59;
      }
      if(minutes < 0){
        hours--;
        minutes = 59;
      }
      if(hours < 0){
        days--;
        hours = 23;
      }

      if(seconds < 0 || minutes < 0 || hours < 0 || days < 0) {
        elements = document.querySelectorAll(".countdown-wrapper");
        for (i = 0; i < elements.length; i++) {
          elements[i].innerHTML = '<a href="https://morakniv.se/produkt/mora-2000-s-anniversary-edition/" class="buy-now-button">Product page <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"/></svg></a>';
        }
        timeExpired = true;
      }

      function pad(n){
        if (n < 10 && n >= 0){
          return "0" + n;
        } else {
          return n;
        }
      }

      elements = document.querySelectorAll(".days-number");
      for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = pad(days);
      }
      elements = document.querySelectorAll(".hours-number");
      for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = pad(hours);
      }
      elements = document.querySelectorAll(".minutes-number");
      for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = pad(minutes);
      }
      elements = document.querySelectorAll(".seconds-number");
      for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = pad(seconds);
      }
      if (!timeExpired){setTimeout("countdown()",1000)};
    }

    document.addEventListener('DOMContentLoaded', countdown);
  </script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TS9SGFBP9Z"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-TS9SGFBP9Z');
  </script>
  <meta property="og:title" content="Mora 2000 (S) Anniversary Edition">
  <meta property="og:site_name" content="Morakniv 130-Year Anniversary">
  <meta property="og:url" content="https://130.morakniv.se">
  <meta property="og:description" content="The year 2021 marks the 130-year Anniversary of Morakniv. Ever since the beginning in 1891 we have been manufacturing high-quality knives in Mora, Sweden, proven to stand the test of time.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="/assets/images/Mora%202000%20Anniversary%20Edition%20(S)%20Poster.jpg">
</head>

<body>
  <header id="menu-bar">
    <div class="left-link">
      <a href="https://morakniv.se/en" target="_blank">Morakniv.se</a>
      <div class="mobile-menu-toggle">
        <input type="checkbox" class="hamburger-toggle">
        <span></span>
        <span></span>
        <span></span>
        <div class="mobile-menu-wrapper">
          <a href="https://morakniv.se/en" target="_blank">Morakniv.se</a>
          <div class="mobile-menu-line"></div>
          <a href="https://morakniv.se/?post_type=product&p=26977" target="_blank">Product page</a>
        </div>
      </div>
    </div>
    <div class="middle-link"><img src="/assets/images/Morakniv130.svg" alt="Morakniv 130 Year Anniversary Logo"></div>
    <div class="right-link">
      <a href="https://morakniv.se/produkt/mora-2000-s-anniversary-edition/" target="_blank">Product page</a>
    </div>
  </header>
  <main id="main">
    <section class="start-page">
      
    </section>
  </main>
  <script src="/assets/js/index.min.js"></script>
</body>

</html>