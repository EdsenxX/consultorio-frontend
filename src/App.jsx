// Dependencie
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "boxicons";
// Components
import Login from "./pages/Login";
import Citas from "./pages/Citas";
import Cita from "./pages/Cita";
import AllCitas from "./pages/AllCitas";
import Settings from "./pages/Settings";
// Redux
import { connect } from "react-redux";
import * as authActions from "./actions/authActions";

function App(props) {

  useEffect(() => {
    if (!props.authReducer.login) {
      props.setLogin();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Citas />} />
        <Route path="/all" element={<AllCitas />} />
        <Route path="/citas/new" element={<Cita />} />
        <Route path="/citas/show/:id" element={<Cita />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ authReducer }) => ({
  authReducer,
});

export default connect(mapStateToProps, authActions)(App);
