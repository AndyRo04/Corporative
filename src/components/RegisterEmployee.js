import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Usaremos useNavigate para redirigir después del registro

function RegisterEmployee() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [edad, setEdad] = useState('');
  const [area, setArea] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();  // Navegación después de registrar

  // Función para manejar el registro del nuevo empleado
  const handleSubmit = () => {
    // Validar que los campos no estén vacíos
    if (!username || !password || !name || !edad || !area || !role) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Crear un nuevo empleado con un ID aleatorio
    const newEmployee = { 
      id: Math.floor(Math.random() * 1000000),  // Generamos un ID aleatorio
      username, 
      password, 
      name, 
      edad, 
      area, 
      role 
    };

    // Obtener los empleados existentes desde localStorage
    const employees = JSON.parse(localStorage.getItem('users')) || [];
    
    // Agregar el nuevo empleado a la lista
    employees.push(newEmployee);

    // Guardar los empleados actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(employees));

    // Redirigir a la lista de empleados después de registrar
    alert('Empleado registrado con éxito');
    navigate('/admin/empleados');  // Redirige al panel de empleados
  };

  return (
    <div>
      <h2>Registrar Empleado</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Nombre" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="number" 
            placeholder="Edad" 
            value={edad} 
            onChange={(e) => setEdad(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Área" 
            value={area} 
            onChange={(e) => setArea(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Rol" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
          />
        </div>
        <button type="button" onClick={handleSubmit}>Registrar</button>
      </form>
    </div>
  );
}

export default RegisterEmployee;
