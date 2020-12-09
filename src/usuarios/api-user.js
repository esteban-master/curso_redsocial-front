import { useQuery } from "react-query";

// Encontrar personas
const fetchEncontrarPersonas = async (_, userId) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(
    `http://localhost:5000/usuarios/encontrar/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return res.json();
};

export const useEncontrar = (userId) => {
  return useQuery(["encontrar", userId], fetchEncontrarPersonas);
};

// Obtener usuarios
const fetchGetUsuarios = async () => {
  const res = await fetch(`http://localhost:5000/usuarios`);
  return res.json();
};

export const useUsuarios = () => {
  return useQuery(["usuarios"], fetchGetUsuarios);
};

// Obtener perfil de usuario
const fetchPerfilUsuario = async (_, userId) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`http://localhost:5000/usuarios/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res.json();
};

export const usePerfil = (userId) => {
  return useQuery(["usuario", userId], fetchPerfilUsuario);
};

// Seguir y dejar de seguir
export const seguir = async (id) => {
  const { token, _id } = JSON.parse(localStorage.getItem("user"));
  let respuesta = await fetch("http://localhost:5000/usuarios/seguir", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ userId: _id, followId: id }),
  });
  return await respuesta.json();
};

export const dejarDeSeguir = async (id) => {
  const { token, _id } = JSON.parse(localStorage.getItem("user"));
  let respuesta = await fetch("http://localhost:5000/usuarios/dejardeseguir", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ userId: _id, unfollowId: id }),
  });
  return await respuesta.json();
};
