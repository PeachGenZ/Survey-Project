import React, { Component } from 'react';


class Tab extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            active:"",
        }
    }
    activeTab(tab){
        this.setState({
            active:tab
        })
        console.log(this.state.active)
    }

    render() {
        return (
            <div style={{ margin: `50px` }}>
                <ul className="nav nav-tabs nav-justified" >
                    <li className={(this.props.tab === "tab1") ? "nav-item active":"nav-item"}>
                        <a className="nav-link" href="informations"><h3>ข้อมูลผู้ตอบแบบสอบถาม</h3></a>
                    </li>
                    <li className={(this.props.tab === "tab2") ? "nav-item active":"nav-item"}>
                        <a className="nav-link" href="single"><h3>ตาราง</h3></a>
                    </li>
                    <li className={(this.props.tab === "tab3") ? "nav-item active":"nav-item"}>
                        <a className="nav-link" href="proportion"><h3>สัดส่วน</h3></a>
                    </li>
                    <li className={(this.props.tab === "tab4") ? "nav-item active":"nav-item"}>
                        <a className="nav-link" href="report"><h3>ผลลัพธ์รายบุคคล</h3></a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Tab;