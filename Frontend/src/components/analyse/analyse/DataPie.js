import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

class DataPie extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const data = {
        labels: [
            'ใช่',
            'ไม่ใช่',
        ],
        datasets: [{
            data: [2,4],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#69ff6c',
            '#ffb27a'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#69ff6c',
            '#ffb27a',
            ]
        }]
    };
    const data1 = {
      labels: [
          'เจ็บคอ',
          'ตัวร้อน',
          'ไม่มีอาการ',
      ],
      datasets: [{
          data: [1,0,5],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#69ff6c',
          '#ffb27a'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#69ff6c',
          '#ffb27a',
          ]
      }]
    };
    const data2 = {
      labels: [
          'น้อยที่สุด',
          'น้อย',
          'ปานกลาง',
          'มาก',
          'มากที่สุด'
      ],
      datasets: [{
          data: [15, 5, 20, 23, 37],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#69ff6c',
          '#ffb27a'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#69ff6c',
          '#ffb27a',
          ]
      }]
    };
    
    return (
        <div className="chart">
            <h3>1.มีไข้</h3>
            <Pie data={data} 
              height={80}/>
            <h3 style={{ marginTop: '5%' }}>2.มีอาการใดบ้าง</h3>
            <Pie data={data1} height={80}/>
        </div>
    );
  }
}
  
  export default DataPie