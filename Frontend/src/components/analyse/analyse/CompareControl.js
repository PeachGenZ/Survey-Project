import React from 'react';

const CompareControl = () => {
    return (
        <div className="container card" style={{width: '60%', marginTop: `25px`}}>
                    <h3 style={{marginTop: `15px`}}>รูปแบบการแสดงผล</h3>
                <div className = "row" style={{marginTop: `15px`}}>
                    <a href='single'><button type="button" className="btn btn-primary btn-lg" style={{marginLeft: '125px'}}>แสดง 1 กลุ่มตัวอย่าง</button></a>
                    <a href='compare'><button type="button" className="btn btn-success btn-lg" style={{marginLeft: '50px'}}>แสดงทุกกลุ่มตัวอย่าง</button></a>
                </div>
                <div>
                    <hr/>
                    <h3 style={{marginTop: `25px`}}>แปลความข้อมูล</h3>
                    <p style={{ color: '#79a0d2' }}>*ฟังก์ชันการแปลความใช้ได้ดีก็ต่อเมื่อทุกคำถามมีจำนวนตัวเลือกและค่าของตัวเลือกเท่ากัน</p>
                    <input type="text" class="form-control" placeholder="ป้อนผลลัพธ์" aria-label="ป้อนผลลัพธ์" aria-describedby="button-addon2"></input>
                    <button type="button" className="btn btn-primary btn-lg" style={{margin: `15px`}}>ยืนยัน</button>
                </div>
            </div>
    )
  }
  
  export default CompareControl