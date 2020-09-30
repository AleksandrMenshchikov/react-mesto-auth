import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Link, useRouteMatch } from "react-router-dom";

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner._id;
  const cardDeleteButtonClassName = `elements__remove ${
    isOwn ? "elements__remove_active" : null
  }`;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "elements__like_active" : null
  }`;
  const listPeopleLiked = card.likes.map((item) => item.name).join(", ");
  const { path } = useRouteMatch();

  function handleClick() {
    onCardClick(card, path);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      />
      <Link to={`/cards/${card._id}`}>
        <div
          className="elements__image"
          role="img"
          style={{ backgroundImage: `url(${card.link})` }}
          onClick={handleClick}
        />
      </Link>
      <article className="elements__item-bottom">
        <h4 className="elements__item-title">{card.name}</h4>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Поставить лайк в виде сердечка"
            onClick={handleLikeClick}
          />
          <div className="elements__like-message">
            {listPeopleLiked
              ? `Нравится: ${listPeopleLiked}`
              : "Это место пока никто не оценил...😒"}
          </div>
          <div className="elements__like-counter">{card.likes.length}</div>
        </div>
      </article>
    </li>
  );
}

export default Card;
