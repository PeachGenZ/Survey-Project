import React, { Component } from 'react';
import Table from '../../components/Table1.js';
import axios from 'axios';
import Tab from '../../components/Tab.js';
import CompareControl from '../../components/CompareControl.js';

class Compare extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableData: []
        };
    }

    componentDidMount () {
        axios.get('http://127.0.0.1:8888/createmodel', {
            responseType: 'json'
        }).then(response => {
            this.setState({ tableData: response.data.survey });
        });
    }

  render() {
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <Tab />
            <CompareControl />
          </div>
          <div style={{ marginTop: '60px' }}>
            <h1 className="text-center">กลุ่มตัวอย่างที่ 1</h1>
            <Table tableData={ this.state.tableData } />
            <h1 className="text-center">กลุ่มตัวอย่างที่ 2</h1>
            <Table tableData={ this.state.tableData } />
          </div>
      </div>
    )
  }
}

export default Compare;