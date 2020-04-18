import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateResearcherRoute from './components/private-route/PrivateResearcherRoute';
import PrivateAdminRoute from "./components/private-route/PrivateAdminRoute";

import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Requests from './views/Requests';
import UserProfile from './views/UserProfile';
import ErrorPage from './components/error/ErrorPage';
import CreateProject from './views/CreateProject';
import Projects from './views/Projects';
import ProjectManagement from './views/ProjectManagement';
import baseCreateSurvey from './components/base/baseCreateSurvey';
import baseEditSurvey from './components/base/baseEditSurvey';
import InviteToGroup from './views/InviteToGroup';
import baseOnlineSurvey from './components/base/baseOnlineSurvey';
import baseManageSurvey from './components/base/baseManageSurvey';
import Surveys from './views/Surveys';
import ManageMembers from './views/admin/ManageMembers';
import ManageProject from './views/admin/ManageProject';
import SampleGroupManagement from './views/SampleGroupManagement';

//Analyse Section
import Single from './views/analyse/analyse/Single'
import Compare from './views/analyse/analyse/Compare'
import Informations from './views/analyse/analyse/Informations'
import Proportion from './views/analyse/analyse/Proportion'
import Report from './views/analyse/analyse/Report'
import Analyse from './views/analyse/analyse/Analyse'

// Check for token to keep user logged in
if (localStorage.jwtOSToken) {
  // Set auth token header auth
  const token = localStorage.jwtOSToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  showComponent() {
    if (this.props.statusPage.blankPage) return
    else if (!this.props.statusPage.blankPage) return <Sidebar />
  }

  renderRouter() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/invite-to-group/:surveyId" component={InviteToGroup} />
        <Route exact path="/online-survey/:surveyId" component={baseOnlineSurvey} />

        <PrivateRoute exact path="/requests" component={Requests} />
        <PrivateRoute exact path="/user-profile" component={UserProfile} />
        <PrivateRoute exact path="/user-profile/:userId" component={UserProfile} />
        <PrivateRoute exact path="/error-page" component={ErrorPage} />
        <PrivateRoute exact path="/surveys" component={Surveys} />
        <PrivateRoute exact path="/survey-management/:surveyId" component={baseManageSurvey} />
        <PrivateRoute exact path="/survey-management/:surveyId/analyse/single" component={Single} />
        <PrivateRoute exact path="/survey-management/:surveyId/analyse/compare" component={Compare} />
        <PrivateRoute exact path="/survey-management/:surveyId/analyse/informations" component={Informations} />
        <PrivateRoute exact path="/survey-management/:surveyId/analyse/proportion" component={Proportion} />
        <PrivateRoute exact path="/survey-management/:surveyId/analyse/report" component={Report} />
        <PrivateRoute exact path="/survey-management/:surveyId/define_analyse/" component={Analyse} />

        <PrivateResearcherRoute exact path="/create-project" component={CreateProject} />
        <PrivateResearcherRoute exact path="/projects" component={Projects} />
        <PrivateResearcherRoute exact path="/project-management/:projectId" component={ProjectManagement} />
        <PrivateResearcherRoute exact path="/project-management/sample-group-management/:projectId/:sampleGroupId" component={SampleGroupManagement} />
        <PrivateResearcherRoute exact path="/create-survey/:projectId" component={baseCreateSurvey} />
        <PrivateResearcherRoute exact path="/create-survey/:projectId/:sampleGroupId" component={baseCreateSurvey} />
        <PrivateResearcherRoute exact path="/edit-survey/:type/:id" component={baseEditSurvey} />
        <PrivateResearcherRoute exact path="/edit-survey/:type/:id/:projectId/:sampleGroupId" component={baseEditSurvey} />
        
        <PrivateAdminRoute exact path="/manage-members" component={ManageMembers} />
        <PrivateAdminRoute exact path="/manage-project" component={ManageProject} />
      </Switch>
    )
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          {this.showComponent()}
          {this.renderRouter()}
        </div>
        {console.log(this.props.statusPage)}
        {console.log(this.props.auth.user)}
      </BrowserRouter>
    )
  }
}
App.propTypes = {
  auth: PropTypes.object.isRequired,
  statusPage: PropTypes.object.isRequired,
  survey: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  statusPage: state.statusPage,
  survey: state.survey
});
export default connect(mapStateToProps)(App);
