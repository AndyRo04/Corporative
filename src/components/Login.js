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
    }
  };

  return (
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
    </div>
  );
};

export default Login;
