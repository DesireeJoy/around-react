import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";
import currentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userTitle, setUserTitle] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(currentUserContext);

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
    <main className="content">
      {/* Profile Section */}
      <section className="profile">
        <form className="profile__info-area">
          <button
            className="profile__avatar-edit"
            aria-label="edit-avatar"
            type="button"
            onClick={props.handleEditAvatarClick}
          />
          <img
            id="avatar Image"
            alt="Avatar Image for User"
            className="profile__avatar"
            src={currentUser.avatar}
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__title">{currentUser.about}</p>
          </div>
          <button
            className="profile__editbtn button"
            aria-label="Edit"
            type="button"
            name="edit_btn"
            onClick={props.handleEditProfileClick}
          />
        </form>
        <button
          aria-label="add"
          className="profile__addbtn button"
          type="button"
          name="add_btn"
          onClick={props.handleAddPlaceClick}
        />
      </section>
      {/* Grid Section */}
      <section className="grid">
        <ul className="grid__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              _id={card._id}
              src={card.link}
              title={card.name}
              likes={card.likes}
              owner={card.owner}
              onCardLike={() => {
                handleCardLike(card);
              }}
              handleCardClick={() => {
                props.handleCardClick(card);
              }}
              handleDeleteClick={(card) => {
                handleDeleteClick(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
