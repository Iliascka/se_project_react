const baseUrl = "  http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleServerRespose = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItem = () => {
  fetch(`${baseUrl}/Items`, { headers }).then(handleServerResponse);
};
