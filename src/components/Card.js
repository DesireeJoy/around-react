class Card {
  constructor({
    cardData,
    templateElement,
    handleCardImgClick,
    handleDeleteClick,
    handleLikes,
    myId,
  }) {
    // the text and the image are private fields,
    // they're only needed inside the class
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._templateElement = templateElement;
    this._handleCardImgClick = handleCardImgClick;
    this._id = cardData._id;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikes = handleLikes;
    this._myId = myId;
    this._cardOwner = cardData.owner;
    this._id = cardData._id;
    this._cardElement = this._getTemplate();
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateElement)
      .content.querySelector(".grid__card")
      .cloneNode(true);
    return cardElement;
  }

  _handleLike(evt) {
    evt.target.classList.toggle("grid__heart_active");
  }
  id() {
    return this._id;
  }

  _setEventListeners() {
    //Search for Elements
    this._cardElement
      .querySelector(".grid__heart")
      .addEventListener("click", () => {
        this._handleLikes(this.id());
      });

    this._cardElement
      .querySelector(".grid__btn_del")
      .addEventListener("click", (e) => {
        this._handleDeleteClick(this.id());
      });

    this._cardElement
      .querySelector(".grid__image")
      .addEventListener("click", () =>
        this._handleCardImgClick(this._link, this._text)
      );
  }
  deleteCard() {
    this._cardElement.remove(".grid__card");
  }

  _handleDeleteCard() {
    this._handleDeleteClick(this.id());
  }
  isLiked() {
    return this._cardElement
      .querySelector(".grid__heart")
      .classList.contains("grid__heart_active");
  }

  showLiked(myId) {
    this._likes.forEach((like) => {
      if (like._id === myId) {
        this._cardElement
          .querySelector(".grid__heart")
          .classList.add("grid__heart_active");
      }
    });
  }

  likeCard() {
    this._cardElement
      .querySelector(".grid__heart")
      .classList.add("grid__heart_active");
  }
  getLikeCount(count) {
    this._likesCt.textContent = count;
  }
  _removeDelBtn() {
    if (this._cardOwner._id !== this._myId) {
      this._cardElement.querySelector(".grid__btn_del").style.display = "none";
    }
  }

  dislikeCard() {
    this._cardElement
      .querySelector(".grid__heart")
      .classList.remove("grid__heart_active");
  }
  generateCard() {
    this._cardElement = this._getTemplate().cloneNode(true);
    this._cardElement.querySelector(".grid__caption").textContent = this._name;
    this._cardImage = this._cardElement.querySelector(".grid__image");
    this._likesCt = this._cardElement.querySelector(".grid__like-count");
    this.getLikeCount(this._likes.length);
    this.showLiked(this._myId);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCt.textContent = this._likes.length;
    this._removeDelBtn();

    this._setEventListeners();

    return this._cardElement;
  }
}
export default Card;
