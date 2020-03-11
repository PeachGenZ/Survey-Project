import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

class Education extends Component {
    constructor(props){
        super(props);
        this.state = {
          answers:"",
        };
      }
    
      componentDidMount () {
        const surveyId = this.props.surveyId;
        //get ข้อมูลคำถามสำเร็จรูป
        axios.get(`http://localhost:5000/answers/find/` + surveyId)
        .then(response => {
            this.setState({
                answers:response.data[0].answerUsers,
            })
            //console.log(this.state.answers[0].resultAsString.widgetAges)
        })
      }

  render(){
    let edu1=0
    let edu2=0
    let edu3=0
    let edu4=0
    let edu5=0
    let total=0
    let dataEducation=[]
    for (let i = 0; i < this.state.answers.length; i++) {
      if(this.state.answers[i].resultAsString.widgetEducation === 'ประถมศึกษา'){
        edu1++
      }
      if(this.state.answers[i].resultAsString.widgetEducation === 'มัธยมศึกษา'){
        edu2++
      }
      if(this.state.answers[i].resultAsString.widgetEducation === 'ปวช./ปวส./อนุปริญญา'){
        edu3++
      }
      if(this.state.answers[i].resultAsString.widgetEducation === 'ปริญญาตรี'){
        edu4++
      }
      if(this.state.answers[i].resultAsString.widgetEducation === 'ปริญญาโทหรือสูงกว่า'){
        edu5++
      }
    }
    total=edu1+edu2+edu3+edu4+edu5
    dataEducation.push(
        edu1,edu2,edu3,edu4,edu5
    )

    const data = {
        labels: ['ประถมศึกษา', 'มัธยมศึกษา', 'ปวช./ปวส./อนุปริญญา', 'ปริญญาตรี', 'ปริญญาโทหรือสูงกว่า'],
        datasets: [
          {
            label: 'ระดับการศึกษาขั้นสูงสุด',
            backgroundColor: 'rgba(173,255,47,0.5)',
            borderColor: 'rgba(153,153,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,255,0,0.8)',
            hoverBorderColor: 'rgba(153,153,0,0.8)',
            data: [10, 23, 21, 35, 11]
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
                        <th scope="col"><h4>ระดับการศึกษาขั้นสูงสุด</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">ประถมศึกษา</td>
                        <td className="text-center">{edu1}</td>
                        <td className="text-center">{((edu1/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">มัธยมศึกษา</td>
                        <td className="text-center">{edu2}</td>
                        <td className="text-center">{((edu2/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">ปวช./ปวส./อนุปริญญา</td>
                        <td className="text-center">{edu3}</td>
                        <td className="text-center">{((edu3/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">ปริญญาตรี</td>
                        <td className="text-center">{edu4}</td>
                        <td className="text-center">{((edu4/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">ปริญญาโทหรือสูงกว่า</td>
                        <td className="text-center">{edu5}</td>
                        <td className="text-center">{((edu5/total)*100).toFixed(2)}</td>
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
  
  export default Education