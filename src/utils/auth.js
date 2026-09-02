const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error:${res.status}`);
};

const headers = { "Content-Type": "application/json" };

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signUp`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};
