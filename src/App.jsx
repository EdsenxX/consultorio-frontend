// Dependencie
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "boxicons";
// Components
import Login from "./pages/Login";
import Citas from "./pages/Citas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Citas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
