import React,{Component} from 'react';
import { Dropdown,DropdownButton } from 'react-bootstrap';

class SingleControl extends Component {
    constructor() {
        super();
        this.state = {
            add: [],
        };
    }
    addInputField = event => {
        const add = this.state.add;
        const size = add.length + 1;
        add.push(size);
        this.setState({
            add
        });
        event.preventDefault();
    };
    addChildInputField = event => {
        const addChild = this.state.addChild;
        const size = addChild.length + 1;
        addChild.push(size);
        this.setState({
          addChild
        });
        event.preventDefault();
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render(){
        return (
            <div className="container card" style={{width: '60%', marginTop: `25px`}}>
                    <h3 style={{marginTop: `15px`}}>รูปแบบการแสดงผล</h3>
                <div className = "row" style={{marginTop: `15px`}}>
                    <a href='single'><button type="button" className="btn btn-primary btn-lg" style={{marginLeft: '125px'}}>แสดง 1 กลุ่มตัวอย่าง</button></a>
                    <a href='compare'><button type="button" className="btn btn-success btn-lg" style={{marginLeft: '50px'}}>แสดงทุกกลุ่มตัวอย่าง</button></a>
                </div>
                <div className="container-fluid">
                    <hr/>
                    <h3 style={{marginTop: `25px`}}>กลุ่มตัวอย่าง</h3>
                        <div className="dropdown" style={{marginTop: `15px`}}>
                            <DropdownButton id="dropdown-basic-button" title="เลือกกลุ่มตัวอย่าง" variant="light">
                                <Dropdown.Item href="#/action-1">กลุ่มตัวอย่างที่ 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">กลุ่มตัวอย่างที่ 2</Dropdown.Item>
                            </DropdownButton>
                        </div>
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
}
  
  export default SingleControl