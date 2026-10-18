import { Card } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

console.log("JavaScript conectado com sucesso!");

const initialCards = [
    { 
        name: "Vale de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },

    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },

    {  
        name: "Montanhas Carecas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },

    {  
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },

    { 
        name: "Parque Nacional Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },

    { 
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];


const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");


const editPopup = document.querySelector("#edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");
const editForm = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");


const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardPopup.querySelector(".popup__close");
const addCardForm = document.querySelector("#new-card-form");
const titleInput = document.querySelector("#titulo-input");
const imageInput = document.querySelector("#image-input");


const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");


const cardContainer = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(name, link, container) {
  const card = new Card(
    name,
    link,
    "#card-template",
    handleImageClick
  );

  container.prepend(card.generateCard());
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardContainer);
});

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  inactiveButtonClass: "button_disabled",
};


const editFormValidator = new FormValidator(
  validationConfig,
  editForm
);

const addCardFormValidator = new FormValidator(
  validationConfig,
  addCardForm
);

editFormValidator.setEventListeners();
addCardFormValidator.setEventListeners();


editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;

  editFormValidator.resetValidation();
  openModal(editPopup);
});

editCloseButton.addEventListener("click", () => {
  closeModal(editPopup);
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!editForm.checkValidity()) {
    return;
  }

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closeModal(editPopup);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  openModal(addCardPopup);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardPopup);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!addCardForm.checkValidity()) {
    return;
  }

  renderCard(titleInput.value, imageInput.value, cardContainer);

  closeModal(addCardPopup);
  addCardForm.reset();
  addCardFormValidator.resetValidation();
});

[editPopup, addCardPopup, imagePopup].forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});

imagePopupCloseButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

