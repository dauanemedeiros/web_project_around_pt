export class Card {
  constructor(name, link, templateSelector, handleImageClick, cardId, isLiked, api, confirmationPopup, ownerId, userId) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClickCallback = handleImageClick;
    this._cardId = cardId;
    this._isLiked = isLiked;
    this._api = api;
    this._confirmationPopup = confirmationPopup;
    this._ownerId = ownerId;
    this._userId = userId;
  }

  _handleLikeButtonClick(evt) {
    const likeButton = evt.currentTarget;

    likeButton.disabled = true;

    this._api.changeLikeCardStatus(this._cardId, this._isLiked)
      .then((cardData) => {
        this._isLiked = cardData.isLiked;

        likeButton.classList.toggle(
          "card__like-button_is-active",
          this._isLiked
        );
      })
      .catch((err) => {
        console.log("Erro ao alterar curtida:", err);
      })
      .finally(() => {
        likeButton.disabled = false;
      });
  }

  _handleDeleteButtonClick(evt) {
  const cardElement = evt.currentTarget.closest(".card");

  this._confirmationPopup.open();

  this._confirmationPopup.setSubmitAction(() => {
    this._api.deleteCard(this._cardId)
      .then(() => {
        cardElement.remove();
        this._confirmationPopup.close();
      })
      .catch((err) => {
        console.log("Erro ao excluir cartão:", err);
      });
  });
}

_handleImageClick() {
  this._handleImageClickCallback(this._name, this._link);
}

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".card").cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");

     if (this._ownerId !== this._userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (evt) => {
      this._handleDeleteButtonClick(evt);
    });
  }

  likeButton.addEventListener("click", (evt) => {
    this._handleLikeButtonClick(evt);
  });

  cardImage.addEventListener("click", () => {
    this._handleImageClick();
  });
}

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked
    );

    this._setEventListeners(cardElement);

    return cardElement;
  }
}