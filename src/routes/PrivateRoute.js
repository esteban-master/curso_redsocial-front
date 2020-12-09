import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../auth/context/contextAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const {
    data: { logged },
  } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
