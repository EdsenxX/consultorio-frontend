// Dependencies
import { useId } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Assets
import LoginImage from "../assets/img/login.svg"

const schema = yup
  .object({
    email: yup.string().email("Ingresa un correo valido").required("Campo Obligatorio").trim(),
    password: yup.string().required("Campo Obligatorio").trim(),
  })
  .required();

const Login = () => {
  const email = useId();
  const password = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = (datos) => {
    console.log(datos)
  };

  return (
    <div className="bg-sky-800 h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl p-7 w-[90%] min-h-[90%] flex gap-5 shadow-2xl">
        <div className="w-2/4 flex justify-center items-center">
          <form onSubmit={handleSubmit(login)}>
            <h1 className="text-5xl mb-10">Bienvenido</h1>
            <div className="flex flex-col mb-5">
              <label htmlFor={email} className="text-2xl">
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                id={email}
                className="outline-none border-b-2 border-sky-800 w-[450px]"
              />
              {errors.email && (
              <p className="text-sm text-red-500 p-1">
                {errors.email.message}
              </p>
            )}
            </div>
            <div className="flex flex-col">
              <label htmlFor={password} className="text-2xl">
                Contraseña
              </label>
              <input
                type="password"
                id={password}
                className="outline-none border-b-2 border-sky-800 w-[450px]"
                {...register("password")}
              />
              {errors.password && (
              <p className="text-sm text-red-500 p-1">
                {errors.password.message}
              </p>
            )}
            </div>
            <button className="w-[450px] mt-4 p-3 bg-sky-800 text-white rounded-lg shadow-lg shadow-sky-800/60">Ingresar</button>
          </form>
        </div>
        <div className="flex justify-center items-center">
            <img src={LoginImage} alt="Login" className="w-4/5 h-4/5" />
        </div>
      </div>
    </div>
  );
};

export default Login;
