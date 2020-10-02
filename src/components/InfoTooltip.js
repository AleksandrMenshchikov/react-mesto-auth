import React from "react";
import union from "../images/union.svg";
import unionFailed from "../images/union-failed.svg";

function InfoTooltip({ registerSuccessed, isOpen, onClose, messageError }) {
  return (
    <div className={`pop-up-tooltip ${isOpen && "pop-up-tooltip_opened"}`}>
      <div className="pop-up-tooltip__container">
        <button
          type="button"
          className="pop-up-tooltip__close-icon"
          aria-label="Закрыть тултип"
          onClick={onClose}
        />
        <div className="pop-up-tooltip__inner">
          <img
            className="pop-up-tooltip__img"
            src={registerSuccessed ? union : unionFailed}
            alt="Изображение тултипа"
          />
          <p className="pop-up-tooltip__text">
            {registerSuccessed
              ? "Вы успешно зарегистрировались!"
              : `${messageError}! Попробуйте еще раз.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
