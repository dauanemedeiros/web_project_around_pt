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

initialCards.forEach(function(card) {
  console.log(card.name);
});


const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");

const formElement = document.querySelector(".popup__form");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(popup);
}

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", () => {
  closeModal(popup);
});

formElement.addEventListener("submit", handleProfileFormSubmit);

const cardContainer = document.querySelector(".cards__list");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
];

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButtonClick(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

// Pop-up da imagem
const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;

  openModal(imagePopup);
}

imagePopupCloseButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

function getCardElement({
  name = "Lugar sem nome",
  link = "/images/placeholder.jpg",
}) {
  const cardElement = document
    .querySelector("#card-template")
    .content
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", handleLikeButtonClick);

  deleteButton.addEventListener("click", handleDeleteButtonClick);

  cardImage.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}

function renderCard(name, link, cardContainer) {
  const cardElement = getCardElement({ name, link });
  cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardContainer);
});

// Pop-up "Novo Local"
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardModal.querySelector(".popup__close");
const addCardForm = addCardModal.querySelector("#new-card-form");

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = addCardForm.querySelector(
    ".popup__input_type_card-name"
  ).value;

  const link = addCardForm.querySelector(".popup__input_type_url").value;

  renderCard(name, link, cardContainer);

  closeModal(addCardModal);

  addCardForm.reset();
}

addCardForm.addEventListener("submit", handleCardFormSubmit);