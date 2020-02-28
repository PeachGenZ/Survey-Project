import React, { Component } from 'react';

class Gender extends Component {

  render(){
    return (
        <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col"><h4>เพศ</h4></th>
            <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td className="text-center">ชาย</td>
              <td className="text-center">65</td>
            </tr>
            <tr>
              <td className="text-center">หญิง</td>
              <td className="text-center">35</td>
            </tr>
            <tr>
              <td className="text-center">รวมทั้งหมด</td>
              <td className="text-center">100</td>
            </tr>
        </tbody>
      </table>
    );
  }
}
  
  export default Gender