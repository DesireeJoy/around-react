class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("popup__close") ||
        e.target.classList.contains("popup_visible")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
