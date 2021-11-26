/* eslint-disable no-unused-vars */
class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter((item) => {
      return item.tagName.toLowerCase() !== "button" && item.type !== "button";
    });
    this.error = new Set();
  }
  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach((elem) =>
      elem.addEventListener("change", this.checkIt.bind(this))
    );
    this.form.addEventListener("submit", (e) => {
      this.elementsForm.forEach((elem) => this.checkIt({ target: elem }));
      if (this.error.size) {
        e.preventDefault();
      }
    });
  }
  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === "") {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      },
    };
    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every((item) =>
          validatorMethod[item[0]](elem, this.pattern[item[1]])
        );
      }
    } else {
      console.warn(
        "Необхідно передати id полів введення і методи перевірки цих полів"
      );
    }

    return true;
  }
  checkIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.error.add(target);
      this.showError(target);
    }
  }
  showError(elem) {
    elem.classList.remove("success");
    elem.classList.add("error");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      return;
    }
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Помилка в цьому полі";
    errorDiv.classList.add("validator-error");
    elem.insertAdjacentElement("afterend", errorDiv);
  }
  showSuccess(elem) {
    elem.classList.remove("error");
    elem.classList.add("success");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      elem.nextElementSibling.remove();
    }
  }
  applyStyle() {
    const style = document.createElement("style");
    style.textContent = `
    input.success {
      background-color: green
    }
    input.error {
      background-color: red
    } 
    .validator-error{
      font-size: 12px;
      color: red
    }
    `;

    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.name) {
      this.pattern.name = /\w+/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+\.?\w+@\w+\.\w{2,}$/;
    }
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[380||0]\d{9}/;
    }
  }
}
