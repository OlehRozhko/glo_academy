"use strict";
/* jshint node: true */

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = (s) => {
  return !String(s) || s === " " || s === null || isNumber(s) || !s.trim();
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000, // сума для накопичення
  period: 5, // термін накопичення
  budget: money, // дохід за місяць
  budgetDay: 0, // бюджет на день
  budgetMonth: 0, // бюджет на місяць
  expensesMonth: 0, // місячні витрати
  asking: function () {
    if (confirm("Чи є у вас додатковий дохід?")) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt("Який у вас є додатковий заробіток?", "Доставка");
      } while (isString(itemIncome));

      do {
        cashIncome = prompt("Скільки отримуєте на місяць з цього?", 2000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    appData.deposit = confirm("Чи є у вас кредит у банку?");
    do {
      appData.addExpenses = prompt("Перечісліть додаткові витрати?");
    } while (isString(appData.addExpenses));
    appData.addExpenses.toLowerCase().split(" , ");
    console.log(appData.addExpenses.toString());

    for (let i = 0; i < 2; i++) {
      let itemExpenses, cashExpenses;
      do {
        itemExpenses = prompt(
          "Введіть обов'явозкову статтю витрат?",
          "Курси програмування"
        );
      } while (isString(itemExpenses));

      do {
        cashExpenses = prompt("Скільки це буде коштувати?", 2500);
      } while (!isNumber(cashExpenses));

      appData.expenses[itemExpenses] = cashExpenses;
    }
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
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    //Функція повертай період за скільки будуть накопичені гроші
    return Math.ceil(appData.mission / appData.budgetMonth);
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Який річний депозит?", "10");
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Яка сума закладена?", 1000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSafedMoney: function () {
    return appData.budgetMonth * appData.period;
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
