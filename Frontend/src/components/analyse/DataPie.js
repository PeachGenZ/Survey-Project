import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

class DataPie extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const data = {
        labels: [
            'น้อยที่สุด',
            'น้อย',
            'ปานกลาง',
            'มาก',
            'มากที่สุด'
        ],
        datasets: [{
            data: [10, 15, 22, 23,30],
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
          'น้อยที่สุด',
          'น้อย',
          'ปานกลาง',
          'มาก',
          'มากที่สุด'
      ],
      datasets: [{
          data: [10, 30, 30, 10, 20],
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
    const data3 = {
      labels: [
          'น้อยที่สุด',
          'น้อย',
          'ปานกลาง',
          'มาก',
          'มากที่สุด'
      ],
      datasets: [{
          data: [20, 20, 20, 20, 20],
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
    const data4 = {
      labels: [
          'น้อยที่สุด',
          'น้อย',
          'ปานกลาง',
          'มาก',
          'มากที่สุด'
      ],
      datasets: [{
          data: [50, 10, 20, 10, 10],
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
    const data5 = {
      labels: [
          'น้อยที่สุด',
          'น้อย',
          'ปานกลาง',
          'มาก',
          'มากที่สุด'
      ],
      datasets: [{
          data: [5, 5, 30, 20, 40],
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
    const data6 = {
      labels: [
          'น้อยที่สุด',
          'น้อย',
          'ปานกลาง',
          'มาก',
          'มากที่สุด'
      ],
      datasets: [{
          data: [0, 0, 10, 30, 60],
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
    const data7 = {
      labels: [
          'น้อยที่สุด',
          'น้อย',
          'ปานกลาง',
          'มาก',
          'มากที่สุด'
      ],
      datasets: [{
          data: [20, 10, 25, 25, 20],
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
            <h3>มีรสชาติที่ถูกปาก</h3>
            <Pie data={data} 
              height={80}/>
            <h3 style={{ marginTop: '5%' }}>มีบรรจุภัณฑ์ที่สวยงาม</h3>
            <Pie data={data1} height={80}/>
            <h3 style={{ marginTop: '5%' }}>ดื่มได้สะดวกทันทีตามความต้องการ</h3>
            <Pie data={data2} height={80}/>
            <h3 style={{ marginTop: '5%' }}>พกพาได้โดยสะดวก</h3>
            <Pie data={data3} height={80}/>
            <h3 style={{ marginTop: '5%' }}>สามารถเก็บรักษาได้นาน</h3>
            <Pie data={data4} height={80}/>
            <h3 style={{ marginTop: '5%' }}>เป็นยี่ห้อของคนไทย</h3>
            <Pie data={data5} height={80}/>
            <h3 style={{ marginTop: '5%' }}>ความปลอดภัยในการบริโภค</h3>
            <Pie data={data6} height={80}/>
            <h3 style={{ marginTop: '5%' }}>มีการระบุรายละเอียดที่ชัดเจนบนฉลาก</h3>
            <Pie data={data7} height={80}/>
        </div>
    );
  }
}
  
  export default DataPie