import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Stats() {
  const [earlyEmployees, setEarlyEmployees] = useState([]);
  const [lateEmployees, setLateEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // Función para convertir la fecha local a objeto Date
  function parseLocalDateTime(dateString) {
    try {
      dateString = dateString.replace(/\s+/g, ' ').trim();
      const [datePart, timePart] = dateString.split(', ');
      const [day, month, year] = datePart.split('/');
      let [time, period] = timePart.split(' ');
      period = period.toLowerCase().includes('p') ? 'PM' : 'AM';
      let [hours, minutes, seconds] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      const isoString = `${year}-${month}-${day}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      return new Date(isoString);
    } catch (error) {
      console.error("Error al parsear fecha:", error, dateString);
      return NaN;
    }
  }

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('users')) || [];
    const earlyArrivals = [];
    const lateArrivals = [];
    const today = new Date().toLocaleDateString(); 

    storedEmployees.forEach(user => {
      if (user.attendance && user.attendance.length > 0) {
        const lastEntry = user.attendance[user.attendance.length - 1];
        const entryTime = parseLocalDateTime(lastEntry.entryTime);

        if (!isNaN(entryTime) && entryTime.toLocaleDateString() === today) {
          const hours = entryTime.getHours();
          const minutes = entryTime.getMinutes();

          if (hours === 7 && minutes <= 30) {
            earlyArrivals.push(user);
          } else {
            lateArrivals.push(user);
          }
        }
      }
    });

    setEarlyEmployees(earlyArrivals);
    setLateEmployees(lateArrivals);

    // Datos para gráfico de línea
    const dailyAttendance = storedEmployees.map(user => {
      return {
        name: user.name,
        entries: user.attendance.map(entry => parseLocalDateTime(entry.entryTime))
      };
    });

    setAttendanceData(dailyAttendance);
  }, []);

  // Datos para gráfico de pastel (entradas a tiempo vs tardías)
  const pieChartData = {
    labels: ['Entradas a tiempo', 'Entradas tardías'],
    datasets: [{
      data: [earlyEmployees.length, lateEmployees.length],
      backgroundColor: ['#36a2eb', '#ff6384'],
    }],
  };

  // Datos para gráfico de líneas (entradas a lo largo del día)
  const lineChartData = {
    labels: attendanceData.map(data => data.name), // Nombres de empleados
    datasets: [{
      label: 'Entradas a lo largo del día',
      data: attendanceData.map(data => data.entries.length), // Número de entradas por empleado
      fill: false,
      borderColor: '#36a2eb',
      tension: 0.1,
    }],
  };

  return (
    <div>
      <h2>Estadísticas de Entrada de Empleados</h2>

      <h3>Entradas entre 7:00 y 7:30 AM:</h3>
      {earlyEmployees.length > 0 ? (
        <ul>
          {earlyEmployees.map((employee, index) => {
            const lastEntry = employee.attendance[employee.attendance.length - 1];
            const entryTime = parseLocalDateTime(lastEntry.entryTime); // Usamos tu función de parseo
            return (
              <li key={index}>
                {employee.name} - {entryTime instanceof Date && !isNaN(entryTime) ? entryTime.toLocaleString() : "Fecha inválida"}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No se registraron entradas entre 7:00 y 7:30 AM.</p>
      )}

      <h3>Entradas después de las 7:30 AM:</h3>
      {lateEmployees.length > 0 ? (
        <ul>
          {lateEmployees.map((employee, index) => {
            const lastEntry = employee.attendance[employee.attendance.length - 1];
            const entryTime = parseLocalDateTime(lastEntry.entryTime);
            return (
              <li key={index}>
                {employee.name} - {entryTime instanceof Date && !isNaN(entryTime) ? entryTime.toLocaleString() : "Fecha inválida"}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No se registraron entradas después de las 7:30 AM.</p>
      )}



      <div>
        <h3 className="text-center">Distribución de Entradas: A Tiempo vs Tardías</h3>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}> {/* Contenedor centrado */}
          <Pie data={pieChartData} />
        </div>
      </div>

      <div>
        <h3 className="text-center">Entradas a lo largo del Día</h3>
        <div style={{ maxWidth: '800px', marginLeft: '20%' }}> {/* Contenedor centrado */}
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
