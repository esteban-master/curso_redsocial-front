import { useRouteMatch } from "react-router";
import {
  useDejarDeSeguirUsuario,
  usePerfil,
  useSeguirUsuario,
} from "./api-user";
import ManejoError from "../ManejoError";
import { Link } from "react-router-dom";
import { useQueryCache } from "react-query";
import FollowGrid from "./FollowGrid";
import { useAuth } from "../../auth/context/contextAuth";

const Perfil = () => {
  const cache = useQueryCache();
  const { params } = useRouteMatch();
  const {
    data: { logged, user: userAuth },
  } = useAuth();

  const { data: usuario, status, isError, error } = usePerfil(params.userId);

  const [mutateSeguir] = useSeguirUsuario(userAuth?._id, usuario?._id, cache);

  const [mutateDejarDeSeguir] = useDejarDeSeguirUsuario(
    userAuth?._id,
    usuario?._id,
    cache
  );

  async function clickBotonSeguir() {
    await mutateSeguir(usuario._id);
  }
  async function clickBotonDejarDeSeguir() {
    await mutateDejarDeSeguir(usuario._id);
  }

  function checkSiguiendo(seguidores) {
    return seguidores.some((seguidor) => seguidor._id === userAuth._id);
  }

  if (status === "loading") {
    return "Cargando usuario...";
  }

  if (status === "error" && isError) {
    return <ManejoError error={error} />;
  }

  return (
    <div>
      <h1>Perfil de {usuario.name}</h1>
      <p> {usuario.email} </p>
      <p> {usuario.about} </p>

      <div>
        {logged && userAuth._id === usuario._id ? (
          <>
            <Link to={`/usuario/editar/${usuario._id}`}>Editar</Link>
            <button onClick={() => console.log("Borrar: " + usuario.name)}>
              Borrar
            </button>
          </>
        ) : (
          <div>
            {checkSiguiendo(usuario.seguidores) ? (
              <button onClick={clickBotonDejarDeSeguir}>Dejar de seguir</button>
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
