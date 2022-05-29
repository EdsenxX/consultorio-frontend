// Dependencies
import {useState, useEffect} from 'react';
// Components
import Button from '../../components/Button';
// Services
import UsersServices from '../../services/Users';

const usersServices = new UsersServices();

const UsersSettings = (props) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersServices.getAllUsers().then((res) => {
      setUsers(res.users);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">Usuarios</h1>
      </div>
      <div className="flex justify-end">
        <Button onClick={props.addUser}>
          <box-icon name='user-plus' color="#fff"></box-icon>
          Agregar Usuario
        </Button>
      </div>
      <table className="mt-10">
        <thead className="text-left border-b border-sky-800">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-400 after:m-7">
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
          {/* <tr className="border-b border-gray-400 p-7 after:m-7">
            <td>Juan</td>
            <td>Perez</td>
            <td>juan@perez.com</td>
            <td>Recepcionista</td>
          </tr>
          <tr className="">
            <td>Juan</td>
            <td>Perez</td>
            <td>juan@perez.com</td>
            <td>Recepcionista</td>
          </tr>
          <tr className="">
            <td>Juan</td>
            <td>Perez</td>
            <td>juan@perez.com</td>
            <td>Recepcionista</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default UsersSettings;
