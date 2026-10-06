export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = "";
    }
  }

  _toggleButtonState() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    const hasInvalidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
