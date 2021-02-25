import logo from "../images/Logo.svg";
import React, { useState, useEffect, createContext } from "react";
import api from "../utils/api";

function Card(props) {
  return (
    <li className="grid__card">
      <button
        className="grid__btn_del button"
        type="button"
        aria-label="delete"
        onClick={() => {
          props.handleDeleteClick(props.card);
        }}
      ></button>

      <button
        className="grid__btn_popup"
        type="button"
        aria-label="view image"
        onClick={() => {
          props.handleCardClick(props.card);
        }}
      >
        <img className="grid__image" src={props.src} alt={props.title} />
      </button>
      <div className="grid__card-text">
        <h2 className="grid__caption">{props.title}</h2>
        <div className="grid__likes">
          <button
            className="grid__heart button"
            type="button"
            aria-label="like"
            onClick={props.likeCardClick}
          ></button>
          <p className="grid__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
