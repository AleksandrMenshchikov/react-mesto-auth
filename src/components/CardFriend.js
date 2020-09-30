import React from "react";
import { Link, useRouteMatch } from "react-router-dom";


function CardFriend({ onCardFriendClick, cardFriend }) {
  const { path } = useRouteMatch();

  function handleClick() {
    onCardFriendClick(cardFriend, path);
  }

  return (
    <li className="elements__item">
      <Link to={`/friends/${cardFriend._id}`}>
        <div
          className="elements__image"
          role="img"
          style={{ backgroundImage: `url(${cardFriend.avatar})` }}
          onClick={handleClick}
        />
      </Link>
      <article className="elements__item-bottom elements__item-bottom_theme-friend">
        <h4 className="elements__item-title">{cardFriend.name}</h4>
        <p className="elements__item-subtitle">{cardFriend.about}</p>
      </article>
    </li>
  );
}

export default CardFriend;
