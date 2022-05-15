const UsersSettings = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">Usuarios</h1>
      </div>
      <table className="mt-10">
        <thead className="text-left border-b border-sky-800">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-400 p-7 after:m-7">
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersSettings;
