import React, { Component } from 'react';
import axios from 'axios';

class Analyse extends Component {
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
          <a href='.' ><button type="button" className="btn btn-warning btn-flat" style={{marginRight: '100%'}}><i className="fa fa-toggle-left" /> ย้อนกลับ</button></a>
          <div className="text-center">
            <h2>กำหนดผลลัพธ์แสดงรายบุคคล</h2>
            <p style={{ color: '#79a0d2' }}>*เมื่อผู้ตอบแบบสอบถามทำแบบสอบถามเสร็จสิ้นฟังก์ชันนี้จะสรุปผลลัพธ์ตามคะแนนที่ผู้ตอบทำได้</p>
            <div>
                <input type="text" class="form-control" placeholder="ป้อนผลลัพธ์" aria-label="ป้อนผลลัพธ์" aria-describedby="button-addon2"></input>
            </div>
          </div>
          
      </div>
    )
  }
}

export default Analyse;