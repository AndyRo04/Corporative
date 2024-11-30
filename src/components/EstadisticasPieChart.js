import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los elementos de ChartJS
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

// Datos para el gráfico circular
const data = {
  labels: ['Entradas a tiempo', 'Entradas tardías'], // Las categorías
  datasets: [
    {
      data: [80, 20], // Porcentaje de entradas a tiempo y tardías
      backgroundColor: ['#36A2EB', '#FF6384'], // Colores de los segmentos
      hoverBackgroundColor: ['#36A2EB', '#FF6384'], // Colores al pasar el mouse
    },
  ],
};

// Opciones del gráfico
const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Distribución de Entradas: A Tiempo vs Tardías',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
};

const EstadisticasPieChart = () => {
  return (
    <div>
      <h3>Entradas a tiempo vs Tardías</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default EstadisticasPieChart;
