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
      await Axios.post(`${base_url}/citas`, datosCita, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  getCitasByActualDay = () =>
    new Promise(async (resolve, reject) => {
      await Axios.get(`${base_url}/citas`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  getCita = (id) =>
    new Promise(async (resolve, reject) => {
      await Axios.get(`${base_url}/citas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });

  getAllCitas = () => new Promise(async (resolve, reject) => {
    await Axios.get(`${base_url}/citas/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        let citas = res.data.citas;
        // split citas by day
        let citasByDay = {};
        citas.forEach((cita) => {
          let fecha = cita.date_appointment.split("T")[0];
          if (citasByDay[fecha]) {
            citasByDay[fecha].push(cita);
          } else {
            citasByDay[fecha] = [cita];
          }
        });
        resolve(citasByDay);
      })
      .catch((err) => {
        console.log(err);
        reject(this.getErrorMessage(err));
      });
  })

  updateCita = (id, datosCita) =>
    new Promise(async (resolve, reject) => {
      await Axios.put(`${base_url}/citas/${id}`, datosCita, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(this.getErrorMessage(err));
        });
    });
}

export default CitasServices;
