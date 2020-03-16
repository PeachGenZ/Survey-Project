import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

class Age extends Component {
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
    let age1823=0
    let age2429=0
    let age3035=0
    let age3641=0
    let age4247=0
    let age4853=0
    let age5460=0
    let age60=0
    let total=0
    let dataAge=[]
    for (let i = 0; i < this.state.answers.length; i++) {
      if(this.state.answers[i].resultAsString.widgetAges === '18-23'){
        age1823++
      }
      if(this.state.answers[i].resultAsString.widgetAges === '24-29'){
        age2429++
      }
      if(this.state.answers[i].resultAsString.widgetAges === '30-35'){
        age3035++
      }
      if(this.state.answers[i].resultAsString.widgetAges === '36-41'){
        age3641++
      }
      if(this.state.answers[i].resultAsString.widgetAges === '42-47'){
        age4247++
      }
      if(this.state.answers[i].resultAsString.widgetAges === '48-53'){
        age4853++
      }
      if(this.state.answers[i].resultAsString.widgetAges === '54-60'){
        age5460++
      }
      if(this.state.answers[i].resultAsString.widgetAges === 'more60'){
        age60++
      }
      
    }
    total=age1823+age2429+age3035+age3641+age4247+age4853+age5460+age60
    dataAge.push(
      age1823,age2429,age3035,age3641,age4247,age4853,age5460,age60
    )

    const data = {
        labels: ['18 - 23 ปี', '24 - 29 ปี', '30 - 35 ปี', '36 - 41 ปี', '42 - 47 ปี', '48 - 53 ปี', '54 - 60 ปี', 'มากกว่า 60 ปี'],
        datasets: [
          {
            label: 'ช่วงอายุ',
            backgroundColor: 'rgba(0,128,255,0.5)',
            borderColor: 'rgba(99,132,255,0.8)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,128,255,0.8)',
            hoverBorderColor: 'rgba(0,128,255,1)',
            data:dataAge
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
                      <th scope="col"><h4>อายุ(ปี)</h4></th>
                      <th scope="col"><h4>จำนวน(คน)</h4></th>
                      <th scope="col"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td className="text-center">18 - 23</td>
                      <td className="text-center">{age1823}</td>
                      <td className="text-center">{((age1823/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="text-center">24 - 29</td>
                      <td className="text-center">{age2429}</td>
                      <td className="text-center">{((age2429/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="text-center">30 - 35</td>
                      <td className="text-center">{age3035}</td>
                      <td className="text-center">{((age3035/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="text-center">36 - 41</td>
                      <td className="text-center">{age3641}</td>
                      <td className="text-center">{((age3641/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="text-center">42 - 47</td>
                      <td className="text-center">{age4247}</td>
                      <td className="text-center">{((age4247/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="text-center">48 - 53</td>
                      <td className="text-center">{age4853}</td>
                      <td className="text-center">{((age4853/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="text-center">54 - 60</td>
                      <td className="text-center">{age5460}</td>
                      <td className="text-center">{((age5460/total)*100).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="text-center">มากกว่า 60 ปี</td>
                      <td className="text-center">{age60}</td>
                      <td className="text-center">{((age60/total)*100).toFixed(2)}</td>
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
  
  export default Age