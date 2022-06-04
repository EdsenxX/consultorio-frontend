// Dependencia
import Axios from "axios";

const base_url = "http://localhost:5000";

class DoctorsServices {
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

  getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
      await Axios.get(`${base_url}/doctors`, {
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
  };

  addDoctor = (doctor) => {
    return new Promise(async (resolve, reject) => {
      await Axios.post(`${base_url}/doctors`, doctor, {
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
  };
}

export default DoctorsServices;
