import { useQuery, useMutation } from "react-query";

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

  if (res.status === 401 || res.statusText === "Unauthorized") {
    throw Error(
      JSON.stringify({
        status: 401,
        mensaje: "jajojoojdf ",
      })
    );
  }
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

  if (res.status === 401 || res.statusText === "Unauthorized") {
    throw Error(
      JSON.stringify({
        status: 401,
        mensaje: "jajojoojdf ",
      })
    );
  }
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

export const useSeguirUsuario = (usuarioAuthId, usuarioId, cache) => {
  return useMutation(seguir, {
    onSuccess: (datos) => {
      cache.setQueryData(["usuario", usuarioId], datos);
      cache.setQueryData(["encontrar", usuarioAuthId], (encontrarOld) => {
        const index = encontrarOld.findIndex(
          (person) => person._id === usuarioId
        );
        encontrarOld.splice(index, 1);
        return encontrarOld;
      });
      if (cache.getQueryData(["usuario", usuarioAuthId])) {
        cache.setQueryData(["usuario", usuarioAuthId], (userDataOld) => {
          const { siguiendo } = userDataOld;
          siguiendo.push(datos);
          return userDataOld;
        });
      }
    },
  });
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

export const useDejarDeSeguirUsuario = (usuarioAuthId, usuarioId, cache) => {
  return useMutation(dejarDeSeguir, {
    onSuccess: (datos) => {
      cache.setQueryData(["usuario", usuarioId], datos);
      cache.setQueryData(["encontrar", usuarioAuthId], (old) => [
        ...old,
        datos,
      ]);
      if (cache.getQueryData(["usuario", usuarioAuthId])) {
        cache.setQueryData(["usuario", usuarioAuthId], (userDataOld) => {
          const { siguiendo } = userDataOld;
          const index = siguiendo.findIndex(
            (person) => person._id === usuarioId
          );
          siguiendo.splice(index, 1);
          return userDataOld;
        });
      }
    },
  });
};
