export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

_handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

_handleDeleteButtonClick(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

_handleImageClick() {
  imagePopupImage.src = this._link;
  imagePopupImage.alt = this._name;
  imagePopupCaption.textContent = this._name;

  openModal(imagePopup);
}

_getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true);

  return cardElement; 

}
  
_setEventListeners(cardElement ) {
  const button = cardElement.querySelector(".card__like-button");
  button.addEventListener("click", this._handleLikeButtonClick);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", this._handleDeleteButtonClick);

   const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", this._handleImageClick);
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