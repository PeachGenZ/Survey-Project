import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

class Income extends Component {
    constructor(props){
        super(props);
        this.state = {
            answers:"",
        };
    }

    componentDidMount () {
        const surveyId = this.props.surveyId;
        //get ข้อมูลคำถามสำเร็จรูป
        axios.get(`/answers/find/` + surveyId)
        .then(response => {
            this.setState({
                answers:response.data[0].answerUsers,
            })
            //console.log(this.state.answers[0].resultAsString.widgetIncome)
        })
    }
  render(){
    let income1=0
    let income2=0
    let income3=0
    let income4=0
    let income5=0
    let total=0
    let dataIncome=[]
    for (let i = 0; i < this.state.answers.length; i++) {
      if(this.state.answers[i].resultAsString.widgetIncome === 'low5000'){
        income1++
      }
      if(this.state.answers[i].resultAsString.widgetIncome === '5000-10000'){
        income2++
      }
      if(this.state.answers[i].resultAsString.widgetIncome === '10001-20000'){
        income3++
      }
      if(this.state.answers[i].resultAsString.widgetIncome === '20001-30000'){
        income4++
      }
      if(this.state.answers[i].resultAsString.widgetIncome === 'more30000'){
        income5++
      }
    }

    total=income1+income2+income3+income4+income5
    dataIncome.push(
        income1,income2,income3,income4,income5
    )

    const data = {
        labels: ['น้อยกว่า 5,000 บาท', '5,000-10,000 บาท', '10,001-20,000 บาท', '20,001-30,000 บาท', 'มากกว่า 30,000 บาท'],
        datasets: [
          {
            label: 'รายได้เฉลี่ยต่อเดือน',
            backgroundColor: 'rgba(127,0,255,0.5)',
            borderColor: 'rgba(127,0,255,0.7)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(127,0,255,0.8)',
            hoverBorderColor: 'rgba(127,0,255,1)',
            data: dataIncome
          }
        ]
    };

    return (
        <div>
            <div>
                <Bar
                data={data}
                width={100}
                height={300}
                options={{
                    maintainAspectRatio: false
                }}/>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col"><h4>รายได้เฉลี่ยต่อเดือน</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">น้อยกว่า 5,000 บาท</td>
                        <td className="text-center">{income1}</td>
                        <td className="text-center">{((income1/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">5,000-10,000 บาท</td>
                        <td className="text-center">{income2}</td>
                        <td className="text-center">{((income2/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">10,001-20,000 บาท</td>
                        <td className="text-center">{income3}</td>
                        <td className="text-center">{((income3/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">20,001-30,000 บาท</td>
                        <td className="text-center">{income4}</td>
                        <td className="text-center">{((income4/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">มากกว่า 30,000 บาท</td>
                        <td className="text-center">{income5}</td>
                        <td className="text-center">{((income5/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">รวมทั้งหมด</td>
                        <td className="text-center">{total}</td>
                        <td className="text-center">{((total/total)*100).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }
}
  
  export default Income