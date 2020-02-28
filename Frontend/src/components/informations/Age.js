import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Age extends Component {
  render(){
    const data = {
        labels: ['18 - 23 ปี', '24 - 29 ปี', '30 - 35 ปี', '36 - 41 ปี', '42 - 47 ปี', '48 - 53 ปี', '54 - 60 ปี', 'มากกว่า 60 ปี'],
        datasets: [
          {
            label: 'ช่วงอายุ',
            backgroundColor: 'rgba(0,128,255,0.5)',
            borderColor: 'rgba(99,132,255,0.8)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,128,255,0.8)',
            hoverBorderColor: 'rgba(0,128,255,1)',
            data: [22, 41, 19, 14, 2, 2, 0, 0]
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
                      <th scope="col"><h4>อายุ(ปี)</h4></th>
                      <th scope="col"><h4>จำนวน(คน)</h4></th>
                      <th scope="col"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td className="text-center">18 - 23</td>
                      <td className="text-center">22</td>
                      <td className="text-center">22</td>
                    </tr>
                    <tr>
                      <td className="text-center">24 - 29</td>
                      <td className="text-center">41</td>
                      <td className="text-center">41</td>
                    </tr>
                    <tr>
                      <td className="text-center">30 - 35</td>
                      <td className="text-center">19</td>
                      <td className="text-center">19</td>
                    </tr>
                    <tr>
                      <td className="text-center">36 - 41</td>
                      <td className="text-center">14</td>
                      <td className="text-center">14</td>
                    </tr>
                    <tr>
                      <td className="text-center">42 - 47</td>
                      <td className="text-center">2</td>
                      <td className="text-center">2</td>
                    </tr>
                    <tr>
                      <td className="text-center">48 - 53</td>
                      <td className="text-center">2</td>
                      <td className="text-center">2</td>
                    </tr>
                    <tr>
                      <td className="text-center">54 - 60</td>
                      <td className="text-center">0</td>
                      <td className="text-center">0</td>
                    </tr>
                    <tr>
                      <td className="text-center">มากกว่า 60 ปี</td>
                      <td className="text-center">0</td>
                      <td className="text-center">0</td>
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
  
  export default Age