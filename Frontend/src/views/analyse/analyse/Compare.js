import React, { Component } from 'react';
import Table1 from '../../../components/analyse/analyse/Table1.js';
import Table2 from '../../../components/analyse/analyse/Table2.js';
import axios from 'axios';
import Tab from '../../../components/analyse/Tab.js';
import CompareControl from '../../../components/analyse/analyse/CompareControl.js';
import Bar from '../../../components/analyse/analyse/Bar.js';

class Compare extends Component {
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
    const surveyId = this.props.match.params.surveyId;
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>แบบสอบถาม{this.state.survey.nameSurvey}</h2>
            <Tab />
            <CompareControl />
          </div>
          <div style={{ marginTop: '60px' }}>
            <h1 className="text-center">กลุ่มตัวอย่างที่ 1</h1>
            <Table1 surveyId={surveyId}/>
            {/*<h1 className="text-center" style={{ marginTop: `80px` }}>กลุ่มตัวอย่างที่ 2</h1>
            <Table2 />*/}
            <div style={{ marginLeft: '5%' }, {marginTop: '5%'}}>
              <Bar surveyId={surveyId}/>
            </div>
          </div>
      </div>
    )
  }
}

export default Compare;