// Dependencies
import { useState, useEffect } from "react";
import swal from "sweetalert";
// Components
import Button from "../../components/Button";
// Services
import DoctorsServices from "../../services/Doctors";

const doctorsServices = new DoctorsServices();

const DoctorsSettings = (props) => {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = () => {
    doctorsServices
      .getAllDoctors()
      .then((res) => {
        setDoctors(res.doctors);
      })
      .catch((err) => {
        swal("Error", err.message, "error");
      });
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">Doctores</h1>
      </div>
      <div className="flex justify-end">
        <Button onClick={props.addDoctor}>
          <box-icon name="user-plus" color="#fff"></box-icon>
          Agregar Doctor
        </Button>
      </div>
      <table className="mt-10">
        <thead className="text-left border-b border-sky-800">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Consultorio</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id} className="border-b border-gray-400">
              <td className='p-2'>{doctor.firstName}</td>
              <td className='p-2'>{doctor.lastName}</td>
              <td className='p-2'>{doctor.consultorio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsSettings;
