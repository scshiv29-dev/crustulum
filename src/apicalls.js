const API = "http://text.lawcoolify.ml/api/";

export const createFile = (file) => {
  return fetch(`${API}create`, {
    method: "POST",
    body: file,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const getFile = (id) => {
  return fetch(`${API}get/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const deleteFile = (id) => {
  return fetch(`${API}delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
