import React, { useState } from 'react';

function IncapacityForm({ employeeId, onSave }) {
  const [type, setType] = useState('Incapacidad'); // Tipo: Incapacidad o Permiso
  const [date, setDate] = useState('');
  const [justification, setJustification] = useState('');

  const handleSave = () => {
    if (!date || !justification) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Obtener datos actuales del usuario desde localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Actualizar la lista de usuarios
    const updatedUsers = users.map(user => {
      if (user.id === employeeId) {
        // Inicializar el campo 'incapacities' si no existe
        user.incapacities = user.incapacities || [];
        user.incapacities.push({ type, date, justification });
      }
      return user;
    });

    // Guardar los usuarios con los registros de incapacidades actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Incapacidad registrada exitosamente.');
    onSave(); // Notifica al componente padre para refrescar la lista de incapacidades
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>Registrar {type}</h3>
      <select 
        value={type} 
        onChange={e => setType(e.target.value)} 
        style={styles.select}
      >
        <option value="Incapacidad">Incapacidad</option>
        <option value="Permiso">Permiso</option>
      </select>
      <input 
        type="date" 
        value={date} 
        onChange={e => setDate(e.target.value)} 
        style={styles.inputDate} 
      />
      <textarea 
        value={justification} 
        onChange={e => setJustification(e.target.value)} 
        placeholder="Justificación médica"
        style={styles.textarea}
      />
      <button onClick={handleSave} style={styles.saveButton}>Guardar Registro</button>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: '50px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px 300px',
  },
  formTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  select: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    fontSize: '16px',
  },
  inputDate: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    height: '100px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    fontSize: '16px',
    resize: 'none',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'block',
    width: '100%',
  },
};

export default IncapacityForm;
