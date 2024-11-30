import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EditEmployee.css';

function EditEmployee() {
  const [employees, setEmployees] = useState([]);

  // Cargar empleados desde localStorage
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('users')) || [];
    setEmployees(storedEmployees);
  }, []);

  // Función para manejar la eliminación de un empleado
  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees); // Actualiza el estado después de eliminar
  };

  return (
    <div>
      <h2>Editar Empleado</h2>
      <ul>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - {employee.role} - {employee.area}
              <div className="buttons-container">
                <Link to={`/admin/edit/${employee.id}`}>
                  <button className="edit-button">Editar</button>
                </Link>
                <button 
                  className="delete-button" 
                  onClick={() => handleDelete(employee.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No hay empleados registrados</li>
        )}
      </ul>
    </div>
  );
}

export default EditEmployee;
