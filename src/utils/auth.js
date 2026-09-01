const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error:${res.status}`);
};

const headers = { "Content-Type": "application/json" };

const signUp = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signUp`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

const singIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};
