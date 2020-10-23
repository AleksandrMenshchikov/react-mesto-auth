import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
import * as auth from "../utils/auth";

function Header({ email, deleteEmail, isHiddenAuthForm }) {
  const location = useLocation();
  const history = useHistory();

  const [burgerClicked, setBurgerClicked] = React.useState(false);

  function handleClick() {
    setBurgerClicked(!burgerClicked);
  }

  function signOut() {
    deleteEmail();
    setBurgerClicked(false);
    auth
      .getSignOut()
      .then(() => {
        history.push("/sign-in");
      })
      .catch((err) => console.log(err));
  }

  return (
    <header className="header page__header">
      <div className="header__nav">
        <img src={logo} alt="Логотип" className="header__logo" />
        {!isHiddenAuthForm && location.pathname === "/sign-up" && (
          <Link className="header__link" to="/sign-in">
             Войти
          </Link>
        )}
        {!isHiddenAuthForm && location.pathname === "/sign-in" && (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        )}
        {email && (
          <button
            className={`header__burger ${
              burgerClicked && "header__burger_close"
            }`}
            onClick={handleClick}
          ></button>
        )}
      </div>
      {email && (
        <div
          className={`header__auth ${burgerClicked && "header__auth_opened"}`}
        >
          <p className="header__email">{email}</p>
          <Link
            className="header__link header__link_signout"
            to="/sign-in"
            onClick={signOut}
          >
             Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
