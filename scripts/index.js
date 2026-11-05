import { Card } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js"
import { PopupWithImage } from "./PopupWithImage.js"
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js"

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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});

const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.description
  });
});

const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const card = new Card(
    inputValues["place-name"],
    inputValues.link,
    "#card-template",
    handleImageClick
  );

  section.addItem(card.generateCard());
});

const imagePopup = new PopupWithImage("#image-popup");


const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editForm = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");


const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector("#new-card-form");
const titleInput = document.querySelector("#titulo-input");
const imageInput = document.querySelector("#image-input");

const cardContainer = document.querySelector(".cards__list");

function handleImageClick(name, link) {
  imagePopup.open(link, name);
}

const section = new Section({
  items: initialCards,
  renderer: (item) => {
  const card = new Card(
    item.name,
    item.link,
    "#card-template",
    handleImageClick
  );

  return card.generateCard();
}
}, ".cards__list");

section.renderItems();

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  inactiveButtonClass: "button_disabled",
};

editPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();


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
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  aboutInput.value = userData.job;

  editFormValidator.resetValidation();
  editPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});