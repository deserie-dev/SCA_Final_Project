class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
  }

  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })
      .then(this._checkResponse)
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })
      .then(this._checkResponse)
  }

  addCard({ name, link }, token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId, token) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    })
      .then(this._checkResponse)
  }

  editProfile({ name, about }, token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }

  editAvatar({ avatar }, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  }

  addLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
    })
      .then(this._checkResponse)
  }

  removeLike(cardId, token) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    })
      .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: (process.env.NODE_ENV === "production" ? "https://api.deserie.students.nomoreparties.site" : "http://localhost:3000")
});


export default api;