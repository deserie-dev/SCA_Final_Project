export const BASE_URL = process.env.NODE_ENV === "production" ? "https://api.deserie.students.nomoreparties.site" : "http://localhost:3000";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkResponse(res);
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkResponse(res)
    })
    .then((data) => {
      if (data.token){
      localStorage.setItem('token', data.token);
      return data;
      } else {
        return;
      }
    })
    .catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    return checkResponse(res)
  })
  .then((data) => data);
};