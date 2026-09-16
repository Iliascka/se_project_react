import { request } from "./api";
const baseUrl = import.meta.env.PROD
  ? "https://api.wtwr-ilias.aerwear.ro"
  : "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const register = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const login = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
};

export const update = ({ name, avatar, token }) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, token }),
  });
};
