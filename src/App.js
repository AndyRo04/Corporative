<<<<<<< HEAD
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Vigilante from './components/Vigilante';
import EmployeeDashboard from './components/EmployeeDashboard';
import IncapacityForm from './components/IncapacityForm';
import Administrador from './components/Administrador';
import RegisterEmployee from './components/RegisterEmployee';
import EditEmployee from './components/EditEmployee';
import Stats from './components/Stats';
import Empleados from './components/Empleados';
import EditEmployeeForm from './components/EditEmployeeForm';

function App() {
  useEffect(() => {
    // Verifica si los usuarios ya están en localStorage
    if (!localStorage.getItem('users')) {
      const users = [
        {
          id: 1,
          username: 'Fangarita',
          password: '1234',
          role: 'empleado',
          name: 'Andres Angarita',  // Campo adicional
          documentId: '1031542159',  // Campo adicional
          edad: 30,  // Campo adicional
          area: 'Acondicionamiento',  // Campo adicional
          attendance: [
            
          ],  
          incapacities: [
            {
              type: "Incapacidad",
              date: "2024-09-20",
              justification: "Reposo médico por gripe."
            }
          ],  
          permissions: []  // Permisos
        },
        {
          id: 2,
          username: 'JonaVac',
          password: '5678',
          role: 'vigilante',
          name: 'Jonathan Vaca',  // Campo adicional
          documentId: '1022542132',  // Campo adicional
          edad: 40,  // Campo adicional
          area: 'Seguridad',  // Campo adicional
          attendance: [
    
          ]  
        },
        {
          id: 3,
          username: 'AndyRo',
          password: 'admin',
          role: 'administrador',
          name: 'Andres Roa',
          documentId: "1022942159",
          edad: 35,
          area: 'Recursos Humanos',
          attendance: [
           
          ]
        }
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rutas para el Administrador */}
        <Route path="/admin" element={<Administrador />}>
          <Route path="empleados" element={<Empleados />} />
          <Route path="register" element={<RegisterEmployee />} />
          <Route path="edit" element={<EditEmployee />} /> {/* Ruta para editar empleados */}
          <Route path="edit/:employeeId" element={<EditEmployeeForm />} /> {/* Ruta para editar un empleado específico */}
          <Route path="stats" element={<Stats />} />
        </Route>
        
        {/* Ruta para el Login */}
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        {/* Rutas para otros roles */}
        <Route path="/IncapacityForm" element={<IncapacityForm />} />
        <Route path="/empleado" element={<EmployeeDashboard />} />
        <Route path="/vigilante" element={<Vigilante />} />
      </Routes>
      {/* Botón para restablecer el localStorage */}
      <ResetLocalStorageButton />
=======
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
>>>>>>> e3c327cb09937da442dc8f8980e9b818841af581
    </Router>
  );
}

<<<<<<< HEAD
function ResetLocalStorageButton() {
  const handleReset = () => {
    localStorage.clear(); // Borra todos los datos del localStorage
    window.location.reload(); // Recarga la página para aplicar los cambios
  };

  return (
    <button 
      onClick={handleReset} 
      style={{
        position: 'fixed', // Mantiene el botón visible siempre
        bottom: '10px',
        right: '10px',
        padding: '10px 15px',
        backgroundColor: '#ff4d4f',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Resetear LocalStorage
    </button>
  );
}

=======
>>>>>>> e3c327cb09937da442dc8f8980e9b818841af581
export default App;
