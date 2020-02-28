import React, { Component } from 'react';
import Table1 from '../../components/analyse/Table1.js';
import Table2 from '../../components/analyse/Table2.js';
import axios from 'axios';
import Tab from '../../components/Tab.js';
import CompareControl from '../../components/analyse/CompareControl.js';
import Bar2 from '../../components/analyse/Bar2.js';

class Compare extends Component {
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
            <h3>ลักษณะความคิดเห็นต่อการเลือกซื้อเครื่องดื่มชูกำลัง</h3>
            <Tab />
            <CompareControl />
          </div>
          <div style={{ marginTop: '60px' }}>
            <h1 className="text-center">กลุ่มตัวอย่างที่ 1</h1>
            <Table1 />
            <h1 className="text-center" style={{ marginTop: `80px` }}>กลุ่มตัวอย่างที่ 2</h1>
            <Table2 />
            <div style={{ marginLeft: '5%' }, {marginTop: '5%'}}>
              <Bar2 data={this.state.data}/>
            </div>
          </div>
      </div>
    )
  }
}

export default Compare;