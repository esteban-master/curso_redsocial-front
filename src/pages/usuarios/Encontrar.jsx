import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../auth/context/contextAuth";
import { TiposActions } from "../../auth/context/reducer";
import ManejoError from "../ManejoError";
import { useEncontrar } from "./api-user";

export const Encontrar = ({ user }) => {
  const { _id } = user;
  const data = useEncontrar(_id);

  // console.log("ERRORORORO: ", data, JSON.parse(data.error.message));
  if (data.isLoading && data.status === "loading") {
    return "Cargando...";
  }

  if (data.status === "error" || data.isError) {
    return <ManejoError error={data.error} />;
  }

  return (
    <div>
      <h1>Encontrar personas</h1>
      {data.status === "success" &&
        data.data.map((usuario) => (
          <p key={usuario._id}>
            <Link to={`/usuario/${usuario._id}`}>
              <span>{usuario.name}</span>
            </Link>
          </p>
        ))}
    </div>
  );
};
