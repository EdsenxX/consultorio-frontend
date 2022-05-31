// Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Components
import Container from "../components/Container";
import Input from "../components/inputs/Input";
// Assets
import LoginImage from "../assets/img/login.svg";
// Services
import AuthServices from "../services/Auth";

const authServices = new AuthServices();

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

const Login = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (props.authReducer.login) {
      navigate("/");
    }
  }, [props.authReducer]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = (datos) => {
    authServices.login(datos).then((res) => {
      props.setLogin();
      navigate("/");
    }).catch((err) => {
      swal("Error", err.message, "error");
    });
  };

  return (
    <Container>
      <div className="w-2/4 flex justify-center items-center">
        <form onSubmit={handleSubmit(login)}>
          <h1 className="text-5xl mb-10">Bienvenido</h1>
          <Input type="text" label="Email" register={register("email")} error={errors.email} required/>
          <Input type="password" label="Contraseña" register={register("password")} error={errors.password} required/>
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

const mapStateToProps = ({ authReducer }) => ({
  authReducer,
});

export default connect(mapStateToProps, authActions)(Login);
