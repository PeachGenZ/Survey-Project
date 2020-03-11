import React, { Component } from 'react';
import Table1 from '../../../components/analyse/analyse/Table1.js';
import axios from 'axios';
import SingleControl from '../../../components/analyse/analyse/SingleControl.js';
import Tab from '../../../components/analyse/Tab.js';
import Bar from '../../../components/analyse/analyse/Bar.js';

class Single extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:"",
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
            <Tab/>
            <SingleControl />
          </div>
          <div style={{ marginTop: '60px' }}>
            <Table1 survey={this.state.survey}/>
            <div style={{ marginLeft: '5%' }, {marginTop: '5%'}}>
              <Bar data={this.state.data}/>
            </div>
          </div>
      </div>
    )
  }
}

export default Single;
