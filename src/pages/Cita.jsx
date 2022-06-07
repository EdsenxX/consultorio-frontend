// Dependencies
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
// Components
import Container from "../components/Container";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";
import TextArea from "../components/inputs/TextArea";
import Button from "../components/Button";
// Services
import CitasServices from "../services/Citas";
import DoctorsServices from "../services/Doctors";

const citasServices = new CitasServices();
const doctorsServices = new DoctorsServices();

const schema = yup
  .object({
    firstName: yup.string().required("Campo Obligatorio").trim().matches(/^[a-zA-Z\s]*$/, "Solo se permiten letras"),
    lastName: yup.string().required("Campo Obligatorio").trim().matches(/^[a-zA-Z\s]*$/, "Solo se permiten letras"),
    email: yup
      .string()
      .email("Ingresa un correo valido")
      .required("Campo Obligatorio")
      .trim(),
    phone: yup.number().required("Campo Obligatorio").typeError("Ingresa un numero"),
    date: yup
      .date()
      .typeError("Ingresa una fecha valida")
      .required("Campo Obligatorio"),
    time: yup.string().required("Campo Obligatorio"),
    doctor: yup.string().required("Campo Obligatorio").trim(),
    notes: yup.string().trim(),
  })
  .required();

const Cita = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id = params.id;
  const isNew = location.pathname.includes("new");

  const [doctors, setDoctors] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getCita = async () => {
    citasServices
      .getCita(id)
      .then(({ cita }) => {
        setValue("firstName", cita.paciente.first_name);
        setValue("lastName", cita.paciente.last_name);
        setValue("email", cita.paciente.email);
        setValue("phone", cita.paciente.phone);
        setValue("date", moment(cita.date_appointment).format("YYYY-MM-DD"));
        setValue("time", moment(cita.date_appointment).format("HH:mm"));
        setValue("doctor", cita.doctor);
        setValue("notes", cita.notes);
        setValue("createdBy", cita.created_by);
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  const getDoctors = async () => {
    doctorsServices.getAllDoctors().then((res) => {
      setDoctors(res.doctors);
    }).catch((err) => {
      swal("Error", err.message, "error");
    })
  }

  useEffect(() => {
    getDoctors();
    if (!props.authReducer.login) {
      navigate("/login");
     }
    if (!isNew) {
      getCita();
    }
  }, [props.authReducer.login]);

  const cancelar = () => {
    swal({
      title: "¿Estas seguro?",
      text: "Se perderan los datos ingresados",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        navigate(-1);
      }
    });
  };

  const handleCita = (datos) => {
    if (isNew) {
      createCita(datos);
    } else {
      updateCita(datos);
    }
  };

  const createCita = (datos) => {
    datos.createdBy = props.authReducer.user._id;
    citasServices
      .createCita(datos)
      .then((res) => {
        swal("Cita creada", res.message, "success").then(() => {
          navigate(-1);
        });
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  const updateCita = (datos) => {
    swal("¿Estas seguro?", "Se actualizara la cita", "warning", {
      buttons: true,
    }).then((willUpdate) => {
      if (willUpdate) {
        citasServices.updateCita(id, datos).then((res) => {
          swal("Cita actualizada", res.message, "success")
            .then(() => {
              navigate(-1);
            })
            .catch((err) => {
              swal("Error", err.message, "error");
            });
        });
      }
    });
  };

  return (
    <Container>
      <div className="w-full">
        <h1 className="text-4xl mb-5">
          {isNew ? "Crear Cita" : "Editar Cita"}
        </h1>
        <form
          onSubmit={handleSubmit(handleCita)}
          className="flex flex-col w-full gap-10"
        >
          <div className="flex gap-10">
            <Input
              label="Nombre(s)"
              type="text"
              register={register("firstName")}
              error={errors.firstName}
              required
            />
            <Input
              label="Apellidos"
              type="text"
              register={register("lastName")}
              error={errors.lastName}
              required
            />
          </div>
          <div className="flex gap-10">
            <Input
              label="Correo"
              type="text"
              register={register("email")}
              error={errors.email}
              required
            />
            <Input
              label="Telefono"
              type="number"
              register={register("phone")}
              error={errors.phone}
              required
            />
          </div>
          <div className="flex gap-10">
            <Input
              label="Fecha"
              type="date"
              register={register("date")}
              error={errors.date}
              required
            />
            <Input
              label="Hora"
              type="time"
              register={register("time")}
              error={errors.time}
              required
            />
            <Select
              label="Doctor"
              register={register("doctor")}
              error={errors.doctor}
              required
            >
              <option value="">Selecciona un doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
            </Select>
          </div>
          <TextArea
            label="Notas"
            register={register("notes")}
            error={errors.notes}
          />
          <div className="flex gap-5 justify-end">
            <Button type="button" onClick={cancelar}>
              Cancelar
            </Button>
            <Button>{isNew ? "Crear Cita" : "Editar Cita"}</Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ authReducer }) => ({
  authReducer,
});

export default connect(mapStateToProps)(Cita);
