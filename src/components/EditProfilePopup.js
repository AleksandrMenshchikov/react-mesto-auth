import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isNameErrorVisible, setIsNameErrorVisible] = React.useState(false);
  const [
    isDescriptionErrorVisible,
    setIsDescriptionErrorVisible,
  ] = React.useState(false);
  const inputName = React.useRef();
  const inputDescription = React.useRef();
  const spanNameError = React.useRef();
  const spanDescriptionError = React.useRef();

  React.useEffect(() => {
    setTimeout(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, 200);
    setIsNameErrorVisible(false);
    setIsDescriptionErrorVisible(false);
    setIsDisabled(true);
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    if (
      inputName.current.checkValidity() &&
      inputDescription.current.checkValidity()
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, description]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setIsNameErrorVisible(false);
    } else {
      setIsNameErrorVisible(true);
    }
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    if (e.target.checkValidity()) {
      setIsDescriptionErrorVisible(false);
    } else {
      setIsDescriptionErrorVisible(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="pop-up_profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="form__input-container">
        <input
          name="input-name"
          type="text"
          className={`form__input form__input_name ${
            isNameErrorVisible ? "form__input_type_error" : ""
          }`}
          placeholder="Имя Фамилия"
          required
          minLength="2"
          maxLength="40"
          pattern="[A-Za-zА-Яа-яЁё\s\-]+"
          onChange={handleNameChange}
          value={name || ""}
          ref={inputName}
        />
        <span
          id="input-name-error"
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
          name="input-profession"
          type="text"
          className={`form__input form__input_profession ${
            isDescriptionErrorVisible ? "form__input_type_error" : ""
          }`}
          placeholder="Профессиональная деятельность"
          required
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionChange}
          value={description || ""}
          ref={inputDescription}
        />
        <span
          id="input-profession-error"
          className={`form__input-error ${
            isDescriptionErrorVisible ? "form__input-error_visible" : ""
          }`}
          ref={spanDescriptionError}
        >
          {isDescriptionErrorVisible
            ? inputDescription.current.validationMessage
            : ""}
        </span>
      </div>
      <button
        type="submit"
        className="form__input-button"
        disabled={isDisabled}
      >
        {isLoading ? "Загрузка..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
