/* eslint-disable operator-linebreak */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
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
    const addZero = (elem) => {
      if (String(elem).length === 1) {
        return "0" + elem;
      } else {
        return String(elem);
      }
    };
    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining < 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        timerDiv.style.color = "red";
      }
      // if (timer.hours < 10) {
      //   timerHours.textContent = "0" + timer.hours;
      // } else {
      //   timerHours.textContent = timer.hours;
      // }
      // if (timer.minutes < 10) {
      //   timerMinutes.textContent = "0" + timer.minutes;
      // } else {
      //   timerMinutes.textContent = timer.minutes;
      // }
      // if (timer.seconds < 10) {
      //   timerSeconds.seconds = "0" + timer.seconds;
      // } else {
      //   timerSeconds.textContent = timer.seconds;
      // }
    }
    IdInterval = setInterval(updateClock, 1000);
  }

  counterTime("20 november 2021");

  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      btnClose = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    function handler() {
      menu.classList.toggle("active-menu");
    }
    btnMenu.addEventListener("click", handler);
    btnClose.addEventListener("click", handler);
    menuItems.forEach((item) => {
      item.addEventListener("click", handler);
    });
  };
  toggleMenu();

  // PopUp

  const togglePopUp = () => {
    const popupBtn = document.querySelectorAll(".popup-btn"),
      popup = document.querySelector(".popup"),
      popupClose = document.querySelector(".popup-close"),
      popupContent = document.querySelector(".popup-content");
    let top = -100;
    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (document.documentElement.clientWidth > 760) {
          top = -100;
          popup.style.display = "block";
          let opacityInterval;
          const opacityAnimate = function () {
            opacityInterval = requestAnimationFrame(opacityAnimate);
            top += 1;
            if (top < 11) {
              popupContent.style.top = top + "%";
            } else if (top >= 10) {
              cancelAnimationFrame(opacityInterval);
            }
          };
          opacityInterval = requestAnimationFrame(opacityAnimate);
        } else {
          popup.style.display = "block";
          popupContent.style.top = 10 + "%";
        }
      });
    });
    popupClose.addEventListener("click", () => {
      if (document.documentElement.clientWidth > 760) {
        let opacityInterval;
        top = 10;
        const opacityAnimate = function () {
          opacityInterval = requestAnimationFrame(opacityAnimate);
          top -= 1;
          if (top >= -100) {
            popupContent.style.top = top + "%";
          } else {
            popup.style.display = "";
            popupContent.style.top = -100 + "%";
            cancelAnimationFrame(opacityInterval);
          }
        };
        opacityInterval = requestAnimationFrame(opacityAnimate);
      } else {
        popup.style.display = "";
        popupContent.style.top = -100 + "%";
      }
    });
  };

  togglePopUp();
});
