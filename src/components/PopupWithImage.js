import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".grid__image_active");
    this._caption = this._popup.querySelector(".popup__image_capt");
  }
  open(newSrc, newCapt) {
    super.open();
    this._image.src = newSrc;
    this._caption.textContent = newCapt;
  }
}
export default PopupWithImage;
