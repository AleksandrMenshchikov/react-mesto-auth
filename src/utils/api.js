class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _headers(token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getUserData(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  patchUserData(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers(token),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleResponse);
  }

  postCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers(token),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  putLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  deleteLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers(token),
    }).then(this._handleResponse);
  }

  patchAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers(token),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:5000",
});
