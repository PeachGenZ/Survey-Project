import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

class Career extends Component {
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
            //console.log(this.state.answers[0].resultAsString.widgetJob)
        })
    }

  render(){
    let job1=0
    let job2=0
    let job3=0
    let job4=0
    let job5=0
    let job6=0
    let job7=0
    let job8=0
    let total=0
    let dataJob=[]
    for (let i = 0; i < this.state.answers.length; i++) {
      if(this.state.answers[i].resultAsString.widgetJob === 'นักเรียน'){
        job1++
      }
      if(this.state.answers[i].resultAsString.widgetJob === 'นิสิต/นักศึกษา'){
        job2++
      }
      if(this.state.answers[i].resultAsString.widgetJob === 'ข้าราชการ/รัฐวิสาหกิจ'){
        job3++
      }
      if(this.state.answers[i].resultAsString.widgetJob === 'พนักงานบริษัทเอกชน'){
        job4++
      }
      if(this.state.answers[i].resultAsString.widgetJob === 'ธุรกิจส่วนตัว'){
        job5++
      }
      if(this.state.answers[i].resultAsString.widgetJob === 'รับจ้าง'){
        job6++
      }
      if(this.state.answers[i].resultAsString.widgetJob === 'แม่บ้าน'){
        job7++
      }
      if(this.state.answers[i].resultAsString.widgetJob === 'อื่น ๆ'){
        job8++
      }
    }
    total=job1+job2+job3+job4+job5+job6+job7+job8
    dataJob.push(
        job1,job2,job3,job4,job5,job6,job7,job8
    )

    const data = {
        labels: ['นักเรียน', 'นิสิต/นักศึกษา', 'ข้าราชการ/รัฐวิสาหกิจ', 'พนักงานบริษัทเอกชน', 'ธุรกิจส่วนตัว', 'รับจ้าง', 'แม่บ้าน', 'อื่น ๆ'],
        datasets: [
          {
            label: 'อาชีพ',
            backgroundColor: 'rgba(255,131,0,0.5)',
            borderColor: 'rgba(255,131,0,0.7)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,131,0,0.8)',
            hoverBorderColor: 'rgba(255,131,0,1)',
            data: dataJob
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
                        <th scope="col"><h4>อาชีพ</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">นักเรียน</td>
                        <td className="text-center">{job1}</td>
                        <td className="text-center">{((job1/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">นิสิต/นักศึกษา</td>
                        <td className="text-center">{job2}</td>
                        <td className="text-center">{((job2/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">ข้าราชการ/รัฐวิสาหกิจ</td>
                        <td className="text-center">{job3}</td>
                        <td className="text-center">{((job3/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">พนักงานบริษัทเอกชน</td>
                        <td className="text-center">{job4}</td>
                        <td className="text-center">{((job4/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">ธุรกิจส่วนตัว</td>
                        <td className="text-center">{job5}</td>
                        <td className="text-center">{((job5/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">รับจ้าง</td>
                        <td className="text-center">{job6}</td>
                        <td className="text-center">{((job6/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">แม่บ้าน</td>
                        <td className="text-center">{job7}</td>
                        <td className="text-center">{((job7/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="text-center">อื่น ๆ</td>
                        <td className="text-center">{job8}</td>
                        <td className="text-center">{((job8/total)*100).toFixed(2)}</td>
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
  
  export default Career