"use strict";
/* jshint node: true */

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var money,
  start = () => {
    do {
      money = prompt("Ваш місячний дохід?", "12000");
    } while (!isNumber(money));
  };

start();

let appData = {
  income: {}, // додатковий дохід
  addIncome: [],
  expenses: {}, // список обов'язковий витрат
  addExpenses: [], // рядок з перечислиними додатковими витратами
  deposit: false, // наявність кредиту в банку
  mission: 50000, // сума для накопичення
  period: 5, // термін накопичення
  budget: money, // дохід за місяць
  budgetDay: 0, // бюджет на день
  budgetMonth: 0, // бюджет на місяць
  expensesMonth: 0, // місячні витрати
  asking: function () {
    appData.deposit = confirm("Чи є у вас кредит у банку?");
    for (let i = 0; i < 4; i++) {
      let first = prompt("Введіть обов'явозкову статтю витрат?");
      let second = +prompt("Скільки це буде коштувати?");
      appData.expenses[first] = second;
    }
    appData.addExpenses = prompt("Перечісліть додаткові витрати?");
    appData.addExpenses.toLowerCase().split(" , ");
  },
  getExpensesMonth: function () {
    // Функція повертає суму місячних витрат
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    // Функція обчислює значенн budgetMonth and budgetDay
    if (!appData.budget) {
      appData.budget = 0;
    }
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function (myMission, budgetMonths) {
    //Функція повертай період за скільки будуть накопичені гроші
    return Math.ceil(myMission / budgetMonths);
  },
  getStatusIncome: function () {
    // Функція вираховує,який рівень доходу
    if (appData.budgetDay > 1200) {
      return "У вас високий рівень доходу";
    } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
      return "У вас середній рівень доходу";
    } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
      return "На жаль у вас рівень доходу нижче середнього";
    } else if (appData.budgetDay < 0) {
      return "Щось пішло не так";
    }
  },
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

var targetMonth = appData.getTargetMonth();

targetMonth > 0
  ? console.log("Ціла буде досягнути за " + targetMonth + " місяців")
  : console.log("Ціль не буде досягнута!");

console.log(appData.getStatusIncome());
console.log("Наша програма включає в себе :");
for (let data in appData) {
  console.log(data, appData[data]);
}
