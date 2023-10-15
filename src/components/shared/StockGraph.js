
import {useState} from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS} from "chart.js/auto"

const LineGraph = ({ data }) => {
    
  const [chartData, setChartData] = useState({
    labels: data.map((item) => item.datetime).reverse(),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map((item) => parseFloat(item.close)),
        fill: false,
        borderColor: 'green',
        borderWidth: 2,
      },
    ],
  })

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Stock Price',
        },
      },
    },
  };

  return (
    <div>
        <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineGraph;
