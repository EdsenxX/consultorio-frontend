// Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
// Componentes
import Button from "../../components/Button";
import Input from "../../components/inputs/Input";
// Services
import DoctorsServices from "../../services/Doctors";

const doctorsServices = new DoctorsServices();

const schema = yup
  .object({
    firstName: yup.string().required("Campo Obligatorio").trim(),
    lastName: yup.string().required("Campo Obligatorio").trim(),
    consultorio: yup.string().required("Campo Obligatorio").trim(),
  })
  .required();

const AddDoctor = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const cancelar = () => {
    swal({
      title: "¿Estas seguro?",
      text: "Se perderan los datos ingresados",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.doctorList();
      }
    });
  };

  const handleAddDoctor = (datos) => {
    doctorsServices
      .addDoctor(datos)
      .then((res) => {
        swal("Doctor creado", res.message, "success").then(()=>{
            props.doctorList();
        })
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl mb-5">Agregar Doctor</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleAddDoctor)}
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
            label="Consultorio"
            type="text"
            register={register("consultorio")}
            error={errors.consultorio}
            required
          />
        </div>
        <div className="flex gap-5 justify-end">
          <Button type="button" onClick={cancelar}>
            Cancelar
          </Button>
          <Button>Crear Doctor</Button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
