import React, { Component } from 'react';
import axios from 'axios';

class Gender extends Component {
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
        //console.log(this.state.answers[0].resultAsString.widgetGender)
    })
  }

  countMale(){
    let male = 0
    if(this.state.answers){
      for (let i = 0; i < this.state.answers.length; i++) {
        if(this.state.answers[i].resultAsString.widgetGender === "ชาย"){
          male++
        }
      }
      return male
    }
  }

  countFemale(){
    let female = 0
    if(this.state.answers){
      for (let i = 0; i < this.state.answers.length; i++) {
        if(this.state.answers[i].resultAsString.widgetGender === "หญิง"){
          female++
        }
      }
      return female
    }
  }

  render(){
    let male = this.countMale()
    let female = this.countFemale()
    let total = male + female
    return (
      <div>
        <h1>{(male) ? ((male/total)*100).toFixed(0)+"%" : ""}
        <span style={{ marginLeft: '33%' }}>{(female) ? ((female/total)*100).toFixed(0)+"%" : ""}</span></h1>
        <h3 style={{ margin: '2%' }}>เพศ</h3>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col"><h4>เพศ</h4></th>
            <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td className="text-center">ชาย</td>
              <td className="text-center">{male}</td>
            </tr>
            <tr>
              <td className="text-center">หญิง</td>
              <td className="text-center">{female}</td>
            </tr>
            <tr>
              <td className="text-center">รวมทั้งหมด</td>
              <td className="text-center">{total}</td>
            </tr>
        </tbody>
        </table>
      </div>
    );
  }
}
  
  export default Gender