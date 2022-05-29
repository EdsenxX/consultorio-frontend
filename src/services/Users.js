// Dependencia
import Axios from "axios";

const base_url = "http://localhost:5000";

class UsersServices {
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

  createUser = (datosUser) =>
    new Promise(async (resolve, reject) => {
      await Axios.post(`${base_url}/users`, datosUser)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  getAllUsers = () =>
    new Promise(async (resolve, reject) => {
      await Axios.get(`${base_url}/users`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });
}

export default UsersServices;
