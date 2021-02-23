import logo from "../images/Logo.svg";
import { render } from "react-dom";
import React from "react";

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [userTitle, setUserTitle] = React.useState("");

  return (
    <main className="content">
      {/* Profile Section */}
      <section className="profile">
        <form className="profile__info-area">
          <button
            className="profile__avatar-edit"
            aria-label="edit-avatar"
            type="button"
            onClick={handleEditAvatarClick}
          />
          <img
            id="avatar Image"
            alt="Avatar Image for User"
            className="profile__avatar"
            src="./images/jacques.png"
          />
          <div className="profile__info">
            <h1 className="profile__name" />
            <p className="profile__title" />
          </div>
          <button
            className="profile__editbtn button"
            aria-label="Edit"
            type="button"
            name="edit_btn"
            onClick={handleEditProfileClick}
          />
        </form>
        <button
          aria-label="add"
          className="profile__addbtn button"
          type="button"
          name="add_btn"
          onClick={handleAddPlaceClick}
        />
      </section>
      {/* Grid Section */}
      <section className="grid">
        <ul className="grid__list">{/* Generate the Cards here */}</ul>
      </section>
    </main>
  );
}

export default Main;
