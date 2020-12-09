<?php
  $year = 2021;
  $month = 1;
  $day = 15;
  $hour = 12;
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
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  <script src="assets/js/index.js"></script>
  <script>
    var days = <?php echo $rDay; ?>;
    var hours = <?php echo $rHour; ?>;
    var minutes = <?php echo $rMin; ?>;
    var seconds = <?php echo $rSec; ?>;
    var daysElements,hoursElements,minutesElements,secondsElements;

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
      setTimeout("countdown()",1000);
    }

    document.addEventListener('DOMContentLoaded', countdown);
  </script>
</head>

<body>
  <header id="menu-bar">
    <div class="left-link"></div>
    <div class="middle-link"><img src="/assets/images/Morakniv130.svg" alt="Morakniv 130 Year Anniversary Logo"></div>
    <div class="right-link"></div>
  </header>
  <main id="main">
    <section class="page-1">
      <div class="content-wrapper">
        <div class="top-line">
          <div class="left"></div>
          <div class="right"></div>
        </div>
        <div class="middle">
          <img class="anniversary-logo" src="/assets/images/Morakniv130.png" alt="Morakniv 130 Year Anniversary">
        </div>
        <div class="bottom-line">
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
      <div class="padding">
        <h5 class="scroll-to-explore">SCROLL TO EXPLORE</h5>
      </div>
    </section>
    <section class="page-2 boxed">
      <h1 class="title intro-text">Mora 2000 (S) Anniversary Edition</h1>
      <div class="image-wrapper">
        <picture>
          <source srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition_m.png" media="(max-width: 1023px)">
          <source srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition.png" media="(min-width: 1024px)">
          <img class="knife-image" srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition.png"
            alt="Mora 2000 Anniversary Edition">
        </picture>
        <div class="usp usp1">
          <h3>USP 1</h3>
        </div>
        <div class="usp usp2">
          <h3>USP 2</h3>
        </div>
        <div class="usp usp3">
          <h3>USP 3</h3>
        </div>
        <div class="usp usp4">
          <h3>USP 4</h3>
        </div>
      </div>
      <p class="text intro-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.</p>
      <div class="countdown-wrapper intro-text">
        <h3 class="available-in">Available In</h3>
        <div class="countdown">
          <div class="days">
            <h6 class="days-number"></h6>
            <h5 class="days-title">Days</h5>
          </div>
          <span class="colon">:</span>
          <div class="hours">
            <h6 class="hours-number"></h6>
            <h5 class="hours-title">Hours</h5>
          </div>
          <span class="colon">:</span>
          <div class="minutes">
            <h6 class="minutes-number"></h6>
            <h5 class="minutes-title">Minutes</h5>
          </div>
          <span class="colon">:</span>
          <div class="seconds">
            <h6 class="seconds-number"></h6>
            <h5 class="seconds-title">Seconds</h5>
          </div>
        </div>
      </div>
    </section>
    <section class="page-3">
      <div class="first-content-wrapper">
        <img class="knife-in-hand" src="/assets/images/Mora%202000%20Anniversary%20Edition%20Hand%20Bokeh.jpg" alt="Mora 2000 Held in Hand">
        <div class="text-wrapper">
          <h2 class="title">Lorem ipsum dolor sit amet</h2>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.</p>
        </div>
      </div>
      <div class="second-content-wrapper">
        <div class="text-wrapper">
          <h2 class="title">Lorem ipsum dolor sit amet</h2>
          <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.</p>
        </div>
        <picture>
          <source srcset="assets/images/Mora%202000%20Original%20Comparison_m.png" media="(max-width: 1023px)">
          <source srcset="assets/images/Mora%202000%20Original%20Comparison.png" media="(min-width: 1024px)">
          <img class="knife-image" srcset="assets/images/Mora%202000%20Original%20Comparison.png" alt="Mora 2000 Original">
        </picture>
      </div>
    </section>
    <section class="dummy" style="height:500vh;"></section>
    <section class="page-4">
      <div class="outer-wrapper">
        <div class="content-wrapper">
          <div class="text-wrapper">
            <h2 class="title">Lorem ipsum dolor sit amet</h2>
            <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.</p>
          </div>
          <picture>
            <source srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition%20Comparison_m.png" media="(max-width: 1023px)">
            <source srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition%20Comparison.png" media="(min-width: 1024px)">
            <img class="knife-image" srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition%20Comparison.png" alt="Mora 2000 Anniversary Edition">
          </picture>
        </div>
      </div>
    </section>
    <section class="page-5">
      <video playsinline autoplay muted loop poster="assets/images/Mora%202000%20Anniversary%20Edition%20(S)%20Poster.jpg" id="bgvid">
        <!-- <source src="polina.webm" type="video/webm"> -->
        <source src="assets/video/webfilm_130_bw_color.mp4" type="video/mp4">
      </video>
    </section>
    <section class="page-6 boxed">
      <h2 class="title">Lorem Ipsum</h2>
      <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
      aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <img class="anniversary-patch" src="assets/images/Anniversary%20Patch.png" alt="130 Year Anniversary Patch">
    </section>
    <section class="page-7">
      <img class="image-1" src="/assets/images/FROST%20slipbock.jpg" alt="Frosts Grinding Trestle">
      <img class="image-2" src="/assets/images/Gubbhyllan%201919.jpg" alt="Gubbhyllan 1919">
      <img class="image-3" src="/assets/images/KJ%20Eriksson%20[1954,%20KJ-verkstan]%20{Svenska%20dagbladet}_m01.jpg" alt="KJ Eriksson 1954">
      <img class="image-4" src="/assets/images/kj_verkstan_1925.jpg" alt="KJ Eriksson Factory 1925">
      <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      <br><br>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor
      <br><br>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat um.
      <br><br>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor</p>
    </section>
    <section class="page-8 boxed">
      <h1 class="title intro-text">Mora 2000 (S) Anniversary Edition</h1>
      <div class="image-wrapper">
        <picture>
          <source srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition%20Knife%20in%20Sheath_m.png" media="(max-width: 1023px)">
          <source srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition%20Knife%20in%20Sheath.png" media="(min-width: 1024px)">
          <img class="knife-image" srcset="assets/images/13949%20-%20Mora%202000%20Anniversary%20Edition.png"
            alt="Mora 2000 Anniversary Edition">
        </picture>
      </div>
      <div class="countdown-wrapper">
        <h3 class="available-in">Available In</h3>
        <div class="countdown">
          <div class="days">
            <h6 class="days-number"></h6>
            <h5 class="days-title">Days</h5>
          </div>
          <span class="colon">:</span>
          <div class="hours">
            <h6 class="hours-number"></h6>
            <h5 class="hours-title">Hours</h5>
          </div>
          <span class="colon">:</span>
          <div class="minutes">
            <h6 class="minutes-number"></h6>
            <h5 class="minutes-title">Minutes</h5>
          </div>
          <span class="colon">:</span>
          <div class="seconds">
            <h6 class="seconds-number"></h6>
            <h5 class="seconds-title">Seconds</h5>
          </div>
        </div>
      </div>
    </section>
   
    <!-- <div class="temp-filler" style="height: 500vh;">//For dev purposes, remove when page is done</div> -->

  </main>
</body>

</html>