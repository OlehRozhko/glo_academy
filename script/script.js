/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable func-names */
/* eslint-disable quotes */
/* eslint-disable strict */

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  function counterTime(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds"),
      timerDiv = document.querySelector("#timer");
    let IdInterval = 0;

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = 0,
        minutes = 0,
        hours = 0;
      if (timeRemaining > 0) {
        seconds = Math.floor(timeRemaining % 60);
        minutes = Math.floor((timeRemaining / 60) % 60);
        hours = Math.floor(timeRemaining / 60 / 60);
      }

      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }
    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.timeRemaining < 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        timerDiv.style.color = "red";
        return;
      }
      if (timer.hours < 10) {
        timerHours.textContent = "0" + timer.hours;
      } else {
        timerHours.textContent = timer.hours;
      }
      if (timer.minutes < 10) {
        timerMinutes.textContent = "0" + timer.minutes;
      } else {
        timerMinutes.textContent = timer.minutes;
      }
      if (timer.seconds < 10) {
        timerSeconds.seconds = "0" + timer.seconds;
      } else {
        timerSeconds.textContent = timer.seconds;
      }
    }
    IdInterval = setInterval(updateClock, 1000);
  }

  counterTime("20 november 2021");
});
