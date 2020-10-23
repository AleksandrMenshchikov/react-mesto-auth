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

  _headers() {
    return {
      "Content-Type": "application/json",
    };
  }

  getUserData(userId) {
    return fetch(`${this._baseUrl}/users/${userId}`, {
      credentials: 'include',
      headers: this._headers(),
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers(),
    }).then(this._handleResponse);
  }

  patchUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleResponse);
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers(),
    }).then(this._handleResponse);
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers(),
    }).then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers(),
    }).then(this._handleResponse);
  }

  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers(),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.mesto-app.website",
});
