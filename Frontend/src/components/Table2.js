import React from 'react';

const Table = ({ tableData }) => {
    return (
        <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">หัวข้อ</th>
            <th scope="col">คะแนนรวม</th>
            <th scope="col">ค่าเฉลี่ยคะแนน</th>
            <th scope="col">ส่วนเบี่ยงมาตรฐาน</th>
            <th scope="col">การแปลผล</th>
          </tr>
        </thead>
        <tbody>
        { (tableData.length > 0) ? tableData.map( (tableData, index) => {
           return (
            <tr key={ index }>
              <td>{ tableData.topic }</td>
              <td>{ tableData.choice1 }</td>
              <td>{ tableData.choice2 }</td>
              <td>{ tableData.choice3 }</td>
              <td>{ tableData.choice4 }</td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
        </tbody>
      </table>
    );
  }
  
  export default Table