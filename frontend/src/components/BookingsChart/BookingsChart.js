import React from 'react';
import { Bar } from 'react-chartjs'

const BOOKINGS_BUCKETS = {
  cheap: {
    min:0,
    max: 100
  },
  normal: {
    min:100,
    max: 200
  },
  expensive: {
    min:200,
    max: 1000000
  }
}

const BookingsChart = ({bookingsList}) => {

  const chartData = {labels:[], datasets:[]}
  let values = []
  for (let bucket in BOOKINGS_BUCKETS) {
    let nEvents = bookingsList.reduce((prev, curr)=>{
      if(curr.event.price >= BOOKINGS_BUCKETS[bucket].min 
        && curr.event.price < BOOKINGS_BUCKETS[bucket].max){
        return prev+1
      }
      else {
        return prev
      }
    },0)
    values.push(nEvents)
    chartData.labels.push(bucket)
    chartData.datasets.push({
      // label: "My First dataset",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: [...values]
    })
    values[values.length-1] = 0
  }

  return (
    <div style={{textAlign:'center'}}>
      <Bar data={chartData}/>
    </div>
  );
};

export default BookingsChart;