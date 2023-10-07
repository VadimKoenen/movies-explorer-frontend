export const baseUrl = ['https://api.vkoenen.mesto.nomoredomainsicu.ru']; ///['http://localhost:3000'];

const checkResponce = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ///authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponce(res));
};

export const register = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponce(res));
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponce(res));
};


export const logout = () => {
  return fetch(`${baseUrl}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponce(res));
};
