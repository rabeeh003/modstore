import React from 'react'
import { Chart as ChartJs } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

function AdminHome() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jun", "Jun", "Jun", "Jun", "Jun", "Jun"],
    datasets: [
      {
        label: "Product A",
        data: [20, 30, 40, 50, 60, 70],
        backgroundColor: "#2bed5e",
      },
      {
        label: 'Product B',
        data: [15, 20, 25, 40, 45, 60],
        backgroundColor: '#aae3b9'
      },
    ],
  };

  const data2 = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  return (
    <div className='container max-w-[1050px] m-auto py-4 px-3'>
      <span className='text-xl font-semibold'>Downloads</span>
      <div className='h-full max-h-[40vh] overflow-auto flex justify-center scrollbar-hide'>
        <Bar data={data} />
      </div>
      <br />
      <span className='text-xl font-semibold'>Best of the month</span>
      <div className='h-2/4 max-h-[40vh] overflow-auto flex justify-center scrollbar-hide'>
        <Doughnut data={data2} />
      </div>
      <div className='text-center mt-20'>
        <p>Created by Muhammed Rabeeh pk</p>
      </div>
    </div>
  )
}

export default AdminHome