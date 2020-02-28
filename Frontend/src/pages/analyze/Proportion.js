import React, { Component } from 'react';
import Tab from '../../components/Tab.js';
import DataPie from '../../components/analyse/DataPie.js';
import axios from 'axios';

class Proportion extends Component {
  constructor(props){
    super(props)
    this.state = {data: ""};
  }

  componentDidMount () {
    axios.get('http://127.0.0.1:8888/createmodel', {
        responseType: 'json'
    }).then(response => {
        this.setState({ data: response.data.survey });
    })
  }

  render() {
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>ลักษณะความคิดเห็นต่อการเลือกซื้อเครื่องดื่มชูกำลัง</h2>
            <Tab />
            <DataPie data={this.state.data}/>
          </div>
      </div>
    )
  }
}

export default Proportion;