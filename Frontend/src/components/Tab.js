import React from 'react';

const Tab = () => {
    return (
        <div class="container" style={{ margin: `50px` }}>
            <ul class="nav nav-tabs nav-fill nav-pills" >
                <li class="nav-item">
                    <a class="nav-link" href="#"><h5>ข้อมูลผู้ตอบแบบสอบถาม</h5></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#"><h5>ตาราง</h5></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><h5>สัดส่วน</h5></a>
                </li>
            </ul>
        </div>
    )
}

export default Tab;