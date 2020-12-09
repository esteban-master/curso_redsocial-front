import React, { useEffect } from "react";
import { useAuth } from "../auth/context/contextAuth";
import { TiposActions } from "../auth/context/reducer";
import { Encontrar } from "../usuarios/Encontrar";

const Home = ({ history }) => {
  const {
    data: { logged, user },
    dispatch,
  } = useAuth();

  useEffect(() => {
    const unlisten = history.listen(() => {
      if (logged) {
        fetch("http://localhost:5000/auth/verifytoken", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (!res.ok) {
              dispatch({
                type: TiposActions.LOGOUT,
              });
              history.replace("/signin");
            }
          });
      }
    });
    return () => {
      unlisten();
    };
  }, [history, logged, user, dispatch]);

  return (
    <div>
      {!logged && (
        <>
          <h1>Welcome to the MERN Social home page. </h1>
        </>
      )}
      {logged && (
        <div>
          <Encontrar user={user} />
        </div>
      )}
    </div>
  );
};

export default Home;
