import React, { useState, useEffect } from 'react';
import { obtenerHistorialIngreso } from '../data/LocalStorageData';
import './HistorialIngreso.css';

const HistorialIngreso = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const datosGuardados = obtenerHistorialIngreso();

    // Filtra los registros dentro del horario laboral
    const registrosLaborales = datosGuardados.filter((registro) => {
      const [hora, minuto] = registro.horaEntrada.split(':').map(Number);
      return (
        (hora > 7 || (hora === 7 && minuto >= 0)) && 
        (hora < 17 || (hora === 17 && minuto <= 30))
      );
    });

    setHistorial(registrosLaborales);
  }, []);

  return (
    <div className="container">
      <h1>Historial de Ingresos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora de Ingreso</th>
            <th>Hora Salida</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((registro, index) => (
            <tr key={index}>
              <td>{registro.nombre}</td>
              <td>{new Date(registro.fecha).toLocaleDateString()}</td>
              <td>{registro.horaEntrada}</td> 
              <td>{registro.horaSalida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialIngreso;
