// Dependencies
import Axios from "axios";

const base_url = "http://localhost:5000";

class AuthServices {
  getErrorMessage = (err) => {
    let errorMessage;
    try {
      errorMessage = err.response.data;
    } catch (error) {
      errorMessage = {
        message: "Error al conectarse al servidor",
      };
    }
    return errorMessage;
  };

  login = (datosLogin) =>
    new Promise(async (resolve, reject) => {
      await Axios.post(`${base_url}/auth/login`, datosLogin)
        .then(async (res) => {
          await localStorage.setItem("token", res.data.jwt);
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  verify = () =>
    new Promise(async (resolve, reject) => {
      const token = await localStorage.getItem("token");
      if (!token) return reject("No se encontro el jwt");
      Axios.post(
        `${base_url}/auth/verify`,
        { token: token },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });
}

export default AuthServices;
