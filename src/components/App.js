import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { useHistory, useLocation } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isImageCardPopupOpen, setIsImageCardPopupOpen] = React.useState();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [isLoading, setLoading] = React.useState();
  const [initialPath, setInitialPath] = React.useState("");
  const [initialCard, setInitialCard] = React.useState({});
  const [initialFriend, setInitialFriend] = React.useState({});
  const [linkCards, setLinkCards] = React.useState("");

  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards([...data]);
        const initCard = data.find(
          (card) => card._id === location.pathname.slice(7)
        );
        if (initCard) {
          setIsImageCardPopupOpen(true);
          setSelectedCard({ ...initCard });
          setInitialCard({ ...initCard });
        }
        const initFriend = data.find(
          (card) => card.owner._id === location.pathname.slice(9)
        );
        if (initFriend) {
          setIsImageCardPopupOpen(true);
          setSelectedCard({ ...initFriend.owner });
          setInitialFriend({ ...initFriend.owner });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser({ ...res });
      })
      .catch((err) => console.error(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    } else if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
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
        setTimeout(() => setLoading(false), 200);
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
    const closePopupsByEsc = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closePopupsByEsc);
    return () => document.removeEventListener("keydown", closePopupsByEsc);
  });

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
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
        <Footer />
        <ImagePopup
          isOpen={isImageCardPopupOpen}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
