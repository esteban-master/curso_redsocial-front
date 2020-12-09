import { Link, useRouteMatch } from "react-router-dom";
import { useAuth } from "../auth/context/contextAuth";
import { TiposActions } from "../auth/context/reducer";

const Menu = () => {
  const {
    data: { user, logged },
    dispatch,
  } = useAuth();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <CustomLink label="Home" to="/" activaSoloSiEsExacta={true} />
          </li>
          <li>
            <CustomLink label="Usuarios" to="/usuarios" />
          </li>

          {logged ? (
            <>
              <li>
                <CustomLink to={`/usuario/${user._id}`} label="Mi Perfil" />
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch({ type: TiposActions.LOGOUT });
                  }}
                >
                  Cerrar Sesion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <CustomLink to="/signup" label="Signup" />
              </li>
              <li>
                <CustomLink to="/signin" label="Signin" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

const CustomLink = ({ label, to, activaSoloSiEsExacta }) => {
  const match = useRouteMatch({
    path: to,
    exact: activaSoloSiEsExacta,
  });
  return (
    <div>
      <Link to={to}>
        <span style={match ? { color: "#ff4081" } : { color: "black" }}>
          {label}
        </span>
      </Link>
    </div>
  );
};

export default Menu;
