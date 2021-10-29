var buttonIdStart = document.getElementById("start");
var buttonPlusIncome = document.getElementsByTagName("button")[0];
console.log("buttonPlusIncome: ", buttonPlusIncome);

var buttonPlusExpenses = document.getElementsByTagName("button")[1];
console.log("buttonPlusExpenses: ", buttonPlusExpenses);

let checkBox = document.querySelector("#checkbox");
console.log("checkBox: ", checkBox);

let additionalIncomeItems = document.querySelectorAll(
  ".additional_income-item"
);
console.log("additionalIncomeItems: ", additionalIncomeItems);

let elementsValue = document.getElementsByClassName("result-total");
console.log("elementsValue: ", elementsValue);

let salaryAmount = document.querySelector(".salary-amount");
console.log("salaryAmount: ", salaryAmount);

let incomeTitle = document.querySelector(".income-title");
console.log("incomeTitle: ", incomeTitle);

let incomeAmount = document.querySelector(".income-amount");
console.log("incomeAmount: ", incomeAmount);

let expensesTitle = document.querySelector(".expenses-title");
console.log("expensesTitle: ", expensesTitle);

let expensesAmount = document.querySelector(".expenses-amount");
console.log("expensesAmount: ", expensesAmount);

let additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
console.log("additionalExpensesItem: ", additionalExpensesItem);

let periodSelect = document.querySelector(".period-select");
console.log("periodSelect: ", periodSelect);
