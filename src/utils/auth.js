
import { MAIN_BASEURL } from './constants';

const checkResponce = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  export const register = ({ name, email, password }) => {
    return fetch(`${MAIN_BASEURL}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => checkResponce(res));
  };

  export const login = ({ email, password }) => {
    return fetch(`${MAIN_BASEURL}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => checkResponce(res));
  };
  
export const checkToken = () => {
  return fetch(`${MAIN_BASEURL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"      
    },
  }).then((res) => checkResponce(res));
};


export const updateUser = ({ name, email }) => {
  return fetch(`${MAIN_BASEURL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",      
    },
    body: JSON.stringify({
      name, email
    }),
  }).then((res) => {
    return checkResponce(res);
  });
};

export const logout = () => {
  return fetch(`${MAIN_BASEURL}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
  return checkResponce(res)
});
};
