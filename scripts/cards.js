export class Card {
  constructor(name, link, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClickCallback = handleImageClick;
  }

  _handleLikeButtonClick(evt) {
    evt.currentTarget.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButtonClick(evt) {
    evt.currentTarget.closest(".card").remove();
  }

  _handleImageClick() {
    this._handleImageClickCallback(this._link, this._name);
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".card").cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");

    likeButton.addEventListener("click", (evt) => {
      this._handleLikeButtonClick(evt);
    });

    deleteButton.addEventListener("click", (evt) => {
      this._handleDeleteButtonClick(evt);
    });

    cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}