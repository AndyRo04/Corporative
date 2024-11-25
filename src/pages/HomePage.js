import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Importamos los estilos individuales

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido al Sistema de Control de Acceso</h1>
      <Link to="/historial-ingreso">
        <button>Ver Historial de Ingresos</button>
      </Link>
    </div>
  );
};

export default HomePage;
