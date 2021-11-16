"use strict";

const start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
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
  depositCheck = document.getElementById("deposit-check"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  targetAmount = document.querySelector(".target-amount");
let periodAmount = document.querySelector(".period-amount");
class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  start() {
    const isNumber = (n) => {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    if (salaryAmount.value === "") {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    if (!isNumber(salaryAmount.value)) {
      alert("Введіть число!");
      salaryAmount.value = "";
      return;
    }
    if (
      depositPercent.value > 99 ||
      depositPercent.value < 0 ||
      !isNumber(depositPercent.value)
    ) {
      alert("ВВедіть у поле відсоток число від 0 до 100");
      depositPercent.value = "";
      return;
    }
    start.style.display = "none";
    cancel.style.display = "block";

    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.blockInputs();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay * 100) / 100;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    if (document.querySelectorAll(".expenses-items").length === 3) {
      expensesPlus.style.display = "none";
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector(".income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    if (document.querySelectorAll(".income-items").length === 3) {
      incomePlus.style.display = "none";
    }
  }
  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split("-")[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        this[startStr][itemTitle] = +itemAmount;
      }
    };

    document.querySelectorAll(".income-items").forEach(count);
    document.querySelectorAll(".expenses-items").forEach(count);

    for (const key in this.income) {
      console.log(key);
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    // Функция возвращает сумму всех обязательных расходов за месяц
    this.expensesMonth = 0;
    for (let elem in this.expenses) {
      this.expensesMonth += this.expenses[elem];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.precentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    // Подсчитывает за какой период будет достигнута цель
    return targetAmount.value / this.budgetMonth;
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  changePeriodSelect(event) {
    document.querySelector(".period-amount").textContent = event.target.value;
    incomePeriodValue.value = this.calcPeriod();
  }
  blockStart() {
    start.disabled = !salaryAmount.value.trim();
  }
  blockInputs() {
    document.querySelectorAll(".data input").forEach(function (item) {
      item.disabled = true;
    });

    incomePlus.style.display = "none";
    expensesPlus.style.display = "none";
    depositPercent.style.display = "inline-block";
  }
  reset() {
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
    depositCheck.checked = false;
    depositBank.style.display = "none";
    depositAmount.style.display = "none";
    depositPercent.style.display = "none";
    depositBank.value = "";
    depositAmount.value = "";
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.precentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const selectBank = this.value;
    if (selectBank === "other") {
      depositPercent.value = "";
      depositPercent.style.display = "inline-block";
    } else {
      depositPercent.style.display = "none";
      depositPercent.value = selectBank;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
    }
  }
  eventsListeners() {
    this.blockStart.bind(this);
    start.addEventListener("click", this.start.bind(this));
    expensesPlus.addEventListener("click", this.addExpensesBlock.bind(this));
    incomePlus.addEventListener("click", this.addIncomeBlock.bind(this));
    periodSelect.addEventListener("input", this.changePeriodSelect.bind(this));
    salaryAmount.addEventListener("input", this.blockStart.bind(this));
    cancel.addEventListener("click", this.reset.bind(this));
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
  }
}

const appData = new AppData();

appData.eventsListeners();
