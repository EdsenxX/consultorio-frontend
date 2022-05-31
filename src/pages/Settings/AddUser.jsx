// Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
// Componentes
import Button from "../../components/Button";
import Input from "../../components/inputs/Input";
// Services
import UsersServices from "../../services/Users";

const usersServices = new UsersServices();

const schema = yup
  .object({
    firstName: yup.string().required("Campo Obligatorio").trim(),
    lastName: yup.string().required("Campo Obligatorio").trim(),
    email: yup
      .string()
      .email("Ingresa un correo valido")
      .required("Campo Obligatorio")
      .trim(),
    phone: yup.string().required("Campo Obligatorio").trim(),
    birthDate: yup
      .date()
      .typeError("Ingresa una fecha valida")
      .required("Campo Obligatorio"),
    password: yup.string().required("Campo Obligatorio").trim(),
  })
  .required();

const AddUser = (props) => {
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
        props.userList();
      }
    });
  };

  const handleAddUser = (datos) => {
    usersServices
      .createUser(datos)
      .then((res) => {
        swal("Usuario Creado", res.message, "success").then(() => {
          props.userList();
        });
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">Agregar Usuario</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleAddUser)}
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
            type="phone"
            register={register("phone")}
            error={errors.phone}
            required
          />
        </div>
        <div className="flex gap-10">
          <Input
            label="Fecha de nacimiento"
            type="date"
            register={register("birthDate")}
            error={errors.birthDate}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            register={register("password")}
            error={errors.password}
            required
          />
        </div>
        <div className="flex gap-5 justify-end">
          <Button type="button" onClick={cancelar}>
            Cancelar
          </Button>
          <Button>Crear Usuario</Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
