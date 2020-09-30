import React from "react";
import loadingGif from "../images/loading-gif1.gif";
import Card from "./Card";
import Greeting from "./Greeting";
import CardFriend from "./CardFriend";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { NavLink, Route } from "react-router-dom";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  onCardFriendClick,
  onCardsClick,
  onFriendsClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const arrId = [];
  cards.forEach((element) => {
    if (!arrId.includes(element.owner._id)) {
      arrId.push(element.owner._id);
    }
  });
  const arrCards = [];
  arrId.forEach((element) => {
    const elem = cards.find((item) => item.owner._id === element);
    arrCards.push(elem.owner);
  });

  function handleCardsClick() {
    onCardsClick("/cards");
  }

  function handleFriendsClick() {
    onFriendsClick("/friends");
  }

  return (
    <>
      <section className="profile page__profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar || loadingGif}
            alt="Фотография"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-top">
            <h2 className="profile__title">
              {currentUser.name || "Загрузка..."}
            </h2>
            <button
              type="button"
              className="profile__edit-button"
              title="Редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">
            {currentUser.about || "Загрузка..."}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          title="Добавить карточку"
          onClick={onAddPlace}
        />
      </section>

      <nav className="links page__links">
        <ul className="links__list">
          <li className="links__item">
            <NavLink
              to="/cards"
              className="links__item-link"
              activeClassName="links__item-link_active"
              onClick={handleCardsClick}
            >
              Карточки
            </NavLink>
            <NavLink
              to="/friends"
              className="links__item-link"
              activeClassName="links__item-link_active"
              onClick={handleFriendsClick}
            >
              Друзья
            </NavLink>
          </li>
        </ul>
      </nav>

      <section className="elements page__elements">
        <Route path="/" exact>
          <Greeting />
        </Route>
        <ul className="elements__list">
          <Route path="/cards">
            {cards.map((card) => (
              <Card
                key={card._id}
                onCardClick={onCardClick}
                card={card}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </Route>
          <Route path="/friends">
            {arrCards.map((card) => {
              return (
                <CardFriend
                  key={card._id}
                  onCardFriendClick={onCardFriendClick}
                  cardFriend={card}
                />
              );
            })}
          </Route>
        </ul>
      </section>
    </>
  );
}

export default Main;
