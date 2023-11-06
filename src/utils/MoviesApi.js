import { MOVIES_API } from "./constants.js";

function checkResponce(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getMovies() {
    return fetch(`${MOVIES_API}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => checkResponce(res));
};