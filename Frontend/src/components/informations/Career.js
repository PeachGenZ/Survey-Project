import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Career extends Component {
  render(){
    const data = {
        labels: ['นักเรียน', 'นิสิต/นักศึกษา', 'ข้าราชการ/รัฐวิสาหกิจ', 'พนักงานบริษัทเอกชน', 'ธุรกิจส่วนตัว', 'รับจ้าง', 'แม่บ้าน', 'อื่น ๆ'],
        datasets: [
          {
            label: 'อาชีพ',
            backgroundColor: 'rgba(255,131,0,0.5)',
            borderColor: 'rgba(255,131,0,0.7)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,131,0,0.8)',
            hoverBorderColor: 'rgba(255,131,0,1)',
            data: [13, 33, 9, 19, 7, 12, 3, 4]
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
                        <th scope="col"><h4>อาชีพ</h4></th>
                        <th scope="col" className="text-center"><h4>จำนวน(คน)</h4></th>
                        <th scope="col" className="text-center"><h4>ร้อยละ(%)</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">นักเรียน</td>
                        <td className="text-center">13</td>
                        <td className="text-center">13</td>
                    </tr>
                    <tr>
                        <td className="text-center">นิสิต/นักศึกษา</td>
                        <td className="text-center">33</td>
                        <td className="text-center">33</td>
                    </tr>
                    <tr>
                        <td className="text-center">ข้าราชการ/รัฐวิสาหกิจ</td>
                        <td className="text-center">9</td>
                        <td className="text-center">9</td>
                    </tr>
                    <tr>
                        <td className="text-center">พนักงานบริษัทเอกชน</td>
                        <td className="text-center">19</td>
                        <td className="text-center">19</td>
                    </tr>
                    <tr>
                        <td className="text-center">ธุรกิจส่วนตัว</td>
                        <td className="text-center">7</td>
                        <td className="text-center">7</td>
                    </tr>
                    <tr>
                        <td className="text-center">รับจ้าง</td>
                        <td className="text-center">12</td>
                        <td className="text-center">12</td>
                    </tr>
                    <tr>
                        <td className="text-center">แม่บ้าน</td>
                        <td className="text-center">3</td>
                        <td className="text-center">3</td>
                    </tr>
                    <tr>
                        <td className="text-center">อื่น ๆ</td>
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
  
  export default Career