import { Link } from "react-router-dom";
import { useUsuarios } from "./api-user";

const Usuarios = () => {
  const { data: usuarios, isLoading, status } = useUsuarios();
  if (status === "loading" && isLoading) {
    return "Cargando usuarios...";
  }
  return (
    <div>
      <h1>Usuarios</h1>
      {usuarios.map((user) => (
        <p key={user._id}>
          <Link to={`/usuario/${user._id}`}>
            <span>{user.name}</span>
          </Link>
        </p>
      ))}
    </div>
  );
};

export default Usuarios;
