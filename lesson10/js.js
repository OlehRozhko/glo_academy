"use strict";

var advertise = document.querySelector(".adv");
advertise.remove();

var allBooks = document.querySelector(".books");
var book = document.querySelectorAll(".book");

allBooks.prepend(book[4]);
allBooks.append(book[2]);
allBooks.prepend(book[0]);
allBooks.prepend(book[1]);

var bodyImage = document.querySelector("body");
bodyImage.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

var heading = document.querySelectorAll("a");
heading[2].innerHTML = "Книга 3. this и Прототипы Объектов";

var listSecondBook = book[0].querySelectorAll("li");

listSecondBook[1].after(listSecondBook[3]);
listSecondBook[3].after(listSecondBook[6]);
listSecondBook[10].before(listSecondBook[2]);
listSecondBook[9].before(listSecondBook[7]);
listSecondBook[4].before(listSecondBook[8]);

var listFifthBook = book[5].querySelectorAll("li");
listFifthBook[1].after(listFifthBook[9]);
listFifthBook[9].after(listFifthBook[3]);
listFifthBook[8].before(listFifthBook[5]);

var listSixthBook = book[2].querySelectorAll("li");

var ulSixthBook = book[2].querySelector("ul");
ulSixthBook.setAttribute("id", "ul");

let liLast = document.createElement("li");
liLast.innerHTML = "Глава 8: За пределами ES6";
ul.append(liLast);
ulSixthBook.append(listSixthBook[9]);
