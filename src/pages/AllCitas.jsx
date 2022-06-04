// Dependencies
import { useState, useEffect } from "react";
import moment from "moment";
import swal from "sweetalert";
// Components
import Container from "../components/Container";
import CitaCard from "../components/citas/CitaCard";
import ButtonLink from "../components/ButtonLink";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";
// Services
import CitasServices from "../services/Citas";
import DoctoresServices from "../services/Doctors";

const citasServices = new CitasServices();
const doctoresServices = new DoctoresServices();

const AllCitas = () => {
  const [citas, setCitas] = useState({});
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [showFiltros, setShowFiltros] = useState(false);

  const getCitas = () => {
    citasServices
      .getAllCitas()
      .then((response) => {
        const citas = { ...response };
        setCitas(citas);
        setFilteredCitas(citas);
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  const getDoctores = () => {
    doctoresServices
      .getAllDoctors()
      .then((response) => {
        setDoctores(response.doctors);
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  useEffect(() => {
    getCitas();
    getDoctores();
  }, []);

  const toggleFiltros = () => {
    if(!showFiltros) {
      setFilteredCitas(citas);
    }
    setShowFiltros(!showFiltros);
  };

  const handleFilters = (e) => {
    const nombrePaciente = document.getElementById("nombrePaciente").value;
    const doctor = document.getElementById("doctor").value;
    let newFilteredCitas = {};
    Object.entries(citas).forEach(([date, citas]) => {
      newFilteredCitas[date] = [];
      citas.forEach((cita) => {
        const pacienteFullName =
          cita.paciente.first_name + " " + cita.paciente.last_name;
        if (nombrePaciente && doctor) {
          if (
            pacienteFullName
              .toLowerCase()
              .includes(nombrePaciente.toLowerCase()) &&
            cita.doctor[0]._id === doctor
          ) {
            newFilteredCitas[date].push(cita);
          }
        } else if (nombrePaciente) {
          if (
            pacienteFullName
              .toLowerCase()
              .includes(nombrePaciente.toLowerCase())
          ) {
            newFilteredCitas[date].push(cita);
          }
        } else if (doctor) {
          if (cita.doctor[0]._id === doctor) {
            newFilteredCitas[date].push(cita);
          }
        } else {
          newFilteredCitas[date].push(cita);
        }
      });
    });
    setFilteredCitas(newFilteredCitas);
    toggleFiltros();
  };

  return (
    <Container>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl">Historial de citas</h1>
          <p className="text-2xl text-gray-400">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex justify-end gap-2 relative">
          <ButtonLink to="/">
            <box-icon name="home-alt-2" color="#fff"></box-icon>
            Inicio
          </ButtonLink>
          <div className="relative">
            <Button onClick={toggleFiltros}>
              {showFiltros ? (
                <box-icon name="chevron-down" color="#fff"></box-icon>
              ) : (
                <box-icon name="chevron-up" color="#fff"></box-icon>
              )}
              Filtros
            </Button>
            {showFiltros && (
              <div className="absolute bg-white rounded-lg shadow-xl top-[110%] w-80 right-0 p-3">
                <Input
                  type="text"
                  label="Nombre del paciente"
                  id="nombrePaciente"
                />
                <Select label="Doctor" id="doctor">
                  <option value="">Seleccione una opción</option>
                  {doctores.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </Select>
                <Button full onlyText onClick={handleFilters}>
                  Agregar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
        {Object.entries(filteredCitas).map(([date, citas], idx) => {
          if (citas.length > 0) {
            return (
              <div className="mb-10" key={idx}>
                <p className="block w-full border-b-2 border-sky-800 text-xl">
                  {moment(date).format("DD/MM/YYYY")}
                </p>
                <div className="flex flex-wrap mt-2 gap-2">
                  {citas.map((cita, idx) => (
                    <CitaCard key={idx} info={cita} />
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </Container>
  );
};

export default AllCitas;
