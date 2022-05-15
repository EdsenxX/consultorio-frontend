// Dependencies
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import swal from "sweetalert";
// Components
import Container from "../components/Container";
import CitaCard from "../components/citas/CitaCard";
// Services
import CitasServices from "../services/Citas";
// Assets
import WarningSignal from "../assets/img/warning.png"

const citasServices = new CitasServices();

const Citas = () => {
  const [citas, setCitas] = useState([]);

  const getCitas = () => {
    citasServices
      .getCitasByActualDay()
      .then((response) => {
        setCitas(response.citas);
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  useEffect(() => {
    getCitas();
  }, []);

  return (
    <Container>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl">Citas proximas</h1>
          <p className="text-2xl text-gray-400">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="mt-6 h-full">
          <div className="flex justify-end gap-2">
            <Link to="/settings" className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2">
              Configuraciones
            </Link>
            <Link
              to="/citas/new"
              className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2"
            >
              <box-icon type="solid" color="#fff" name="calendar"></box-icon>
              Agendar Cita
            </Link>
            <Link to="/all" className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2">
              <box-icon name="show" color="#fff"></box-icon>
              Ver mas
            </Link>
          </div>
          <div className="flex flex-wrap mt-2 gap-2 h-full">
            {citas.length ? (
              citas.map((cita, idx) => <CitaCard key={idx} info={cita} />)
            ) : (
              <div className="w-full h-[100%] flex justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <img src={WarningSignal} alt="Señal de advertencia" className="w-[100px]" />
                  <h2 className="text-4xl">Sin citas</h2>
                  <p className="text-2xl">
                    No se encontraron citas proximas el dia de hoy
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Citas;
