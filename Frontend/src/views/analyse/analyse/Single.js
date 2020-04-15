import React, { Component } from 'react';
import Table1 from '../../../components/analyse/analyse/Table1.js';
import axios from 'axios';
import SingleControl from '../../../components/analyse/analyse/SingleControl.js';
import Tab from '../../../components/analyse/Tab.js';
import Bar from '../../../components/analyse/analyse/Bar.js';
//import SideMenu from '../layout/SideMenu';

class Single extends Component {
  constructor(props){
    super(props)
    this.state = {
      survey:"",
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
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>แบบสอบถาม{this.state.survey.nameSurvey}</h2>
            <Tab/>
            <SingleControl surveyId={surveyId}/>
          </div>
          <div style={{ marginTop: '60px' }}>
            <Table1 surveyId={surveyId}/>
            <div style={{ marginLeft: '5%' }, {marginTop: '5%'}}>
              <Bar surveyId={surveyId}/>
            </div>
          </div>
      </div>
    )
  }
}

export default Single;
