import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los elementos de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Datos para el gráfico de línea (entradas por hora)
const data = {
  labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'], // Horas del día
  datasets: [
    {
      label: 'Entradas por hora', // Etiqueta del gráfico
      data: [5, 10, 7, 6, 4, 3, 9, 14, 15, 12], // Número de entradas por cada hora
      borderColor: '#36A2EB', // Color de la línea
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo de la línea
      fill: true, // Rellenar el área bajo la línea
      tension: 0.4, // Suavizado de la línea
    },
  ],
};

// Opciones del gráfico
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Tendencias de Entradas por Hora',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Hora del día',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Número de Entradas',
      },
      min: 0, // Mínimo valor en el eje Y
    },
  },
};

const EstadisticasLineChart = () => {
  return (
    <div>
      <h3>Entradas por Hora</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default EstadisticasLineChart;
