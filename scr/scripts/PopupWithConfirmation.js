import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._confirmButton = this._popup.querySelector(".popup__button");
    this._handleSubmit = null;
  }

  setSubmitAction(callback) {
    this._handleSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}