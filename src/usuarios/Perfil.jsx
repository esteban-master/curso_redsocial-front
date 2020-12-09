import { useRouteMatch } from "react-router";
import { usePerfil } from "./api-user";
import { useAuth } from "../auth/context/contextAuth";
import { Link } from "react-router-dom";
import { seguir, dejarDeSeguir } from "./api-user";
import { useMutation, queryCache } from "react-query";
import FollowGrid from "./FollowGrid";

const Perfil = () => {
  const { params } = useRouteMatch();
  const {
    data: { logged, user },
  } = useAuth();
  const { data: usuario, status } = usePerfil(params.userId);

  const [mutateSeguir] = useMutation(seguir, {
    onSuccess: (datos) => {
      console.log("onSucces seguir!: datos: ", datos);
      queryCache.setQueryData(["usuario", usuario._id], datos);
    },
  });
  const [mutateDejarDeSeguir] = useMutation(dejarDeSeguir, {
    onSuccess: (datos) => {
      console.log("onSucces dejar de seguir!");
      queryCache.setQueryData(["usuario", usuario._id], datos);
    },
  });

  async function clickBotonSeguir() {
    await mutateSeguir(usuario._id);
  }

  function checkSiguiendo(seguidores) {
    return seguidores.some((seguidor) => seguidor._id === user._id);
  }

  if (status === "loading") {
    return "Cargando usuario...";
  }

  return (
    <div>
      <h1>Perfil de {usuario.name}</h1>
      <p> {usuario.email} </p>
      <p> {usuario.about} </p>

      <div>
        {logged && user._id === usuario._id ? (
          <>
            <Link to={`/usuario/editar/${usuario._id}`}>Editar</Link>
            <button onClick={() => console.log("Borrar: " + usuario.name)}>
              Borrar
            </button>
          </>
        ) : (
          <div>
            {checkSiguiendo(usuario.seguidores) ? (
              <button
                onClick={async () => {
                  await mutateDejarDeSeguir(usuario._id);
                  console.log("Dejar de seguir");
                }}
              >
                Dejar de seguir
              </button>
            ) : (
              <button onClick={clickBotonSeguir}>Seguir</button>
            )}
          </div>
        )}
      </div>

      <div>
        <FollowGrid
          personas={usuario.siguiendo}
          label={`Siguiendo: ${usuario.siguiendo.length}`}
        />
        <FollowGrid
          personas={usuario.seguidores}
          label={`Seguidores: ${usuario.seguidores.length}`}
        />
      </div>
    </div>
  );
};

export default Perfil;
