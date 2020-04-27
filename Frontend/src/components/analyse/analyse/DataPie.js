import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

class DataPie extends Component {
  constructor(props){
    super(props)
    this.state = {
      result:"",
    }
  }

  componentDidMount () {
    const surveyId = this.props.surveyId;
    axios.get(`/analyse/find/` + surveyId)
      .then(response => {
          this.setState({
              result:response.data[0].preProcess,
          })                           
          console.log(this.state.result)
      })
      .catch((error) => {
          console.log(error);
      })
  }

  getDataPie(){
    let dataPie=[]
    if(this.state.result){
      for(let i=0; i<this.state.result.length; i++){
        let topic=""
        let choices=[]
        let select=[]
        if(this.state.result[i].title){
          topic = this.state.result[i].title
        }else{
          topic = this.state.result[i].name
        }

        for(let j=0; j<this.state.result[i].choicesArray.length; j++){
          choices.push(this.state.result[i].choicesArray[j].text)
          select.push(this.state.result[i].choicesArray[j].select)
        }
        
        let data = {
          labels: choices,
          datasets: [{
              data: select,
              backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#69ff6c',
              '#ffb27a',
              '#9fb27a',
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
        dataPie.push(
          <div style={{ margin: '5%' }}>
            <h3>{i+1}.{topic}</h3>
            <Pie data={data} height={80}/>
          </div>
        )
      }
    }
    return dataPie
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
            {this.state.result ? this.getDataPie() : <h2><i className="fa fa-ban" /> ยังไม่มีการตอบแบบสอบถามขณะนี้</h2>}
        </div>
    );
  }
}
  export default DataPie