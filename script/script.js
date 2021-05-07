window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function countTimer(deadline) {

    const addZero = num => {
      if (num <= 9) {
        return '0' + num;
      } else {
        return num;
      }
    };

    let timeHours = document.querySelector('#timer-hours'),
      timeMinutes = document.querySelector('#timer-minutes'),
      timeSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      }
    };

    function updateClock() {
      let timer = getTimeRemaining();

      timeHours.textContent = addZero(timer.hours);
      timeMinutes.textContent = addZero(timer.minutes);
      timeSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      }
    }
    updateClock();
  };

  countTimer('01 July 2021');

});