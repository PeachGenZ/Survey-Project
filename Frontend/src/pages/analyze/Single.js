import React, { Component } from 'react';
import Table from '../../components/Table1.js';
import axios from 'axios';
import SingleControl from '../../components/SingleControl.js';
import Tab from '../../components/Tab.js';

class Single extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableData: []
        };
    }

    componentDidMount () {
        axios.get('http://127.0.0.1:4761/createmodel', {
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
            <SingleControl />
          </div>
          <div style={{ marginTop: '60px' }}>
            <Table tableData={ this.state.tableData } />
          </div>
      </div>
    )
  }
}

export default Single;