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

const AllCitas = () => {
  const [citas, setCitas] = useState({});

  const getCitas = () => {
    citasServices
      .getAllCitas()
      .then((response) => {
        console.log(response);
        setCitas(response);
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
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl">Historial de citas</h1>
          <p className="text-2xl text-gray-400">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex justify-end gap-2">
            <Link to="/" className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2">
              <box-icon name="home-alt-2" color="#fff"></box-icon>
              Inicio
            </Link>
          </div>
        {Object.entries(citas).map(([date, citas]) => (
          <div className="mb-10">
            <p className="block w-full border-b-2 border-sky-800 text-xl">
              {moment(date).format("DD/MM/YYYY")}
            </p>
            <div className="flex flex-wrap mt-2 gap-2">
              {citas.map((cita, idx) => (
                <CitaCard key={idx} info={cita} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AllCitas;
