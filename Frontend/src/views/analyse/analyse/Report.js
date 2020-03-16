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
    axios.get(`http://localhost:5000/surveys/find/` + surveyId)
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
      </div>
    )
  }
}

export default Report;