<<<<<<< HEAD
import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from './logo.png'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('employeeId', user.id);

      switch (user.role) {
        case 'empleado':
          window.location.href = '/empleado';
          break;
        case 'vigilante':
          window.location.href = '/vigilante';
          break;
        case 'administrador':
          window.location.href = '/admin';
          break;
        default:
          alert('Rol no encontrado');
      }
    } else {
      alert('Credenciales incorrectas');
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { obtenerUsuarios } from "../data/LocalStorageData"; // Importa la función para obtener usuarios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Define las rutas personalizadas por rol
  const rutasPorRol = {
    admin: '/panel-admin',
    empleado: '/dashboard-empleado',
    vigilante: '/HistorialIngreso',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarios = obtenerUsuarios(); // Obtiene los usuarios desde localStorage

    // Buscar si las credenciales coinciden
    const usuarioValido = usuarios.find(
      (user) => user.correo === email && user.password === password
    );

    if (usuarioValido) {
      // Si el usuario existe, almacena la información en localStorage
      localStorage.setItem("role", usuarioValido.rol);
      localStorage.setItem("isLoggedIn", "true");

      // Redirige a la ruta específica según el rol del usuario
      navigate(rutasPorRol[usuarioValido.rol]);
    } else {
      // Muestra un mensaje de error si las credenciales son incorrectas
      setError("Correo o contraseña incorrectos");
>>>>>>> e3c327cb09937da442dc8f8980e9b818841af581
    }
  };

  return (
<<<<<<< HEAD
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={logo} alt="Login" />
      </div>
      <h2 className={styles.title}>Inicio de Sesión</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>Usuario:</label>
        <input 
          type="text" 
          className={styles.input} 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Contraseña:</label>
        <input 
          type="password" 
          className={styles.input} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button className={styles.button} onClick={handleLogin}>
        Iniciar Sesión
      </button>
=======
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
      <footer>
        <p>&copy; 2024 - Tu Aplicación</p>
      </footer>
>>>>>>> e3c327cb09937da442dc8f8980e9b818841af581
    </div>
  );
};

export default Login;
