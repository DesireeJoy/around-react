import logo from "../images/Logo.svg";
import React, { useState, useEffect } from "react";
import jacques from "../images/jacques.png";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userTitle, setUserTitle] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [key, setKey] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserTitle(res.about);
        // myId = res._id;
        setUserAvatar(res.avatar);
        setKey(res._id);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
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
  }, []);

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
            src={userAvatar}
          />
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__title">{userTitle}</p>
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
              card={card}
              _id={card._id}
              src={card.link}
              title={card.name}
              likes={card.likes}
              owner={card.owner}
              handleCardClick={() => {
                props.handleCardClick(card);
              }}
              handleDeleteClick={(card) => {
                props.handleDeleteClick(card);
              }}
              handleCardLike={(card) => {
                props.handleCardLike(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
