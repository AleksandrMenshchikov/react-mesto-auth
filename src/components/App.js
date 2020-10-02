import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/api";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isImageCardPopupOpen, setIsImageCardPopupOpen] = React.useState();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState();
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [isLoading, setLoading] = React.useState();
  const [initialPath, setInitialPath] = React.useState("");
  const [initialCard, setInitialCard] = React.useState({});
  const [initialFriend, setInitialFriend] = React.useState({});
  const [linkCards, setLinkCards] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegisterSuccessed, setIsRegisterSuccessed] = React.useState();
  const [messageError, setMessageError] = React.useState("");
  const [email, setEmail] = React.useState(null);

  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserData()])
      .then((data) => {
        setCards([...data[0]]);
        const initCard = data[0].find(
          (card) => card._id === location.pathname.slice(7)
        );
        if (initCard) {
          setIsImageCardPopupOpen(true);
          setSelectedCard({ ...initCard });
          setInitialCard({ ...initCard });
        }
        const initFriend = data[0].find(
          (card) => card.owner._id === location.pathname.slice(9)
        );
        if (initFriend) {
          setIsImageCardPopupOpen(true);
          setSelectedCard({ ...initFriend.owner });
          setInitialFriend({ ...initFriend.owner });
        }
        setCurrentUser({ ...data[1] });
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLike(card) {
    const newCards = cards.map((c) => (c._id === card._id ? card : c));
    setCards(newCards);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          handleLike(newCard);
        })
        .catch((err) => console.log(err));
    } else if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          handleLike(newCard);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true);
    setCard({ ...card });
  }

  function handleCardClick(card, path) {
    setIsImageCardPopupOpen(true);
    setSelectedCard({ ...card });
    setInitialPath(path);
  }

  function handleCardsClick(linkCardsPath) {
    setLinkCards(linkCardsPath);
  }

  function handleFriendsClick(linkFriendsPath) {
    setLinkCards(linkFriendsPath);
  }

  function handleCardFriendClick(cardFriend, path) {
    setIsImageCardPopupOpen(true);
    setSelectedCard({ ...cardFriend });
    setInitialPath(path);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api
      .patchUserData(name, about)
      .then((res) => {
        setCurrentUser({ ...res });
        closeAllPopups();
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .patchAvatar(avatar)
      .then((res) => {
        setCurrentUser({ ...res });
        closeAllPopups();
        setTimeout(() => setLoading(false), 200);
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlace({ name, link }) {
    setLoading(true);
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
        setTimeout(() => setLoading(false), 200);
      })
      .catch((err) => console.error(err));
  }

  function handleConfirmButtonClick() {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
        setTimeout(() => setLoading(false), 200);
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setTimeout(() => setSelectedCard({}), 200);
    if (location.pathname === "/") {
      history.push("/");
    } else if (linkCards) {
      setTimeout(() => history.push(linkCards), 200);
    } else if (initialPath) {
      setTimeout(() => history.push(initialPath), 200);
    } else if (initialCard) {
      setTimeout(() => history.push("/cards"), 200);
    } else if (initialFriend) {
      setTimeout(() => history.push("/friends"), 200);
    }
    setInitialCard({});
    setInitialFriend({});
  }

  function closeInfoTooltip() {
    setIsInfoTooltipPopupOpen(false);
  }

  function handleRegisterSuccessed() {
    setIsRegisterSuccessed(true);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleRegisterFailed(err) {
    setIsRegisterSuccessed(false);
    setIsInfoTooltipPopupOpen(true);
    setMessageError(err);
  }

  function handleLoginSuccessed(email) {
    setIsLoggedIn(true);
    setEmail(email);
  }

  function deleteEmail() {
    setEmail(null);
  }

  function handleLoginFailed(err) {
    setIsRegisterSuccessed(false);
    setIsInfoTooltipPopupOpen(true);
    setMessageError(err);
  }

  React.useEffect(() => {
    const closePopupsByOverlay = (e) => {
      if (e.target.classList.contains("pop-up-opened")) {
        closeAllPopups();
      }
    };

    document.addEventListener("click", closePopupsByOverlay);
    return () => document.removeEventListener("click", closePopupsByOverlay);
  });

  React.useEffect(() => {
    const closeInfoTooltipByOverlay = (e) => {
      if (e.target.classList.contains("pop-up-tooltip_opened")) {
        closeInfoTooltip();
      }
    };

    document.addEventListener("click", closeInfoTooltipByOverlay);
    return () =>
      document.removeEventListener("click", closeInfoTooltipByOverlay);
  });

  React.useEffect(() => {
    const closePopupsByEsc = (e) => {
      if (e.key === "Escape" && document.querySelector(".pop-up-opened")) {
        closeAllPopups();
      }
      if (
        e.key === "Escape" &&
        document.querySelector(".pop-up-tooltip_opened")
      ) {
        closeInfoTooltip();
      }
    };

    document.addEventListener("keydown", closePopupsByEsc);
    return () => document.removeEventListener("keydown", closePopupsByEsc);
  });

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res.data) {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        } else if (res.message) {
          localStorage.removeItem("jwt");
          history.push("/sign-in");
        }
      });
    }
  }

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} deleteEmail={deleteEmail} />
        <Switch>
          <Route path="/sign-in">
            <Login
              onLoginSuccessed={handleLoginSuccessed}
              onLoginFailed={handleLoginFailed}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              onRegisterSuccessed={handleRegisterSuccessed}
              onRegisterFailed={handleRegisterFailed}
            />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardFriendClick={handleCardFriendClick}
            onCardsClick={handleCardsClick}
            onFriendsClick={handleFriendsClick}
          />
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <ConfirmDeleteCardPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onButtonClick={handleConfirmButtonClick}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={isImageCardPopupOpen}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
        />
        <InfoTooltip
          registerSuccessed={isRegisterSuccessed}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeInfoTooltip}
          messageError={messageError}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
