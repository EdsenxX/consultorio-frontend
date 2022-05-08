// Dependencies
import Axios from "axios";

const base_url = "http://localhost:5000";

class CitasServices {
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

  createCita = (datosCita) =>
    new Promise(async (resolve, reject) => {
      await Axios.post(`${base_url}/citas`, datosCita)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  getCitasByActualDay = () =>
    new Promise(async (resolve, reject) => {
      await Axios.get(`${base_url}/citas`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  getCita = (id) =>
    new Promise(async (resolve, reject) => {
      await Axios.get(`${base_url}/citas/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  updateCita = (id, datosCita) =>
    new Promise(async (resolve, reject) => {
      await Axios.put(`${base_url}/citas/${id}`, datosCita)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });
}

export default CitasServices;
