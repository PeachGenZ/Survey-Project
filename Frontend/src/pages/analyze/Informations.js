import React, { Component } from 'react';
import Tab from '../../components/Tab.js';
import Male from './content/Male.png'
import Female from './content/Female.png'
import Gender from '../../components/informations/Gender.js';
import Age from '../../components/informations/Age.js';
import Status from '../../components/informations/Status.js';
import Education from '../../components/informations/Education.js';
import Career from '../../components/informations/Career.js';
import Income from '../../components/informations/Income.js';

class Informations extends Component {
  render() {
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <div className="text-center">
            <h1>ผลลัพธ์</h1>
            <h2>ลักษณะความคิดเห็นต่อการเลือกซื้อเครื่องดื่มชูกำลัง</h2>
            <Tab />
            <h3>จำนวนผู้ตอบแบบสอบถามทั้งหมด 100 คน</h3>
            <div style={{ marginTop: '3%' }}>
              <img src={Male} width="10%" height="10%"/>
              <img src={Female} width="11%" height="11%" style={{ marginLeft: '30%' }}/>
            </div>
            <div>
              <h1>65% <span style={{ marginLeft: '33%' }}>35%</span></h1>
              <h3 style={{ margin: '2%' }}>เพศ</h3>
              <Gender/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>อายุ</h3>
              <Age/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>สถานภาพ</h3>
              <Status/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>ระดับการศึกษาขั้นสูงสุด</h3>
              <Education/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>อาชีพ</h3>
              <Career/>
            </div>
            <div className="text-center">
              <h3 style={{ marginTop: '5%' }}>รายได้เฉลี่ยต่อเดือน</h3>
              <Income/>
            </div>
          </div>
      </div>
    )
  }
}

export default Informations;