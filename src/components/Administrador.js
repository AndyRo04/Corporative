import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'; 
import './Administrador.css'; // Estilos personalizados


function Administrador() {
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
  };
  return (
    <div className="container-fluid p-0">
      {/* Encabezado con logo y botón de cerrar sesión */}
      <header className="bg-primary text-white p-3 d-flex align-items-center justify-content-between">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="mb-0 flex-grow-1 text-center">Panel de Administración</h1>
        <button onClick={logout} className="btn btn-danger btn-sm">Cerrar Sesión</button>
      </header>


      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/empleados">Reporte Empleados</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/register">Registrar Empleado</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/stats">Estadísticas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/edit">Editar Empleado</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido dinámico de las rutas hijas */}
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Administrador;
