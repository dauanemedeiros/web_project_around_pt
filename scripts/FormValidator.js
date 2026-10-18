export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
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

    buttonElement.disabled = hasInvalidInput;

    if (hasInvalidInput) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
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

  resetValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }
}