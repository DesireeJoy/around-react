import Header from "./header.js";
import Main from "./main.js";
import Footer from "./footer.js";
import PopupWithForm from "./PopupWithForm.js";
import React, { useState, useEffect } from "react";

function App() {
  //States
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [enlargeImage, setEnlargeImage] = useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [imageLink, setImageLink] = React.useState("");
  const [imageTitle, setImageTitle] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});

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
    e.preventDefault();
    setIsDeleteOpen(true);
  }
  //Close Popups
  function handlePopupClose() {
    setIsAddPlaceOpen(false);
    setIsEditProfileOpen(false);
    setIsEditAvatarOpen(false);
    setIsDeleteOpen(false);
  }

  return (
    <div>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleDeleteClick={handleDeleteClick}
          />
          <PopupWithForm
            isOpen={isDeleteOpen}
            name="profile"
            title="Are you sure?"
            buttonText="Yes"
          />

          <PopupWithForm
            isOpen={isEditAvatarOpen}
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
              value="Place Name"
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
              value="Input File"
            />
            <span
              className="popup__form_input_type_active inputFile-error error"
              name="inputFile-error"
            />
          </PopupWithForm>
          <PopupWithForm
            isOpen={isEditProfileOpen}
            name="profile"
            title="Edit Profile"
            buttonText="Save"
          >
            <input
              type="text"
              className="popup__input form_input"
              id="inputName"
              defaultValue
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
        </div>

        <template id="cardTemplate" />
        {/* Popup for Enlarged Image */}
        <div className="popup__image popup">
          <div className="popup__image_cont">
            <div className="popup__image_wrap">
              <img className="grid__image_active" alt="" />
              <button
                type="button"
                className="popup__close button"
                aria-label="close"
              />
            </div>
            <div className="popup__image_capt" />
          </div>
        </div>
        {/* Popup for Avatar Image */}
        <div className="popup popup__avatar">
          <div className="popup__image_cont" />
          <div className="popup__form">
            <form
              className="popup__avatar_form-selector form"
              id="avatarForm"
              name="avatarForm"
            >
              <h3 className="popup__heading">Change profile picture</h3>
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
              <button
                className="popup__card_submit-disabled popup__card_submit form__submit"
                type="submit"
                aria-label="Save"
              >
                Save
              </button>
            </form>
            <button
              type="button"
              className="popup__close button"
              aria-label="close"
              name="close_card"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
