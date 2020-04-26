import React, { Component } from 'react';
import Tab from '../../../components/analyse/Tab.js';
import axios from 'axios';

class Report extends Component {
  constructor(props){
    super(props)
    this.state = {
      survey:"",
      report:""
    }
  }

  componentDidMount () {
    const surveyId = this.props.match.params.surveyId;
    axios.get(`/surveys/find/` + surveyId)
      .then(response => {
          this.setState({
              survey: response.data,
          })
      })
      .catch((error) => {
          console.log(error);
      })
    
    axios.get(`/userResult/find/` + surveyId)
      .then(response => {
          this.setState({
            report: response.data[0].userResult
          })
      })
      .catch((error) => {
          console.log(error);
      })
  }

  render() {
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <a href='..' ><button type="button" className="btn btn-warning btn-flat" style={{marginRight: '100%'}}><i className="fa fa-toggle-left" /> ย้อนกลับ</button></a>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>แบบสอบถาม{this.state.survey.nameSurvey}</h2>
            <Tab tab="tab4"/>
          </div>
          <div>
          <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">ลำดับ</th>
              <th scope="col" className="text-center">ชื่อ</th>
              <th scope="col" className="text-center">กลุ่มตัวอย่าง</th>
              <th scope="col" className="text-center">วัน/เดือน/ปี เวลา</th>
              <th scope="col" className="text-center">ผลลัพธ์</th>
            </tr>
          </thead>
          <tbody>
          { (this.state.report) ? this.state.report.map( (data, index) => {
            return (
              <tr key={ index }>
                <td className="text-center">{ index+1 }</td>
                <td className="text-center">{data.name}</td>
                <td className="text-center">{data.sample}</td>
                <td className="text-center">{data.date}</td>
                <td className="text-center">{data.topic}</td>
              </tr>
            )
          }) : <tr><td colSpan="6" className="text-center">ไม่มีข้อมูล...</td></tr> }
          </tbody>
          </table>
          </div>
      </div>
    )
  }
}

export default Report;