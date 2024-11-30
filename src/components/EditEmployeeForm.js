import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEmployeeForm.css' 

function EditEmployeeForm() {
  const { employeeId } = useParams();  // Obtenemos el ID del empleado desde la URL
  const navigate = useNavigate();  // Usamos navigate para redirigir después de editar

  // Estado para almacenar la información del empleado
  const [employee, setEmployee] = useState({
    username: '',
    password: '',
    name: '',
    edad: '',
    area: '',
    role: ''
  });

  // Cargar la información del empleado desde el localStorage
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('users')) || [];
    const employeeToEdit = storedEmployees.find(emp => emp.id === parseInt(employeeId));
    
    if (employeeToEdit) {
      setEmployee(employeeToEdit);  // Establecemos la información del empleado en el estado
    } else {
      console.error('Empleado no encontrado');
    }
  }, [employeeId]);

  // Manejar el cambio de valor en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  // Guardar los cambios en el empleado
  const handleSave = () => {
    const storedEmployees = JSON.parse(localStorage.getItem('users')) || [];
    const updatedEmployees = storedEmployees.map(emp => 
      emp.id === parseInt(employeeId) ? { ...emp, ...employee } : emp
    );
    
    localStorage.setItem('users', JSON.stringify(updatedEmployees));  // Actualizamos el localStorage
    navigate('/admin/edit');  // Redirigimos de vuelta a la lista de empleados
  };

  return (
    <div>
      <h2>Editar Empleado</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={employee.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={employee.edad}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            id="area"
            name="area"
            value={employee.area}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={employee.role}
            onChange={handleChange}
          />
        </div>

        <button type="button" onClick={handleSave}>Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditEmployeeForm;
