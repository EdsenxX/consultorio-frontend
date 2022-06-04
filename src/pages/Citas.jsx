// Dependencies
import { useState, useEffect } from "react";
import moment from "moment";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
// Components
import Container from "../components/Container";
import CitaCard from "../components/citas/CitaCard";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
// Services
import CitasServices from "../services/Citas";
// Assets
import WaitImage from "../assets/img/wait.svg";
// Actions
import * as authActions from "../actions/authActions";

const citasServices = new CitasServices();

const Citas = (props) => {
  const navigate = useNavigate();

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
    if (!props.authReducer.login) {
      navigate("/login");
    }
    getCitas();
  }, [props.authReducer.login]);

  const handleLogout = () => {
    props.logout();
    navigate("/login");
  };

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
            <ButtonLink to="/settings">Configuraciones</ButtonLink>
            <ButtonLink to="/citas/new">
              <box-icon type="solid" color="#fff" name="calendar"></box-icon>
              Agendar Cita
            </ButtonLink>
            <ButtonLink to="/all">
              <box-icon name="show" color="#fff"></box-icon>
              Ver mas
            </ButtonLink>
            <Button onClick={handleLogout}>
              <box-icon name="door-open" type="solid" color="#fff"></box-icon>
              Cerrar Sesión
            </Button>
          </div>
          <div className="flex flex-wrap mt-2 gap-2 h-full">
            {citas.length ? (
              citas.map((cita, idx) => <CitaCard key={idx} info={cita} />)
            ) : (
              <div className="w-full h-[100%] flex justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={WaitImage}
                    alt="Señal de advertencia"
                    className="w-[300px]"
                  />
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

const mapStateToProps = ({ authReducer }) => ({
  authReducer,
});

export default connect(mapStateToProps, authActions)(Citas);
