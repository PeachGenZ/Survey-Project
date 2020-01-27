import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Single = () => {
    const [data, setData] = useState({});

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get('http://127.0.0.1:4013/echo?msg=Srithep');
			setData(response.data);
		}

		fetchData();
		return () => {};
	}, []);

    return(
      <div className= "container text-center" style={{ marginTop: `100px` }}>
          <h1>ผลลัพธ์</h1>
          <div className="container card" style={{width: '60%', marginTop: `25px`}}>
            <h3>รูปแบบการแสดงผล</h3>
            <div className = "row">
                    <a href='/single'><button type="button" className="btn btn-primary btn-lg" style={{marginLeft: '130px'}}>แสดงผลรวม</button></a>
                    <a href='/compare'><button type="button" className="btn btn-success btn-lg" style={{marginLeft: '50px'}}>แสดงผลเปรียบเทียบ</button></a>
            </div>
            <div className="container-fluid">
                <h3 style={{marginTop: `25px`}}>กลุ่มตัวอย่าง</h3>
                <div class="dropdown">
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
          </div>
          <div style={{ marginTop: `100px` }}>
            <h3>{data.msg}</h3>
          </div>
      </div>
    )
}

export default Single;