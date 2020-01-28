import React from 'react';

const SingleControl = () => {
    return (
        <div className="container card" style={{width: '60%', marginTop: `25px`}}>
                <h3 style={{marginTop: `15px`}}>รูปแบบการแสดงผล</h3>
            <div className = "row" style={{marginTop: `15px`}}>
                <a href='/single'><button type="button" className="btn btn-primary btn-lg" style={{marginLeft: '160px'}}>แสดงผลรวม</button></a>
                <a href='/compare'><button type="button" className="btn btn-success btn-lg" style={{marginLeft: '50px'}}>แสดงผลเปรียบเทียบ</button></a>
            </div>
            <div className="container-fluid">
                <h3 style={{marginTop: `25px`}}>กลุ่มตัวอย่าง</h3>
                    <div class="dropdown" style={{marginTop: `15px`}}>
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            เลือกกลุ่มตัวอย่าง
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item" type="button">นักเรียน</button>
                            <button class="dropdown-item" type="button">ข้าราชการ</button>
                            <button class="dropdown-item" type="button">อาจารย์</button>
                        </div>
                    </div>
            </div>
            <div>
                <h3 style={{marginTop: `25px`}}>แปลผลข้อมูล</h3>
                <div class="input-group mb-3" style={{marginTop: `15px`}}>
                    <input type="text" class="form-control" placeholder="ผลลัพธ์ขั้นที่ 1" aria-label="ผลลัพธ์ขั้นที่ 1" aria-describedby="button-addon1"></input>
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button" id="button-addon1">ยืนยัน</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="ผลลัพธ์ขั้นที่ 2" aria-label="ผลลัพธ์ขั้นที่ 2" aria-describedby="button-addon1"></input>
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button" id="button-addon2">ยืนยัน</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="ผลลัพธ์ขั้นที่ 3" aria-label="ผลลัพธ์ขั้นที่ 3" aria-describedby="button-addon1"></input>
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button" id="button-addon3">ยืนยัน</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="ผลลัพธ์ขั้นที่ 4" aria-label="ผลลัพธ์ขั้นที่ 4" aria-describedby="button-addon1"></input>
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button" id="button-addon4">ยืนยัน</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="ผลลัพธ์ขั้นที่ 5" aria-label="ผลลัพธ์ขั้นที่ 5" aria-describedby="button-addon1"></input>
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button" id="button-addon5">ยืนยัน</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="ผลลัพธ์ขั้นที่ 6" aria-label="ผลลัพธ์ขั้นที่ 6" aria-describedby="button-addon1"></input>
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button" id="button-addon6">ยืนยัน</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default SingleControl