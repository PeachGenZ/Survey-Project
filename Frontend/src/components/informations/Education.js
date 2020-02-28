import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Education extends Component {
  render(){
    const data = {
        labels: ['ประถมศึกษา', 'มัธยมศึกษา', 'ปวช./ปวส./อนุปริญญา', 'ปริญญาตรี', 'ปริญญาโทหรือสูงกว่า'],
        datasets: [
          {
            label: 'ระดับการศึกษาขั้นสูงสุด',
            backgroundColor: 'rgba(173,255,47,0.5)',
            borderColor: 'rgba(153,153,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,255,0,0.8)',
            hoverBorderColor: 'rgba(153,153,0,0.8)',
            data: [10, 23, 21, 35, 11]
          }
        ]
    };

    return (
        <div>
            <div>
                <Bar
                data={data}
                width={100}
                height={300}
                options={{
                    maintainAspectRatio: false
                }}/>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col"><h4>ระดับการศึกษาขั้นสูงสุด</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">ประถมศึกษา</td>
                        <td className="text-center">10</td>
                        <td className="text-center">10</td>
                    </tr>
                    <tr>
                        <td className="text-center">มัธยมศึกษา</td>
                        <td className="text-center">23</td>
                        <td className="text-center">23</td>
                    </tr>
                    <tr>
                        <td className="text-center">ปวช./ปวส./อนุปริญญา</td>
                        <td className="text-center">21</td>
                        <td className="text-center">21</td>
                    </tr>
                    <tr>
                        <td className="text-center">ปริญญาตรี</td>
                        <td className="text-center">35</td>
                        <td className="text-center">35</td>
                    </tr>
                    <tr>
                        <td className="text-center">ปริญญาโทหรือสูงกว่า</td>
                        <td className="text-center">11</td>
                        <td className="text-center">11</td>
                    </tr>
                    <tr>
                        <td className="text-center">รวมทั้งหมด</td>
                        <td className="text-center">100</td>
                        <td className="text-center">100</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }
}
  
  export default Education