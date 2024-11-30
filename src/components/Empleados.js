import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function Empleados() {
  const [employees, setEmployees] = useState([]);
  const [areaFilter, setAreaFilter] = useState('');

  useEffect(() => {
    const employeesData = JSON.parse(localStorage.getItem('users')) || [];
    setEmployees(employeesData);
  }, []);

  const generateExcel = () => {
    const filteredEmployees = areaFilter
      ? employees.filter(employee => employee.area === areaFilter)
      : employees;

    // Seleccionamos solo los campos necesarios
    const employeesToExport = filteredEmployees.map(employee => ({
      username: employee.username,
      role: employee.role,
      name: employee.name,
      edad: employee.edad,
      documentId: employee.documentId,
      area: employee.area
    }));

    // Convertimos los datos seleccionados a una hoja de Excel
    const ws = XLSX.utils.json_to_sheet(employeesToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Empleados');
    XLSX.writeFile(wb, 'Listado_Empleados.xlsx');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Reporte Por Area</h2>
      <button style={styles.button} onClick={generateExcel}>Generar Excel</button>
      <select style={styles.select} onChange={e => setAreaFilter(e.target.value)} value={areaFilter}>
        <option value="">Todos los empleados</option>
        <option value="Ventas">Ventas</option>
        <option value="Dirección">Dirección</option>
        <option value="Producción">Producción</option>
        <option value="Finanzas">Finanzas</option>
        <option value="Marketing">Marketing</option>
        <option value="Logística">Logística</option>
        <option value="Servicio al Cliente">Servicio al Cliente</option>
        {/* Agregar otras áreas según sea necesario */}
      </select>
      <ul style={styles.list}>
        {employees.map(employee => (
          <li key={employee.id} style={styles.listItem}>
            {employee.name} - {employee.area}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '20px 250px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  header: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '15px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    margin: '20px 150px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  select: {
    padding: '10px',
    borderRadius: '15px',
    border: '1px solid #ccc',
    margin: '20px 220px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
    fontSize: '16px',
  },
  list: {
    listStyleType: 'none',
    margin: '20px 100px',
    padding: '5px',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '15px',
    margin: '10px 5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default Empleados;
