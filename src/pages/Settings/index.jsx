import { useState } from "react";
import moment from "moment";
// Components
import Container from "../../components/Container";
import ButtonLink from "../../components/ButtonLink";
// Pages
import UsersSettings from "./Users";
import DoctorsSettings from "./Doctors";
import AddUser from "./AddUser";
import AddDoctor from "./AddDoctor";

const Settings = () => {
  const [template, setTemplate] = useState("users");

  const changeAddUser = () => {
    setTemplate("addUser");
  };

  const changeUsers = () => {
    setTemplate("users");
  };

  const changeDoctors = () => {
    setTemplate("doctors");
  };

  const changeAddDoctor = () => {
    setTemplate("addDoctor");
  };

  const getTemplate = () => {
    switch (template) {
      case "users":
        return <UsersSettings addUser={changeAddUser} />;
      case "addUser":
        return <AddUser userList={changeUsers} />;
      case "doctors":
        return <DoctorsSettings addDoctor={changeAddDoctor} />;
      case "addDoctor":
        return <AddDoctor doctorList={changeDoctors} />;
    }
  };

  const handleChangeTemplate = (template) => {
    setTemplate(template);
  };

  return (
    <Container>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl">Configuraciones</h1>
          <p className="text-2xl text-gray-400">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <ButtonLink to="/">
            <box-icon name="home-alt-2" color="#fff"></box-icon>
            Inicio
          </ButtonLink>
        </div>
        <div className="flex gap-2 mt-5 h-full">
          <div className="w-[20%] bg-gray-200 rounded-xl p-5">
            <ul className="flex flex-col gap-2">
              <li
                className="cursor-pointer rounded-md p-2 hover:bg-sky-800 hover:text-white"
                onClick={() => {
                  handleChangeTemplate("users");
                }}
              >
                Usuario
              </li>
              <li
                className="cursor-pointer rounded-md p-2 hover:bg-sky-800 hover:text-white"
                onClick={() => {
                  handleChangeTemplate("doctors");
                }}
              >
                Doctores
              </li>
            </ul>
          </div>
          <div className="w-[80%] bg-gray-200 rounded-xl p-5">
            {getTemplate()}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
