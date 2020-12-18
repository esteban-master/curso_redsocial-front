import { dejarDeSeguir, seguir } from "./api-user";

const BotonSeguirPerfil = ({ onButtonClick, siguiendo }) => {
  function seguirClick() {
    onButtonClick(seguir);
  }
  function dejarDeSeguirClick() {
    onButtonClick(dejarDeSeguir);
  }
  return (
    <div>
      {siguiendo ? (
        <button onClick={dejarDeSeguirClick}>Dejar de seguir</button>
      ) : (
        <button onClick={seguirClick}>Seguir</button>
      )}
    </div>
  );
};

export default BotonSeguirPerfil;
