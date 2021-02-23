class FormValidator {
  constructor(settingsObject, formElement) {
    // the text and the image are private fields,
    // they're only needed inside the class
    this._settings = settingsObject;
    this._formElement = formElement;
    this._inputSelector = settingsObject.inputSelector;
    this._inputs = [...this._formElement.querySelectorAll(this._inputSelector)];
    this._subButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._subButton.classList.add(this._settings.inactiveButtonClass);
      this._subButton.disabled = true;
    } else {
      this._subButton.classList.remove(this._settings.inactiveButtonClass);
      this._subButton.disabled = false;
    }
  }

  // _toggleButtonState() {
  //   const isFormValid = this._inputs.every((input) => {
  //     return input.validity.valid;
  //   });
  //   if (isFormValid) {
  //     this._button.classList.remove(this._inactiveButtonClass);
  //     this._button.disabled = false;
  //   } else {
  //     this._button.classList.add(this._inactiveButtonClass);
  //     this._button.disabled = true;
  //   }
  // }

  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    //Make an array of all the inputs that are in the formElement
    const inputsList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    //Go through each input individually
    inputsList.forEach((inputElement) => {
      //If that input is touched, we immediately check validity
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Step 3
        this._toggleButtonState(); // Step 4
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement, this._settings);
  }
  resetValidation() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}

export default FormValidator;
