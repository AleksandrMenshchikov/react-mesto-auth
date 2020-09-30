import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isNameErrorVisible, setIsNameErrorVisible] = React.useState(false);
  const [isLinkErrorVisible, setIsLinkErrorVisible] = React.useState(false);
  const inputName = React.useRef();
  const inputLink = React.useRef();
  const spanNameError = React.useRef();
  const spanLinkError = React.useRef();

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setIsNameErrorVisible(false);
    } else {
      setIsNameErrorVisible(true);
    }
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    if (e.target.checkValidity()) {
      setIsLinkErrorVisible(false);
    } else {
      setIsLinkErrorVisible(true);
    }
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setTimeout(() => {
      setName("");
      setLink("");
    }, 200);
    setIsNameErrorVisible(false);
    setIsLinkErrorVisible(false);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      inputName.current.checkValidity() &&
      inputLink.current.checkValidity()
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, link]);

  return (
    <PopupWithForm
      onSubmit={handleAddPlaceSubmit}
      name="pop-up_card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="form__input-container">
        <input
          name="input-name-card"
          type="text"
          className={`form__input form__input_name-card ${
            isNameErrorVisible ? "form__input_type_error" : ""
          }`}
          placeholder="Название"
          required
          minLength="1"
          maxLength="30"
          pattern="[A-Za-zА-Яа-яЁё\s\-]+"
          onChange={handleNameChange}
          value={name || ""}
          ref={inputName}
        />
        <span
          id="input-name-card-error"
          className={`form__input-error ${
            isNameErrorVisible ? "form__input-error_visible" : ""
          }`}
          ref={spanNameError}
        >
          {isNameErrorVisible ? inputName.current.validationMessage : ""}
        </span>
      </div>
      <div className="form__input-container">
        <input
          name="input-link-card"
          type="url"
          className={`form__input form__input_link-card ${
            isLinkErrorVisible ? "form__input_type_error" : ""
          }`}
          placeholder="Ссылка на картинку"
          required
          onChange={handleLinkChange}
          value={link}
          ref={inputLink}
        />
        <span
          id="input-link-card-error"
          className={`form__input-error ${
            isLinkErrorVisible ? "form__input-error_visible" : ""
          }`}
          ref={spanLinkError}
        >
          {isLinkErrorVisible ? inputLink.current.validationMessage : ""}
        </span>
      </div>
      <button
        type="submit"
        className="form__input-button"
        disabled={isDisabled}
      >
        {isLoading ? "Загрузка..." : "Создать"}
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
