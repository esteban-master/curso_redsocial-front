import { useRouteMatch } from "react-router";
import { usePerfil } from "./api-user";

const Perfil = () => {
  const { params } = useRouteMatch();
  const { data: usuario, status } = usePerfil(params.userId);

  if (status === "loading") {
    return "Cargando usuario...";
  }
  return (
    <div>
      <h1>Perfil de {usuario.name}</h1>
    </div>
  );
};

export default Perfil;
