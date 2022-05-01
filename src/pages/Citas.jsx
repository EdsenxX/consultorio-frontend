// Dependencies
import moment from "moment";
// Components
import Container from "../components/Container";

const Cita = () => {
    return (
        <div className="bg-sky-800 text-white w-[300px] p-4 rounded-xl">
              <p className="text-right mb-3 font-bold">
                {moment().format("DD/MM/YYYY HH:mm")}
              </p>
              <div>
                <p className="text-lg text-gray-300">Paciente</p>
                <p className="text-xl">Eduardo Serrano Jaime</p>
              </div>
              <div>
                <p className="text-lg text-gray-300">Doctor</p>
                <p className="text-xl">Dr. Strange</p>
              </div>
              <div>
                <p className="text-lg text-gray-300">Consultorio</p>
                <p className="text-xl">Numero 7</p>
              </div>
              <div>
                <p className="text-lg text-gray-300">Notas</p>
                <p className="text-xl">
                  El paciente mas guapo que vamos a tener
                </p>
              </div>
            </div>
    )
}

const Citas = () => {
  return (
    <Container>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl">Citas proximas</h1>
          <p className="text-2xl text-gray-400">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="mt-6">
          <div className="flex justify-end gap-2">
            <button className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2">
              <box-icon type="solid" color="#fff" name="calendar"></box-icon>
              Agendar Cita
            </button>
            <button className="flex items-center bg-sky-800 rounded-xl text-white p-3 gap-2">
              <box-icon name="show" color="#fff"></box-icon>
              Ver mas
            </button>
          </div>
          <div className="flex flex-nowrap gap-2 mt-2">
            <Cita />
            <Cita />
            <Cita />
            <Cita />
            <Cita />
            <Cita />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Citas;
