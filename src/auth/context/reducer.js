export const TiposActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case TiposActions.LOGIN:
      return {
        ...action.payload,
        logged: true,
      };
    case TiposActions.LOGOUT:
      return {
        user: undefined,
        logged: false,
      };

    default:
      return state;
  }
};
