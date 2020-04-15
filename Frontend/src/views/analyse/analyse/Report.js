import React, { Component } from 'react';
import Tab from '../../../components/analyse/Tab.js';
import axios from 'axios';

class Report extends Component {
  constructor(props){
    super(props)
    this.state = {
      survey:""
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
  }

  render() {
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>แบบสอบถาม{this.state.survey.nameSurvey}</h2>
            <Tab />
          </div>
          <div>
          <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">ลำดับ</th>
              <th scope="col" className="text-center">ชื่อ</th>
              <th scope="col" className="text-center">กลุ่มตัวอย่าง</th>
              <th scope="col" className="text-center">วัน/เดือน/ปี</th>
              <th scope="col" className="text-center">เวลา</th>
              <th scope="col" className="text-center">ผลลัพธ์</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td className="text-center">Robert</td>
              <td className="text-center">ผู้ที่เดินทางกลับจากต่างประเทศ</td>
              <td className="text-center">10/03/2563</td>
              <td className="text-center">09:40 น.</td>
              <td className="text-center">มีความเสี่ยงต่อการติดเชื้อ</td>
            </tr>
          </tbody>
          </table>
          </div>
      </div>
    )
  }
}

export default Report;