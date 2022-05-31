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
            <tr key={user._id} className="border-b border-gray-400">
              <td className='p-2'>{user.firstName}</td>
              <td className='p-2'>{user.lastName}</td>
              <td className='p-2'>{user.email}</td>
              <td className='p-2'>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersSettings;
