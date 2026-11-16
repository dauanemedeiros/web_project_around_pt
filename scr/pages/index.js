import { Card } from "../components/cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

console.log("JavaScript conectado com sucesso!");

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "12432412-83ec-4f36-bc20-fe67d262f032",
    "Content-Type": "application/json"
  }
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image"
});

let section;  
let userId;

api.getAppInfo()
  .then(([userData, cardsFromServer]) => {

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });

    userInfo.setUserAvatar(userData.avatar);
    const userId = userData._id;
  
  section = new Section({
      items: cardsFromServer,
      renderer: (item) => {
        const card = new Card(
          item.name,
          item.link,
          "#card-template",
          handleImageClick,
          item._id,
          item.isLiked,
          api,
          confirmationPopup,
          item.owner,
            userId
        );

        return card.generateCard();
      }
    }, ".cards__list");

    section.renderItems();

  })
  .catch((err) => {
    console.log("Erro ao carregar informações:", err);
  });

const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  const saveButton = document.querySelector("#edit-popup .popup__button");

  saveButton.textContent = "Salvando...";
  saveButton.disabled = true;

  api.editProfile(
    inputValues.name,
    inputValues.description
  )
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about
      });

      editPopup.close();
    })
    .catch((err) => {
      console.log("Erro ao editar perfil:", err);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
      saveButton.disabled = false;
    });
});

const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const saveButton = document.querySelector("#new-card-popup .popup__button");

  saveButton.textContent = "Salvando...";
  saveButton.disabled = true;

  api.addCard(
    inputValues["place-name"],
    inputValues.link
  )
    .then((cardData) => {
      const card = new Card(
        cardData.name,
        cardData.link,
        "#card-template",
        handleImageClick,
        cardData._id,
        cardData.isLiked,
        api,
        confirmationPopup,
        cardData.owner,
        userId
      );

      section.addItem(card.generateCard());
      addCardPopup.close();
    })
    .catch((err) => {
      console.log("Erro ao adicionar cartão:", err);
    })
    .finally(() => {
      saveButton.textContent = "Criar";
      saveButton.disabled = false;
    });
});

const imagePopup = new PopupWithImage("#image-popup");
const confirmationPopup = new PopupWithConfirmation("#confirmation-popup");

const avatarPopup = new PopupWithForm("#avatar-popup", (inputValues) => {
  const saveButton = document.querySelector("#avatar-popup .popup__button");

  saveButton.textContent = "Salvando...";
  saveButton.disabled = true;

  api.updateAvatar(inputValues.avatar)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log("Erro ao atualizar avatar:", err);
    })
    .finally(() => {
      saveButton.textContent = "Salvar";
      saveButton.disabled = false;
    });
});

avatarPopup.setEventListeners();

confirmationPopup.setEventListeners();


const editButton = document.querySelector(".profile__edit-button");
const avatarImage = document.querySelector(".profile__image");
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

avatarImage.addEventListener("click", () => {
  avatarPopup.open();
});