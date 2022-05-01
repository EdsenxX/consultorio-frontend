// Dependencie
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
