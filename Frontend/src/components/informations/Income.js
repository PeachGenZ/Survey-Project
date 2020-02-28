import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Income extends Component {
  render(){
    const data = {
        labels: ['น้อยกว่า 5,000 บาท', '5,000-10,000 บาท', '10,001-20,000 บาท', '20,001-30,000 บาท', 'มากกว่า 30,000 บาท'],
        datasets: [
          {
            label: 'รายได้เฉลี่ยต่อเดือน',
            backgroundColor: 'rgba(127,0,255,0.5)',
            borderColor: 'rgba(127,0,255,0.7)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(127,0,255,0.8)',
            hoverBorderColor: 'rgba(127,0,255,1)',
            data: [30, 16, 36, 14, 4]
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
                        <th scope="col"><h4>รายได้เฉลี่ยต่อเดือน</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">น้อยกว่า 5,000 บาท</td>
                        <td className="text-center">30</td>
                        <td className="text-center">30</td>
                    </tr>
                    <tr>
                        <td className="text-center">5,000-10,000 บาท</td>
                        <td className="text-center">16</td>
                        <td className="text-center">16</td>
                    </tr>
                    <tr>
                        <td className="text-center">10,001-20,000 บาท</td>
                        <td className="text-center">36</td>
                        <td className="text-center">36</td>
                    </tr>
                    <tr>
                        <td className="text-center">20,001-30,000 บาท</td>
                        <td className="text-center">14</td>
                        <td className="text-center">14</td>
                    </tr>
                    <tr>
                        <td className="text-center">มากกว่า 30,000 บาท</td>
                        <td className="text-center">4</td>
                        <td className="text-center">4</td>
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
  
  export default Income