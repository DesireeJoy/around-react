import logo from "./images/Logo.svg";

function App() {
  return (
    <div>
      <div class="body">
        <div className="page">
          <header className="header">
            <img
              id="logo-img"
              alt="Around the US Logo"
              src={logo}
              className="header__logo"
            />
          </header>
          <main className="content">
            {/* Profile Section */}
            <section className="profile">
              <form className="profile__info-area">
                <button
                  className="profile__avatar-edit"
                  aria-label="edit-avatar"
                  type="button"
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
                />
              </form>
              <button
                aria-label="add"
                className="profile__addbtn button"
                type="button"
                name="add_btn"
              />
            </section>
            {/* Grid Section */}
            <section className="grid">
              <ul className="grid__list">{/* Generate the Cards here */}</ul>
            </section>
          </main>
          {/* Footer */}
          <footer className="footer">
            <p>© 2020 Around The U.S.</p>
          </footer>
          {/* Div closure for Page*/}
        </div>
        {/* Edit name & title */}
        <div className="popup popup_edit">
          <div className="popup__form">
            <form
              className="popup__form-selector form"
              id="userForm"
              name="profileForm"
            >
              <h3 className="popup__heading">Edit Profile</h3>
              <input
                type="text"
                className="popup__input form_input"
                id="inputName"
                defaultValue
                name="profileName"
                minLength={2}
                maxLength={40}
                required
              />
              <span
                className="popup__form_input_type_active inputName-error error"
                name="inputName-error"
              />
              <input
                type="text"
                className="popup__input form_input"
                id="inputTitle"
                defaultValue="Explorer"
                name="profileTitle"
                minLength={2}
                maxLength={200}
                required
              />
              <span
                className="popup__form_input_type_active inputTitle-error error"
                name="inputTitle-error"
              />
              <button
                type="submit"
                className="popup__submit form__submit"
                value="Save"
              >
                Save
              </button>
              <button
                type="button"
                className="popup__close button"
                aria-label="close"
                name="close_profile"
              />
            </form>
          </div>
        </div>
        {/* add Cards */}
        <div className="popup__card popup">
          <div className="popup__form popup__card_form">
            <form
              className="popup__card_form-selector form"
              id="addForm"
              name="addForm"
            >
              <h3 className="popup__card_heading">New Place</h3>
              <input
                type="text"
                className="popup__card_input form_input"
                id="inputPlace"
                name="placeName"
                placeholder="Title"
                defaultValue
                minLength={2}
                maxLength={30}
                required
              />
              <span
                className="popup__form_input_type_active inputPlace-error error"
                name="inputPlace-error"
              />
              <input
                type="url"
                className="popup__card_input form_input"
                id="inputFile"
                name="placeFileName"
                placeholder="Image link"
                defaultValue
                required
              />
              <span
                className="popup__form_input_type_active inputFile-error error"
                name="inputFile-error"
              />
              <button
                type="submit"
                className="popup__card_submit-disabled popup__card_submit form__submit"
                value="Save"
                id="addFormSubmit"
                disabled
              >
                Create
              </button>
              <button
                type="button"
                className="popup__close button"
                aria-label="close"
                name="close_card"
              />
            </form>
          </div>
        </div>
        {/* Card Template  */}
        <template id="cardTemplate" />
        {/* Popup for Enlarged Image */}
        <div className="popup__image popup">
          <div className="popup__image_cont">
            <div className="popup__image_wrap">
              <img className="grid__image_active" alt="" />
              <button
                type="button"
                className="popup__close button"
                aria-label="close"
              />
            </div>
            <div className="popup__image_capt" />
          </div>
        </div>
        {/* Popup for Avatar Image */}
        <div className="popup popup__avatar">
          <div className="popup__image_cont" />
          <div className="popup__form">
            <form
              className="popup__avatar_form-selector form"
              id="avatarForm"
              name="avatarForm"
            >
              <h3 className="popup__heading">Change profile picture</h3>
              <input
                className="form_input popup__input form__input_type_avatar-link"
                id="avatar-input"
                type="url"
                name="link"
                placeholder="avatar"
                required
              />
              <span
                className="popup__form_input_type_error avatar-input-error error"
                name="inputFile-error"
              >
                &gt;
              </span>
              <button
                className="popup__card_submit-disabled popup__card_submit form__submit"
                type="submit"
                aria-label="Save "
              >
                Save
              </button>
            </form>
            <button
              type="button"
              className="popup__close button"
              aria-label="close"
              name="close_card"
            />
          </div>
        </div>
        <div className="popup popup__delete">
          <div className="popup__image_cont">
            <form className="popup__form form">
              <h3 className="popup__heading">Are you sure?</h3>
              <button
                className="popup__delete_submit form__submit"
                type="submit"
                aria-label="Yes"
              >
                Yes
              </button>
              <button
                type="button"
                className="popup__close button"
                aria-label="close"
                name="close_card"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
