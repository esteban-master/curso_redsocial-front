import { Route, Switch } from "react-router-dom";
import { Signin } from "../auth/Signin";
import Signup from "../auth/Signup";
import Home from "../core/Home";
import Perfil from "../usuarios/Perfil";
import Usuarios from "../usuarios/Usuarios";
import Menu from "./Menu";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/usuario/:userId">
          <Perfil />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default Routes;
