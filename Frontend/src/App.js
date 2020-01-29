import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './pages/error/NotFound';
import Survey from './pages/Survey';
import Single from './pages/analyze/Single';
import Compare from './pages/analyze/Compare';
import Header from './components/Header';
import Footer from './components/Footer';
import Informations from './pages/analyze/Informations';
import Proportion from './pages/analyze/Proportion';
import './App.css'



class App extends Component {

  renderRouter(){
    return(
      <Switch>
        <Route exact path="/" component={Survey}></Route>
        <Route exact path="/single" component={Single}></Route>
        <Route exact path="/compare" component={Compare}></Route>
        <Route exact path="/informations" component={Informations}></Route>
        <Route exact path="/proportion" component={Proportion}></Route>
        <Route component={NotFound} />
      </Switch>
    )
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Header />
        {this.renderRouter()}
        <Footer />
      </div>
      </BrowserRouter>
    );
  }
    
}

export default App;