/* jshint node: true */
var money = 500; // Дохід за місяць
var income = "Sport"; //Додатковий дохід
var addExpenses = "Fitnes , Girls , Beer"; // Додаткові витрати
var deposit = true;
var mission = 7895; // Сума для накопичення
var period = 12; // К-сть місяців

console.log(typeof money); //Тип данних money
console.log(typeof income); //Тип данних income
console.log(typeof deposit); //Тип данних deposit
console.log(addExpenses.length); // Довжина рядка addExpenses
console.log("Період дорівнює " + period + " місяців");
console.log("Ціль накопичення " + mission + " гривень");

var toLower = addExpenses.toLowerCase(); // Змінну addExpenses до нижнього регістру й зберігаємо в змінну toLower
var array = toLower.split(" , "); // Змінну toLower розбиваємо на масив
console.log(array);

var budgetDay = money / 30;
console.log(budgetDay);
