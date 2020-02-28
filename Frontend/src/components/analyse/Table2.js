import React, { Component } from 'react';
import axios from 'axios'

class Table2 extends Component {
  constructor(props){
    super(props)
    this.state = {
        tableData: []
    };
  }

  componentDidMount () {
    axios.get('http://127.0.0.1:8888/createmodel2', {
        responseType: 'json'
    }).then(response => {
        this.setState({ tableData: response.data.survey });
    });
  }

  render(){
    return (
        <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col" className="text-center">คำถาม</th>
            <th scope="col">คะแนนที่ได้</th>
            <th scope="col">ค่าเฉลี่ยคะแนน</th>
            <th scope="col">ส่วนเบี่ยงเบนมาตรฐาน</th>
            <th scope="col" className="text-center">แปลความ</th>
          </tr>
        </thead>
        <tbody>
        { (this.state.tableData.length > 0) ? this.state.tableData.map( (tableData, index) => {
          return (
            <tr key={ index }>
              <td className="text-center">{ index+1 }</td>
              <td className="text-center">{ tableData.topic }</td>
              <td className="text-center">{ tableData.score }</td>
              <td className="text-center">{ tableData.mean.toFixed(2) }</td>
              <td className="text-center">{ tableData.SD.toFixed(2) }</td>
              <td className="text-center">{ tableData.data }</td>
            </tr>
          )
        }) : <tr><td colSpan="6" className="text-center">Loading...</td></tr> }
        </tbody>
      </table>
    );
  }
}
  
  export default Table2