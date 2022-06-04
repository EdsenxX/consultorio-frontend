// Dependencies
import { Link } from "react-router-dom";
import moment from "moment"

const CitaCard = (props) => {
  const { info } = props;
  return (
    <Link to={`/citas/show/${info._id}`} className="h-[260px] overflow-hidden bg-sky-800 text-white w-[24%] p-4 rounded-xl hover:shadow-2xl hover:shadow-sky-800/40 hover:scale-[1.03] transition-transform duration-300">
      <p className="text-right mb-3 font-bold">
        {moment(info.date_appointment).format("DD/MM/YYYY HH:mm")}
      </p>
      <div>
        <p className="text-sm text-gray-300">Paciente</p>
        <p className="text-base">{`${info.paciente.first_name} ${info.paciente.last_name}`}</p>
      </div>
      <div>
        <p className="text-sm text-gray-300">Doctor</p>
        <p className="text-base">{`${info.doctor[0].firstName} ${info.doctor[0].lastName}`}</p>
      </div>
      <div>
        <p className="text-sm text-gray-300">Consultorio</p>
        <p className="text-base">{info.doctor[0].consultorio}</p>
      </div>
      <div>
        <p className="text-sm text-gray-300">Notas</p>
        <p className="text-base">{info.notes}</p>
      </div>
    </Link>
  );
};

export default CitaCard;
