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
      survey:"",
      pageManage: "",
      checkOwnSurvey: false
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

  onChangePageManage = data =>{
    this.setState({
        pageManage: data
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
            <Tab tab="tab2"/>
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