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
    }
  };

  return (
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
    </div>
  );
};

export default Login;
