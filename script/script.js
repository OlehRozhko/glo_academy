"use strict";
const button = document.getElementById("button");
const options = {
  day: "numeric",
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
function timer() {
  let now = new Date();
  let infoOftime = now.toLocaleString("uk", options);
  let hours = now.getHours();
  if (hours > 4 && hours < 10) {
    let first = document.createElement("p");
    first.textContent = "Доброго ранку";
    document.body.append(first);
  } else if (hours > 10 && hours < 18) {
    let first = document.createElement("p");
    first.textContent = "Добрий день";
    document.body.append(first);
  } else if (hours > 18 && hours < 23) {
    let first = document.createElement("p");
    first.textContent = "Добрий вечір";
    document.body.append(first);
  } else {
    let first = document.createElement("p");
    first.textContent = "Доброї ночі";
    document.body.append(first);
  }
  let dayOfWeek = infoOftime.split(",");
  let second = document.createElement("p");
  second.textContent = "Сьогодні: " + dayOfWeek[0];
  document.body.append(second);
  let time = infoOftime.slice(-8);
  let thirdElm = document.createElement("p");
  thirdElm.textContent = "Поточний час: " + time;
  document.body.append(thirdElm);
  let newYear = new Date(2022, 0, 1);
  let timeRemaining = (newYear - now) / 1000;
  let leftDays = Math.floor(timeRemaining / 3600 / 24);
  let FourthElm = document.createElement("p");
  FourthElm.textContent = "До Нового року залишилося " + leftDays + " днів";
  document.body.append(FourthElm);
  button.removeEventListener("click", timer);
}
button.addEventListener("click", timer);
