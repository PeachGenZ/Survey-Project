import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Toolbar from './components/Toolbar';
import SideBar from './components/SideBar';
import './assests/main.css';
import Requests from './views/Requests';
import Surveys from './views/Surveys';
import Projects from './views/Projects';
import Contacts from './views/Contacts';
import UserProfile from './views/UserProfile';
import CreateProject from './views/CreateProject';
import ProjectManagement from './views/ProjectManagement';
import axios from 'axios';
import baseCreateSurvey from './components/baseCreateSurvey';
import SampleGroupManagement from './views/SampleGroupManagement';
import OnlineSurvey from './views/OnlineSurvey';
import { connect } from 'react-redux';
import baseManageSurvey from './components/baseManageSurvey';
import CheckBeforeDo from './views/CheckBeforeDo';
import InviteToGroup from './views/InviteToGroup';

//Analyse Section
import Single from './views/analyse/analyse/Single'
import Compare from './views/analyse/analyse/Compare'
import Informations from './views/analyse/analyse/Informations'
import Proportion from './views/analyse/analyse/Proportion'
import Report from './views/analyse/analyse/Report'
import Analyse from './views/analyse/analyse/Analyse'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    }

  }
  componentDidMount() {
    //รับค่า user แบบลักไก่
    axios.get('http://localhost:5000/users/5e60d1e6239b493fd479e681')
      .then(response => {
        this.setState({
          profile: response.data
        })
        /*console.log(response.data);
        console.log(this.state.profile.firstname);
        console.log(this.state.profile.role);
        console.log(this.state.profile._id);*/
      })
      .catch((error) => {
        console.log(error);
      })

  }

  showComponent() {
    const id = "5e60d1e6239b493fd479e681";
    if (this.props.test.showSurvey) {
      return
    } else if (this.props.test.surveyManagement) {
      return (
        <div className="wrapper">
          <div>
            <Toolbar role={this.state.profile.role} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="wrapper">
          <SideBar firstname={this.state.profile.firstname} role={this.state.profile.role} id={id} />
          <div>
            <Toolbar role={this.state.profile.role} />
          </div>
        </div>
      )
    }
  }

  renderRouter() {
    return (
      <Switch>
        <Route exact path="/" component={Requests} />
        <Route exact path="/surveys" component={Surveys} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/user-profile" component={UserProfile} />
        <Route exact path="/create-project" component={CreateProject} />
        <Route exact path="/project-management/:projectId" component={ProjectManagement} />
        <Route exact path="/project-management/sample-group-management/:projectId/:sampleGroupId" component={SampleGroupManagement} />
        <Route exact path="/create-survey/:projectId" component={baseCreateSurvey} />
        <Route exact path="/create-survey/:projectId/:sampleGroupId" component={baseCreateSurvey} />
        <Route exact path="/online-survey/:surveyId" component={OnlineSurvey} />
        <Route exact path="/online-survey/:surveyId/name=:name" component={OnlineSurvey} />
        <Route exact path="/online-survey-check/:surveyId" component={CheckBeforeDo} />
        <Route exact path="/invite-to-group/:surveyId" component={InviteToGroup} />
        <Route exact path="/survey-management/:surveyId" component={baseManageSurvey} />
        <Route exact path="/survey-management/:surveyId/analyse/single" component={Single} />
        <Route exact path="/survey-management/:surveyId/analyse/compare" component={Compare} />
        <Route exact path="/survey-management/:surveyId/analyse/informations" component={Informations} />
        <Route exact path="/survey-management/:surveyId/analyse/proportion" component={Proportion} />
        <Route exact path="/survey-management/:surveyId/analyse/report" component={Report} />
        <Route exact path="/survey-management/:surveyId/define_analyse/" component={Analyse} />
      </Switch>
    )
  }

  render() {
    //const id = "5dca538c955945213c0d52ff"
    return (
      <BrowserRouter>
        <div>
          {this.showComponent()}
          {this.renderRouter()}
        </div>
      </BrowserRouter>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    test: state
  }
}
export default connect(mapStateToProps)(App);
