import { Link } from "react-router-dom";
import { useEncontrar } from "./api-user";
// import { useEncontrar } from "./api-user";

export const Encontrar = ({ user }) => {
  const { _id } = user;

  const { data: usuarios, isLoading, status } = useEncontrar(_id);

  if (isLoading && status === "loading") {
    return "Cargando...";
  }

  return (
    <div>
      <h1>Encontrar personas</h1>
      {usuarios.map((usuario) => (
        <p key={usuario._id}>
          <Link to={`/usuario/${usuario._id}`}>
            <span>{usuario.name}</span>
          </Link>
        </p>
      ))}
    </div>
  );
};
