import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import currentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
function App() {
  //States
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
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

  function handleUpdateUser({ name, about }) {
    console.log("YEAH");
    api
      .setUserInfo({ name, about })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .then(() => {
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  //Open Popups
  function handleEditAvatarClick(e) {
    e.preventDefault();
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(e) {
    e.preventDefault();
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(e) {
    e.preventDefault();
    setIsAddPlaceOpen(true);
  }
  function handleDeleteClick(e) {
    setIsDeleteOpen(true);
  }
  function handleUpdateAvatar(avatar) {
    api
      .setAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  //Close Popups
  function closeAllPopups() {
    setIsAddPlaceOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
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
              userId={currentUser._id}
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

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

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
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <Footer />
          </currentUserContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
