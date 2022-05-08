// Dependencies
import { useId } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Components
import Container from "../components/Container";
import Input from "../components/inputs/Input";
// Assets
import LoginImage from "../assets/img/login.svg";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Ingresa un correo valido")
      .required("Campo Obligatorio")
      .trim(),
    password: yup.string().required("Campo Obligatorio").trim(),
  })
  .required();

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = (datos) => {
    console.log(datos);
  };

  return (
    <Container>
      <div className="w-2/4 flex justify-center items-center">
        <form onSubmit={handleSubmit(login)}>
          <h1 className="text-5xl mb-10">Bienvenido</h1>
          <Input label="Email" registre={register("email")} error={errors.email} required/>
          <Input label="Contraseña" registre={register("password")} error={errors.password} required/>
          <button className="w-[450px] mt-4 p-3 bg-sky-800 text-white rounded-lg shadow-lg shadow-sky-800/60">
            Ingresar
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center">
        <img src={LoginImage} alt="Login" className="w-4/5 h-4/5" />
      </div>
    </Container>
  );
};

export default Login;
