import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userTitle, setUserTitle] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserTitle(res.about);
        // myId = res._id;
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
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
              key={card._id}
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
