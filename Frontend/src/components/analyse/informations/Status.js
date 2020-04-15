import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

class Status extends Component {
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
        //console.log(this.state.answers[0].resultAsString.widgetAges)
    })
  }

  render(){
    let single=0
    let marry=0
    let separated=0
    let total=0
    let dataStatus=[]
    for (let i = 0; i < this.state.answers.length; i++) {
      if(this.state.answers[i].resultAsString.widgetStatus === 'single'){
        single++
      }
      if(this.state.answers[i].resultAsString.widgetStatus === 'marry'){
        marry++
      }
      if(this.state.answers[i].resultAsString.widgetStatus === 'separated'){
        separated++
      }
    }
    total=single+marry+separated
    dataStatus.push(
        single,marry,separated
    )
    const data = {
        labels: ['โสด', 'สมรส', 'หย่าร้าง,หม้าย,แยกกันอยู่'],
        datasets: [
          {
            label: 'สถานภาพ',
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.6)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: dataStatus
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
                        <th scope="col"><h4>สถานภาพ</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">โสด</td>
                        <td className="text-center">{single}</td>
                        <td className="text-center">{((single/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">สมรส</td>
                        <td className="text-center">{marry}</td>
                        <td className="text-center">{((marry/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">หย่าร้าง,หม้าย,แยกกันอยู่</td>
                        <td className="text-center">{separated}</td>
                        <td className="text-center">{((separated/total)*100).toFixed(2)}</td>
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
  
  export default Status