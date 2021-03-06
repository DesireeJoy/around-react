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
import AddPlacePopup from "./AddPlacePopup";

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
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        api
          .getCardList()
          .then((res) => {
            setCards(
              res.map((card) => ({
                name: card.name,
                link: card.link,
                _id: card._id,
                likes: card.likes,
                owner: card.owner,
              }))
            );
          })
          .catch((err) => console.log(err));
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
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => setIsAddPlaceOpen(false))
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })

      .catch((err) => console.log(err));
  }, []);

  function handleDeleteClick(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }
  function handleCardLike(card) {
    // Check one more time if this card was already liked

    const isLiked = card.likes.some((c) => c._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      // Create a new array based on the existing one and put a new card into it
      const newCards = cards.map((item) =>
        item._id === card._id ? newCard : item
      );

      // Update the state
      setCards(newCards);

      return false;
    });
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
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
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
            <AddPlacePopup
              isOpen={isAddPlaceOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
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
