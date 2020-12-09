import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin } from "./api-auth";
import { useAuth } from "./context/contextAuth";
import { TiposActions } from "./context/reducer";

export const Signin = ({ location }) => {
  const [valuesForm, setValuesForm] = useState({});
  const [redirectLuegoDelLogin, setRedirectLuegoDelLogin] = useState(false);
  const { dispatch } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    signin(valuesForm).then((user) => {
      if (user.error) {
        console.log("Error: ", user.error);
      } else {
        dispatch({
          type: TiposActions.LOGIN,
          payload: user,
        });
        setRedirectLuegoDelLogin(true);
      }
    });
  };

  const change = (e) => {
    setValuesForm({
      ...valuesForm,
      [e.target.name]: e.target.value,
    });
  };

  const { from } = location.state || {
    from: {
      pathname: "/",
    },
  };

  if (redirectLuegoDelLogin) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <h1>Iniciar Sesion</h1>
      <form onSubmit={submit}>
        <input type="email" onChange={change} name="email" />
        <input type="password" onChange={change} name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
