import React, { Component } from 'react';
import Tab from '../../components/Tab.js';

class Proportion extends Component {
  render() {
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <Tab />
          </div>
      </div>
    )
  }
}

export default Proportion;