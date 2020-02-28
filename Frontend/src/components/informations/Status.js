import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Status extends Component {
  render(){
    const data = {
        labels: ['โสด', 'สมรส', 'หย่าร้าง,หม้าย,แยกกันอยู่'],
        datasets: [
          {
            label: 'สถานภาพ',
            backgroundColor: 'rgba(255,99,132,0.4)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.6)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [41, 43, 16]
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
                        <th scope="col"><h4>สถานภาพ</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">โสด</td>
                        <td className="text-center">41</td>
                        <td className="text-center">41</td>
                    </tr>
                    <tr>
                        <td className="text-center">สมรส</td>
                        <td className="text-center">43</td>
                        <td className="text-center">43</td>
                    </tr>
                    <tr>
                        <td className="text-center">หย่าร้าง,หม้าย,แยกกันอยู่</td>
                        <td className="text-center">16</td>
                        <td className="text-center">16</td>
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
  
  export default Status