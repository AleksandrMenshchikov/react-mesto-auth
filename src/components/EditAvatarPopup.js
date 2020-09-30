import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputLinkAvatar = React.useRef("");
  const [link, setLink] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLinkErrorVisible, setIsLinkErrorVisible] = React.useState(false);
  const spanLinkError = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputLinkAvatar.current.value,
    });
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    if (e.target.checkValidity()) {
      setIsLinkErrorVisible(false);
    } else {
      setIsLinkErrorVisible(true);
    }
  }

  React.useEffect(() => {
    setTimeout(() => setLink(""), 200);
    setIsLinkErrorVisible(false);
    setIsDisabled(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (inputLinkAvatar.current.checkValidity()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [link]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="pop-up_avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="form__input-container">
        <input
          ref={inputLinkAvatar}
          name="input-link-avatar"
          type="url"
          className={`form__input form__input_link-avatar ${
            isLinkErrorVisible ? "form__input_type_error" : ""
          }`}
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span
          id="input-link-avatar-error"
          className={`form__input-error ${
            isLinkErrorVisible ? "form__input-error_visible" : ""
          }`}
          ref={spanLinkError}
        >
          {isLinkErrorVisible ? inputLinkAvatar.current.validationMessage : ""}
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

export default EditAvatarPopup;
