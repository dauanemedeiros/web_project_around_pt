export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.appendChild(element);
  }
}

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add("popup_is-opened");
    }

    close() {
        this._popup.classList.remove("popup_is-opened");
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

   setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close");

    closeButton.addEventListener("click", () => {
        this.close();
    });
}
}