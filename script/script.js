"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

if (localStorage.getItem("todo")) {
  todoData = JSON.parse(localStorage.getItem("todo"));
  render();
}

function render() {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      " </span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector(".todo-complete");

    btnTodoCompleted.addEventListener("click", function () {
      item.completed = !item.completed;
      localStorage.setItem("todo", JSON.stringify(todoData));
      render();
    });

    const btnTodoRemove = li.querySelector(".todo-remove");

    btnTodoRemove.addEventListener("click", function () {
      li.style.display = "none";
      todoData.splice(item, 1);
      localStorage.setItem("todo", JSON.stringify(todoData));
    });
  });
}

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  let withoutSpaceInput = headerInput.value.trim();
  if (withoutSpaceInput === "") {
    return;
  } else {
    let newTodo = {
      value: withoutSpaceInput,
      completed: false,
    };
    todoData.push(newTodo);
    headerInput.value = "";

    localStorage.setItem("todo", JSON.stringify(todoData));
    render();
  }
});

render();
