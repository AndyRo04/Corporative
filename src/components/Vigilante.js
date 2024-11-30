import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Vigilante.css';  // Importa el archivo CSS
import logo from './logo.png';  // Asegúrate de que la ruta sea correcta

function Vigilante() {
  const navigate = useNavigate();
  
  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null); // Historial en listado general
  const [expandedSearchUserId, setExpandedSearchUserId] = useState(null); // Historial en búsqueda

  // Obtener usuarios del localStorage
  const getUsersFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  };

  // Cargar todos los usuarios al inicio
  useEffect(() => {
    const users = getUsersFromLocalStorage();
    setAllEmployees(users);
  }, []);

  // Función de búsqueda
  const handleSearch = () => {
    const users = getUsersFromLocalStorage();
    if (!searchTerm) {
      setFilteredEmployees([]);
      return;
    }

    const result = users.filter(user => {
        const usernameMatch = user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const documentIdMatch = user.documentId && user.documentId.includes(searchTerm);
        return usernameMatch || documentIdMatch;
    });

    setFilteredEmployees(result);
  };

  // Función de registro de entrada
  const registerEntry = (username) => {
    const users = getUsersFromLocalStorage();
    const currentTime = new Date().toLocaleString();

    const updatedUsers = users.map(user => {
      if (user.username === username) {
        if (!user.attendance) user.attendance = [];
        user.attendance.push({ entryTime: currentTime });
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`Entrada registrada para ${username}`);
    updateAllEmployees();
  };

  // Función de registro de salida
  const registerExit = (username) => {
    const users = getUsersFromLocalStorage();
    const currentTime = new Date().toLocaleString();

    const updatedUsers = users.map(user => {
      if (user.username === username) {
        if (!user.attendance) user.attendance = [];
        const lastEntry = user.attendance[user.attendance.length - 1];
        if (lastEntry && !lastEntry.exitTime) {
          lastEntry.exitTime = currentTime;
        } else {
          alert(`No hay entrada registrada para registrar la salida de ${username}`);
        }
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`Salida registrada para ${username}`);
    updateAllEmployees();
  };

  // Actualizar listado de todos los usuarios
  const updateAllEmployees = () => {
    const users = getUsersFromLocalStorage();
    setAllEmployees(users);
    handleSearch();  // Refrescar búsqueda actual
  };

  // Función para cerrar sesión
  const logout = () => {
    navigate('/');
  };

  // Función para verificar si hay registro del día
  const hasTodayRecord = (attendance) => {
    const today = new Date().toLocaleDateString();
    return attendance && attendance.some(entry => entry.entryTime.includes(today));
  };

  return (
    <div>
      <div className="container-fluid p-0">
        {/* Encabezado con logo y botón de cerrar sesión */}
        <header className="header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Vigilante - Control de Acceso</h1>
          <button onClick={logout} className="btn btn-danger btn-sm">Cerrar Sesión</button>
        </header>
      </div>

      {/* Formulario de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o documento"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Resultados de búsqueda */}
      <div className="employee-list">
        <h2>Empleados Encontrados</h2>
        {filteredEmployees.length > 0 ? (
          <ul>
            {filteredEmployees.map(employee => (
              <li key={employee.id}>
                <strong>{employee.name}</strong> - {employee.documentId} - <em>{employee.area}</em>
                
                {/* Agrupar los botones en un contenedor para aplicar el estilo */}
                <div className="button-group">
                  <button onClick={() => registerEntry(employee.username)}>Registrar Entrada</button>
                  <button onClick={() => registerExit(employee.username)}>Registrar Salida</button>
                  <button onClick={() => setExpandedSearchUserId(expandedSearchUserId === employee.id ? null : employee.id)}>
                    {expandedSearchUserId === employee.id ? 'Ocultar Historial' : 'Ver Historial'}
                  </button>
                </div>
                
                {expandedSearchUserId === employee.id && (
                  <ul className="history-list">
                    {employee.attendance && employee.attendance.length > 0 ? (
                      hasTodayRecord(employee.attendance) ? (
                        employee.attendance.map((entry, index) => (
                          <li key={index}>
                            Entrada: {entry.entryTime} {entry.exitTime ? `- Salida: ${entry.exitTime}` : ' - Salida pendiente'}
                          </li>
                        ))
                      ) : (
                        <li>No hay registros para hoy.</li>
                      )
                    ) : (
                      <li>No hay registros de entrada.</li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron empleados.</p>
        )}
      </div>

      {/* Listado general de empleados */}
      <div className="general-list">
        <h2>Listado General de Empleados</h2>
        {allEmployees.length > 0 ? (
          <ul>
            {allEmployees.map(employee => (
              <div key={employee.id}>
                <strong>{employee.name}</strong> - {employee.documentId} - <em>{employee.area}</em>
                
                {/* Mostrar directamente el historial */}
                <ul className="history-list">
                  {employee.attendance && employee.attendance.length > 0 ? (
                    hasTodayRecord(employee.attendance) ? (
                      employee.attendance.map((entry, index) => (
                        <li key={index}>
                          Entrada: {entry.entryTime} {entry.exitTime ? `- Salida: ${entry.exitTime}` : ' - Salida pendiente'}
                        </li>
                      ))
                    ) : (
                      <li>No hay registros para hoy.</li>
                    )
                  ) : (
                    <li>No hay registros de entrada.</li>
                  )}
                </ul>
              </div>
            ))}
          </ul>
        ) : (
          <p>No hay empleados registrados.</p>
        )}
      </div>
    </div>
  );
}

export default Vigilante;
