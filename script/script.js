/* eslint-disable space-before-function-paren */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable no-cond-assign */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
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

  counterTime("30 november 2021");

  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu");

    function handler() {
      menu.classList.toggle("active-menu");
    }
    btnMenu.addEventListener("click", handler);
    menu.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("close-btn")) {
        handler();
      } else {
        target = target.closest("a");
        if (target) {
          handler();
        }
      }
    });
  };
  toggleMenu();

  // PopUp

  const togglePopUp = () => {
    const popUpBtn = document.querySelectorAll(".popup-btn"),
      popUp = document.querySelector(".popup"),
      popUpContent = document.querySelector(".popup-content");
    let top = -100;
    popUpBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (document.documentElement.clientWidth > 760) {
          top = -100;
          popUp.style.display = "block";
          let opacityInterval;
          const opacityAnimate = function () {
            opacityInterval = requestAnimationFrame(opacityAnimate);
            top += 2;
            if (top < 11) {
              popUpContent.style.top = top + "%";
            } else if (top >= 10) {
              cancelAnimationFrame(opacityInterval);
            }
          };
          opacityInterval = requestAnimationFrame(opacityAnimate);
        } else {
          popUp.style.display = "block";
          popUpContent.style.top = 10 + "%";
        }
      });
    });
    const popUpClose = () => {
      if (document.documentElement.clientWidth > 760) {
        let opacityInterval;
        top = 10;
        const opacityAnimate = function () {
          opacityInterval = requestAnimationFrame(opacityAnimate);
          top -= 2;
          if (top >= -100) {
            popUpContent.style.top = top + "%";
          } else {
            popUp.style.display = "";
            popUpContent.style.top = -100 + "%";
            cancelAnimationFrame(opacityInterval);
          }
        };
        opacityInterval = requestAnimationFrame(opacityAnimate);
      } else {
        popUp.style.display = "";
        popUpContent.style.top = -100 + "%";
      }
    };
    popUp.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("popup-close")) {
        popUpClose();
      } else {
        target = target.closest(".popup-content");

        if (!target) {
          popUpClose();
        }
      }
    });
  };

  togglePopUp();

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  // Slider
  const slider = () => {
    const sliderContent = document.querySelector(".portfolio-content"),
      sliderBtns = document.querySelectorAll(".portfolio-btn"),
      slide = document.querySelectorAll(".portfolio-item"),
      dot = document.querySelectorAll(".dot");

    let currentSlide = 0,
      interval;

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 2000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    sliderContent.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (!target.matches(".portfolio-btn, .dot")) {
        nextSlide(slide, currentSlide, "portfolio-item-active");
        nextSlide(dot, currentSlide, "dot-active");
      }
      if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.closest(".dot")) {
        dot.forEach((elem, index) => {
          if (target === elem) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    sliderContent.addEventListener("mouseover", (event) => {
      let target = event.target;

      if (target.matches(".dot") || target.matches(".portfolio-btn")) {
        stopSlide();
      }
    });
    sliderContent.addEventListener("mouseout", (event) => {
      let target = event.target;

      if (target.matches(".dot") || target.matches(".portfolio-btn")) {
        startSlide();
      }
    });

    startSlide(1500);
  };
  slider();

  // Our team change image
  const changeImage = () => {
    const commandImages = document.querySelectorAll(".command__photo");
    commandImages.forEach((image) => {
      image.addEventListener("mouseenter", (event) => {
        if (event.target === image) {
          if (image === event.target) {
            const src = event.target.src;
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = src;
          }
        }
      });
      image.addEventListener("mouseleave", (event) => {
        if (event.target === image) {
          if (image === event.target) {
            const src = event.target.src;
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = src;
          }
        }
      });
    });
  };
  changeImage();

  // Block enter letters
  const inputEnter = () => {
    const calcBlock = document.querySelector(".calc-block");
    calcBlock.addEventListener("input", (event) => {
      if (event.target.tagName === "INPUT") {
        event.target.value = event.target.value.replace(/\D/g, "");
      }
    });
  };
  inputEnter();

  // Calculator
  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcCount = document.querySelector(".calc-count"),
      calcDay = document.querySelector(".calc-day"),
      totalAmount = document.getElementById("total");

    const animate = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) {
          startTimestamp = timestamp;
        }
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const countSum = () => {
      let total = 0,
        countValue = 1,
        countDay = 1;

      const typeValue = +calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        countDay *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        countDay *= 1.5;
      }

      if (calcType.value && calcSquare.value) {
        total = price * typeValue * squareValue * countValue * countDay;
        animate(totalAmount, 0, total, 5000);
      }
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (
        target.matches(".calc-type") ||
        target.matches(".calc-square") ||
        target.matches(".calc-count") ||
        target.matches(".calc-day")
      ) {
        countSum();
      }
    });
  };

  calc(100);
});
