import React, { Component } from 'react';
import axios from 'axios';
import Tab from '../../../components/analyse/Tab';
import Male from './content/Male.png'
import Female from './content/Female.png'
import Gender from '../../../components/analyse/informations/Gender';
import Age from '../../../components/analyse/informations/Age';
import Status from '../../../components/analyse/informations/Status';
import Education from '../../../components/analyse/informations/Education';
import Career from '../../../components/analyse/informations/Career';
import Income from '../../../components/analyse/informations/Income';

class Informations extends Component {
  constructor(props){
    super(props);
    this.state = {
      survey: "",
      amountAnswer: "",
    };
  }

   componentDidMount () {
    const surveyId = this.props.match.params.surveyId;
    //get ข้อมูลมาเพื่อแสดงชื่อ survey
     axios.get(`http://localhost:5000/surveys/find/` + surveyId)
      .then(response => {
          this.setState({
              survey:response.data,
          })
      })
      .catch((error) => {
          console.log(error);
      })
      
      //get ข้อมูลคำถามสำเร็จรูป
      axios.get(`http://localhost:5000/answers/find/` + surveyId, {
            responseType: 'json'
        }).then(response => {
            this.setState({ 
              amountAnswer:response.data[0].amountAnswer,
            });
      })
      //console.log(this.state.answers)
  }



  render() {
    const surveyId = this.props.match.params.surveyId;
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>แบบสอบถาม{this.state.survey.nameSurvey}</h2>
            <Tab />
            <h3>จำนวนผู้ตอบแบบสอบถามทั้งหมด {this.state.amountAnswer} คน</h3>
            <div style={{ marginTop: '3%' }}>
              <img src={Male} width="10%" height="10%"/>
              <img src={Female} width="11%" height="11%" style={{ marginLeft: '30%' }}/>
            </div>
            <div>
              <Gender surveyId={surveyId}/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>อายุ</h3>
              <Age surveyId={surveyId}/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>สถานภาพ</h3>
              <Status surveyId={surveyId}/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>ระดับการศึกษาขั้นสูงสุด</h3>
              <Education surveyId={surveyId}/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>อาชีพ</h3>
              <Career surveyId={surveyId}/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>รายได้เฉลี่ยต่อเดือน</h3>
              <Income surveyId={surveyId}/>
            </div>
          </div>
      </div>
    )
  }
}

export default Informations;