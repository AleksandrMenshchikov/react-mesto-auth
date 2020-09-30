import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup({ isOpen, onClose, onButtonClick, isLoading }) {
  function handleClick() {
    onButtonClick();
  }

  return (
    <PopupWithForm
      name="pop-up_confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <button
        onClick={handleClick}
        type="button"
        className="form__input-button form__input-button_comfirm"
      >
        {isLoading ? "Удаление..." : "Да"}
      </button>
    </PopupWithForm>
  );
}

export default ConfirmDeleteCardPopup;
