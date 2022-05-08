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

const citasServices = new CitasServices();

const Citas = () => {

  const [citas, setCitas] = useState([]);

  const getCitas = () => {
    citasServices.getCitasByActualDay().then((response) => {
      setCitas(response.citas);
    }).catch((err) => {
      swal("Error", err.message, "error");
    });
  }

  useEffect(() => {
    getCitas();
  } , []);

  return (
    <Container>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl">Citas proximas</h1>
          <p className="text-2xl text-gray-400">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="mt-6">
          <div className="flex justify-end gap-2">
            <Link
              to="/citas/new"
              className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2"
            >
              <box-icon type="solid" color="#fff" name="calendar"></box-icon>
              Agendar Cita
            </Link>
            <button className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2">
              <box-icon name="show" color="#fff"></box-icon>
              Ver mas
            </button>
          </div>
          <div className="flex flex-wrap mt-2 gap-2">
            {citas.map((cita, idx) => (
              <CitaCard key={idx} info={cita}/>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Citas;
