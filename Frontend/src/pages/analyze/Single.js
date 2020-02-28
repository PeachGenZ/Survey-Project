import React, { Component } from 'react';
import Table1 from '../../components/analyse/Table1.js';
import axios from 'axios';
import SingleControl from '../../components/analyse/SingleControl.js';
import Tab from '../../components/Tab.js';
import Bar from '../../components/analyse/Bar.js';

class Single extends Component {
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
            <SingleControl />
          </div>
          <div style={{ marginTop: '60px' }}>
            <Table1 />
            <div style={{ marginLeft: '5%' }, {marginTop: '5%'}}>
              <Bar data={this.state.data}/>
            </div>
          </div>
      </div>
    )
  }
}

export default Single;
