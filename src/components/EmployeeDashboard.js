import React, { useState, useEffect } from 'react';
import IncapacityForm from './IncapacityForm';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeeDashboard.module.css';  // Importa los estilos como módulo
import logo from './logo.png';  // Asegúrate de tener tu logo en la ruta correcta

function EmployeeDashboard() {
  const [employeeData, setEmployeeData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    
    if (employeeId) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const employee = users.find(user => user.id === parseInt(employeeId));

      if (employee) {
        setEmployeeData(employee);
      } else {
        console.log('Empleado no encontrado.');
      }
    } else {
      console.log('No se ha encontrado el ID del empleado.');
      navigate('/');  // Redirigir al login si no hay ID
    }
  }, []);

  const handleRefresh = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const employeeId = localStorage.getItem('employeeId');
    const employee = users.find(user => user.id === parseInt(employeeId));
    setEmployeeData(employee || {});
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('employeeId');
    navigate('/');  // Redirigir al login
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Panel De Empleado</h1>
        <button onClick={handleLogout} className={styles.btnLogout}>Cerrar Sesión</button>
      </header>

      <div className={styles.dashboardContainer}>
        <h2>Bienvenido, {employeeData.name || 'Empleado'}</h2>

        <div className={styles.buttonsContainer}>
          <button onClick={() => setShowForm(!showForm)} className={styles.btnAction}>
            {showForm ? 'Ocultar Formulario' : 'Registrar Incapacidad/Permiso'}
          </button>
        </div>

        {showForm && <IncapacityForm employeeId={employeeData.id} onSave={handleRefresh} />}

        <div className={styles.historySection}>
          <h3>Historial de Incapacidades/Permisos</h3>
          {employeeData.incapacities && employeeData.incapacities.length > 0 ? (
            <ul>
              {employeeData.incapacities.map((record, index) => (
                <li key={index} className={styles.historyItem}>
                  <span className={styles.historyDate}>{record.date}</span> - 
                  <span className={styles.historyType}>{record.type}</span>: 
                  <span className={styles.historyJustification}>{record.justification}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay registros disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
