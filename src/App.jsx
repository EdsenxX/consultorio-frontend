// Dependencie
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "boxicons";
// Components
import Login from "./pages/Login";
import Citas from "./pages/Citas";
import Cita from "./pages/Cita";
import AllCitas from "./pages/AllCitas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Citas />} />
        <Route path="/all" element={<AllCitas />} />
        <Route path="/citas/new" element={<Cita />} />
        <Route path="/citas/show/:id" element={<Cita />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
