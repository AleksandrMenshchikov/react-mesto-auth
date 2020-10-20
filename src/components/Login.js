import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ onLoginSuccessed, onLoginFailed, isHiddenAuthForm }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  function handleLoginSuccessed(email) {
    onLoginSuccessed(email);
  }

  function handleLoginFailed(err) {
    onLoginFailed(err);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.authorize(email, password).then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        handleLoginSuccessed(email);
        setEmail("");
        setPassword("");
        history.push("/");
      } else if (res.message) {
        setEmail("");
        setPassword("");
        handleLoginFailed("Неправильно указан email или пароль");
      }
    });
  }

  if (isHiddenAuthForm) {
    return null;
  }

  return (
    <div className="login page__login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__email"
          placeholder="Email"
          required
          type="email"
          name="email"
          value={email || ""}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          className="login__password"
          placeholder="Пароль"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit" className="login__button">
          Войти
        </button>
        <p className="login__text">
          Ещё не зарегистрированы?
          <Link className="login__link" to="/sign-up">
            {" "}
            Регистрация
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
