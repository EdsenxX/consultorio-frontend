// Services
import AuthServices from "../services/Auth";

export const setLogin = () => async (dispatch) => {
  let user = null;
  await new AuthServices()
    .verify()
    .then((res) => {
      user = res.results;
    })
    .catch((err) => {
      return new Error("Error al verificar token");
    });
  dispatch({
    type: "setLogin",
    payload: { login: user ? true : false, user },
  });
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: "logout",
    payload: { login: false, user: null },
  });
};