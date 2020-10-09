import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function Register({ onRegisterSuccessed, onRegisterFailed, isHiddenAuthForm }) {
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

  function handleRegisterSuccessed() {
    onRegisterSuccessed();
  }

  function handleRegisterFailed(err) {
    onRegisterFailed(err);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password).then((res) => {
      if (res.data) {
        setEmail("");
        setPassword("");
        handleRegisterSuccessed();
        history.push("/sign-in");
      } else if (res.error) {
        setEmail("");
        setPassword("");
        handleRegisterFailed(res.error);
        history.push("/sign-up");
      } else if (res.message) {
        setEmail("");
        setPassword("");
        handleRegisterFailed(res.message);
        history.push("/sign-up");
      }
    });
  }

  if (isHiddenAuthForm) {
    return null;
  }

  return (
    <div className="login page__login">
      <h2 className="login__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <p className="login__text">
          Уже зарегистрированы?
          <Link className="login__link" to="/sign-in">
            {" "}
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
