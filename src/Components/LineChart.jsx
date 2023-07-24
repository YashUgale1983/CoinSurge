import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title
)

const LineChart=({coinHistory, currentPrice, coinName})=>{
    const coinPrice =[];
    const coinTimestamp =[];

    for(let i=0; i < coinHistory?.data?.history?.length; i++){
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = coinHistory?.data?.history.length - 1; i >= 0; i--) {
        const timestamp = coinHistory?.data?.history[i].timestamp;
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        coinTimestamp.push(date.toLocaleDateString());
      }
    
    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#854ebc',
            borderColor: 'blue',
          },
        ],
      };

      const options = {
        scales: {
          y: {
                ticks:{
                    beginAtZero: true
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: true, // Set this to true to display the legend
              labels: {
                color: 'blue', // Change the text color of the legend
              },
            },
        },
      };

    return(
        <>
        <div className="h-[300px] w-[300px] md:h-[400px] md:w-[680px] lg:h-[500px] lg:w-[1050px] mx-auto bg-white">
        <Line data={data} options={options} />
        </div>
        </>
       
    )
}

export default LineChart;
