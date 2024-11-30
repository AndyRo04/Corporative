// Función para inicializar el historial de ingreso con datos de prueba
export const obtenerHistorialIngreso = () => {
    const datosIniciales = [
      { nombre: 'Juan Pérez', apellido: 'Gómez', horaEntrada: '07:15', horaSalida: '17:30', fecha: '2024-08-20' },
      { nombre: 'Ana Gómez', apellido: 'Martínez', horaEntrada: '09:30', horaSalida: '17:30', fecha: '2024-08-20' },
      { nombre: 'Luis Torres', apellido: 'Ramírez', horaEntrada: '18:00', horaSalida: '18:30', fecha: '2024-08-20' }, // Fuera del horario laboral
    ];
  
    // Guardar en localStorage si no existen
    if (!localStorage.getItem('historialIngreso')) {
      localStorage.setItem('historialIngreso', JSON.stringify(datosIniciales));
    }
  
    return JSON.parse(localStorage.getItem('historialIngreso')) || [];
  };
  
  // Función para agregar un nuevo ingreso
  export const agregarIngreso = (nuevoIngreso) => {
    const historial = obtenerHistorialIngreso();
    historial.push(nuevoIngreso);
    localStorage.setItem('historialIngreso', JSON.stringify(historial));
  };
 //  localStorage.clear();

  // Función para obtener la lista de usuarios
  export const obtenerUsuarios = () => {
    const usuariosIniciales = [
      { nombre: 'Juan', apellido: 'Pérez', edad: 30, rol: 'admin', correo: 'juan@example.com', password: 'admin123' },
      { nombre: 'Ana', apellido: 'Gómez', edad: 25, rol: 'empleado', correo: 'ana@example.com', password: 'user123' },
      { nombre: 'Felipe', apellido: 'Ruiz', edad: 18, rol: 'vigilante', correo: 'fel@example.com', password: 'vigi123' },
    ];
  
    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
    }
  
    return JSON.parse(localStorage.getItem('usuarios')) || [];
  };
  
  // Función para agregar un nuevo usuario
  export const agregarUsuario = (nuevoUsuario) => {
    const usuarios = obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  };
  
  // Función para obtener incapacidades o justificaciones de un usuario
  export const obtenerIncapacidades = () => {
    const incapacidadesIniciales = [
      { nombre: 'Juan Pérez', tipo: 'Incapacidad', motivo: 'Enfermedad', fecha: '2024-08-19' },
      { nombre: 'Ana Gómez', tipo: 'Permiso', motivo: 'Cita médica', fecha: '2024-08-18' },
    ];
  
    if (!localStorage.getItem('incapacidades')) {
      localStorage.setItem('incapacidades', JSON.stringify(incapacidadesIniciales));
    }
  
    return JSON.parse(localStorage.getItem('incapacidades')) || [];
  };
  
  // Función para agregar una nueva incapacidad o justificación
  export const agregarIncapacidad = (nuevaIncapacidad) => {
    const incapacidades = obtenerIncapacidades();
    incapacidades.push(nuevaIncapacidad);
    localStorage.setItem('incapacidades', JSON.stringify(incapacidades));
  };
  