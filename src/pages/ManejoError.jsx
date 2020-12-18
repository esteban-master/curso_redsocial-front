import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/context/contextAuth";
import { TiposActions } from "../auth/context/reducer";

const Error = ({ error }) => {
  const { dispatch } = useAuth();
  const [errorValue] = useState(JSON.parse(error.message));

  useEffect(() => {
    let timeout = setTimeout(() => {
      dispatch({
        type: TiposActions.LOGOUT,
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [errorValue.status, dispatch]);

  return <div>{errorValue.status === 401 && <p>Sesion expirada...</p>}</div>;
};

export default Error;
