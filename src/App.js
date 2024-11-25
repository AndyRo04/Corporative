import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import EmpleadoPage from "./pages/EmpleadoPage";
import HistorialIngreso from "./components/HistorialIngreso";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio: siempre mostrará el Login primero */}
        <Route path="/" element={<Login />} />

        {/* Rutas individuales para cada rol */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/empleado" element={<EmpleadoPage />} />
        <Route path="/HistorialIngreso" element={<HistorialIngreso />} />
        <Route path="/home" element={<HomePage />} />

        {/* Redirigir rutas no encontradas al Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
