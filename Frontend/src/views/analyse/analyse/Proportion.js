import React, { Component } from 'react';
import Tab from '../../../components/analyse/Tab.js';
import DataPie from '../../../components/analyse/analyse/DataPie.js';
import axios from 'axios';

class Proportion extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:"",
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
    const surveyId = this.props.match.params.surveyId;
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <a href='..' ><button type="button" className="btn btn-warning btn-flat" style={{marginRight: '100%'}}><i className="fa fa-toggle-left" /> ย้อนกลับ</button></a>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>แบบสอบถาม{this.state.survey.nameSurvey}</h2>
            <Tab />
            <DataPie surveyId={surveyId}/>
          </div>
      </div>
    )
  }
}

export default Proportion;