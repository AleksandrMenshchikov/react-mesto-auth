import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Greeting() {
  const currentUser = React.useContext(CurrentUserContext);
  const { name } = currentUser;

  if (name) {
    return (
      <section className="greeting">
        <h2 className="greeting__text">{`Добро пожаловать, ${name}!`}</h2>
      </section>
    );
  } else {
    return null;
  }
}

export default Greeting;
