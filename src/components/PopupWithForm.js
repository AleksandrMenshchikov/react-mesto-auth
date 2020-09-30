import React from "react";

function PopupWithForm({ name, isOpen, onClose, title, children, onSubmit }) {
  return (
    <div className={`pop-up ${name} ${isOpen ? "pop-up-opened" : ""}`}>
      <form
        onSubmit={onSubmit}
        noValidate
        action="#"
        className="form"
        method="POST"
        name={`${name}`}
      >
        <button
          type="button"
          className="pop-up__close-icon"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <h3 className="form__title">{title}</h3>
        {children}
      </form>
    </div>
  );
}

export default PopupWithForm;
