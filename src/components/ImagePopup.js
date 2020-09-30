import React from "react";

function ImagePopup({ isOpen, onClose, selectedCard }) {
  return (
    <div className={`pop-up-image ${isOpen && "pop-up-opened"}`}>
      <figure className="pop-up-image__container">
        <button
          type="button"
          className="pop-up-image__close-icon"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <img
          alt="Изображение"
          className="pop-up-image__img"
          src={selectedCard.link || selectedCard.avatar}
        />
        <figcaption className="pop-up-image__description">
          {selectedCard.name}
        </figcaption>
        <figcaption className="pop-up-image__description">
          {selectedCard.about}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
