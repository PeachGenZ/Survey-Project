import React, { Component } from 'react';

class Tab extends Component  {
    render() {
        return (
            <div className="container" style={{ margin: `50px` }}>
                <ul className="nav nav-tabs nav-fill nav-pills" >
                    <li className="nav-item">
                        <a className="nav-link" href="/informations"><h5>ข้อมูลผู้ตอบแบบสอบถาม</h5></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/single"><h5>ตาราง</h5></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/proportion"><h5>สัดส่วน</h5></a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Tab;