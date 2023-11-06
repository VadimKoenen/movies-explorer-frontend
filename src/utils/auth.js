
export const baseUrl = ['http://localhost:3000']; /// ['https://api.vkoenen.movies.nomoredomainsrocks.ru']; ///['http://localhost:3000'];

const checkResponce = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  export const register = ({ name, email, password }) => {
    return fetch(`${baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
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
  
export const checkToken = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"      
    },
  }).then((res) => checkResponce(res));
};


export const updateUser = ({ name, email }) => {
  return fetch(`${baseUrl}/users/me`, {
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
  return fetch(`${baseUrl}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponce(res));
};
