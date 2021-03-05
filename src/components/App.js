import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import currentUserContext from "../contexts/CurrentUserContext";

function App() {
  //States
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [enlargeImage, setEnlargeImage] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  //Open Popups
  function handleEditAvatarClick(e) {
    e.preventDefault();
    setIsEditAvatarOpen(true);
  }
  function handleEditProfileClick(e) {
    e.preventDefault();
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick(e) {
    e.preventDefault();
    setIsAddPlaceOpen(true);
  }
  function handleDeleteClick(e) {
    setIsDeleteOpen(true);
  }

  //Close Popups
  function closeAllPopups() {
    setIsAddPlaceOpen(false);
    setIsEditProfileOpen(false);
    setIsEditAvatarOpen(false);
    setIsDeleteOpen(false);
    setEnlargeImage(false);
  }
  function handleCardClick(card) {
    setEnlargeImage(true);
    setSelectedCard(card);
  }

  return (
    <div>
      <div className="body">
        <div className="page">
          <currentUserContext.Provider value={currentUser}>
            <Header />
            <Main
              handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleDeleteClick={handleDeleteClick}
              handleCardClick={handleCardClick}
            />
            <ImagePopup
              onClose={closeAllPopups}
              selectedCard={selectedCard}
              isOpen={enlargeImage}
            />
            <PopupWithForm
              isOpen={isDeleteOpen}
              onClose={closeAllPopups}
              name="profile"
              title="Are you sure?"
              buttonText="Yes"
            />

            <PopupWithForm
              isOpen={isEditAvatarOpen}
              onClose={closeAllPopups}
              name="avatar"
              title="Change Profile Picture"
              buttonText="Save"
            >
              <input
                className="form_input popup__input form__input_type_avatar-link"
                id="avatar-input"
                type="url"
                name="link"
                placeholder="avatar"
                required
              />
              <span
                className="popup__form_input_type_error avatar-input-error error"
                name="inputFile-error"
              ></span>
            </PopupWithForm>
            <PopupWithForm
              isOpen={isAddPlaceOpen}
              onClose={closeAllPopups}
              name="card"
              title="New Place"
              buttonText="Save"
            >
              <input
                type="text"
                className="popup__card_input form_input"
                id="inputPlace"
                name="placeName"
                placeholder="Title"
                defaultValue
                minLength={2}
                maxLength={30}
              />
              <span
                className="popup__form_input_type_active inputPlace-error error"
                name="inputPlace-error"
              />
              <input
                type="url"
                className="popup__card_input form_input"
                id="inputFile"
                name="placeFileName"
                placeholder="Image link"
              />
              <span
                className="popup__form_input_type_active inputFile-error error"
                name="inputFile-error"
              />
            </PopupWithForm>
            <PopupWithForm
              isOpen={isEditProfileOpen}
              onClose={closeAllPopups}
              name="profile"
              title="Edit Profile"
              buttonText="Save"
            >
              <input
                type="text"
                className="popup__input form_input"
                id="inputName"
                defaultValue="Jacques Cousteau"
                name="profileName"
                minLength={2}
                maxLength={40}
                required
              />
              <span
                className="popup__form_input_type_active inputName-error error"
                name="inputName-error"
              />
              <input
                type="text"
                className="popup__input form_input"
                id="inputTitle"
                defaultValue="Explorer"
                name="profileTitle"
                minLength={2}
                maxLength={200}
                required
              />
              <span
                className="popup__form_input_type_active inputTitle-error error"
                name="inputTitle-error"
              />
            </PopupWithForm>

            <Footer />
          </currentUserContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
