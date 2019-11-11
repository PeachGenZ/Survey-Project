import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './pages/error/NotFound';
import Survey from './pages/Survey';
import Single from './pages/analyze/Single';
import Compare from './pages/analyze/Compare';

class App extends Component {

  renderRouter(){
    return(
      <Switch>
        <Route exact path="/" component={Survey}></Route>
        <Route exact path="/single" component={Single}></Route>
        <Route exact path="/compare" component={Compare}></Route>
        <Route component={NotFound} />
      </Switch>
    )
  }

  render() {
    return (
      <BrowserRouter>{this.renderRouter()}</BrowserRouter>
    );
  }
}

export default App;