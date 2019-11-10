import React from 'react';

const Compare = () => {
    return(
      <div className= "container text-center" style={{ marginTop: `100px` }}>
          <h1>ผลลัพธ์</h1>
          <div className="container card" style={{width: '60%', marginTop: `25px`}}>
            <h3>รูปแบบการแสดงผล</h3>
            <div className = "row">
                    <a href='/single'><button type="button" className="btn btn-primary btn-lg" style={{marginRight: '50px'}}>แสดงผลรวม</button></a>
                    <a href='/compare'><button type="button" className="btn btn-success btn-lg">แสดงผลเปรียบเทียบ</button></a>
            </div>
            <div className="container-fluid">
                <h3 style={{marginTop: `25px`}}>กลุ่มตัวอย่าง</h3>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        เลือกกลุ่มตัวอย่าง 1
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" type="button">นักเรียน</button>
                        <button class="dropdown-item" type="button">ข้าราชการ</button>
                        <button class="dropdown-item" type="button">อาจารย์</button>
                    </div>
                </div>
                <div class="dropdown" style={{marginTop: `10px`}}>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        เลือกกลุ่มตัวอย่าง 2
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" type="button">นักเรียน</button>
                        <button class="dropdown-item" type="button">ข้าราชการ</button>
                        <button class="dropdown-item" type="button">อาจารย์</button>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}

export default Compare;