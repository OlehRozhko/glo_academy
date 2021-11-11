"use strict";

const start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  depositCheck = document.querySelector("#deposit-check"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  // accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeItems = document.querySelectorAll(".income-items"),
  // incomeAmount = document.querySelector('.income-amount'),
  // expensesTitle = document.querySelector('.expenses-title'),
  // expensesAmount = document.querySelector('.expenses-amount'),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpenses = document.querySelector(".additional_expenses"),
  periodSelect = document.querySelector(".period-select"), // range
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount");
let periodAmount = document.querySelector(".period-amount");

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  precentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    if (salaryAmount.value === "") {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    start.style.display = "none";
    cancel.style.display = "block";
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.blockInputs();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay * 100) / 100;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    console.log(this);
  },
  addExpensesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    if (document.querySelectorAll(".expenses-items").length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  addIncomeBlock: function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector(".income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    if (document.querySelectorAll(".income-items").length === 3) {
      incomePlus.style.display = "none";
    }
  },
  getExpenses: function () {
    const _this = this;
    document.querySelectorAll(".expenses-items").forEach((item) => {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
    const _this = this;
    appData.incomeMonth = 0;
    document.querySelectorAll(".income-items").forEach((item) => {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        _this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in appData.income) {
      _this.incomeMonth += +_this.income[key];
    }
  },
  getAddExpenses: function () {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        _this.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    const _this = this;
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    // Функция возвращает сумму всех обязательных расходов за месяц
    this.expensesMonth = 0;
    for (let elem in this.expenses) {
      this.expensesMonth += this.expenses[elem];
    }
  },
  getBudget: function () {
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function () {
    // Подсчитывает за какой период будет достигнута цель
    return targetAmount.value / this.budgetMonth;
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  changePeriodSelect: function (event) {
    document.querySelector(".period-amount").textContent = event.target.value;
    incomePeriodValue.value = this.calcPeriod();
  },
  blockStart: function () {
    start.disabled = !salaryAmount.value.trim();
  },
  blockInputs: function () {
    document.querySelectorAll(".data input").forEach(function (item) {
      item.disabled = true;
    });
    incomePlus.style.display = "none";
    expensesPlus.style.display = "none";
  },
  reset: function () {
    document.querySelectorAll(".result input").forEach(function (item) {
      item.value = "";
    });
    document.querySelectorAll(".data input").forEach(function (item) {
      item.disabled = false;
      item.value = "";
    });
    start.style.display = "block";
    cancel.style.display = "none";
    periodSelect.value = "0";
    targetAmount.innerHTML = periodSelect.value;
    periodAmount.innerHTML = 1;
    document.querySelectorAll(".income-items").forEach(function (item, i) {
      if (i > 0) {
        item.parentNode.removeChild(item);
      }
    });
    document.querySelectorAll(".expenses-items").forEach(function (item, i) {
      if (i > 0) {
        item.parentNode.removeChild(item);
      }
    });
    incomePlus.style.display = "block";
    expensesPlus.style.display = "block";
  },
};

appData.blockStart.bind(appData);
start.addEventListener("click", appData.start.bind(appData));
expensesPlus.addEventListener("click", appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener("click", appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener(
  "input",
  appData.changePeriodSelect.bind(appData)
);
salaryAmount.addEventListener("input", appData.blockStart.bind(appData));
cancel.addEventListener("click", appData.reset.bind(appData));
