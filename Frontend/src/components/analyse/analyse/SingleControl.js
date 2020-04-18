import React,{Component} from 'react';
import axios from 'axios'

class SingleControl extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            linkertScale:"",
            analyseId:"",
        }
    }

    componentDidMount () {
        const surveyId = this.props.surveyId;
        axios.get(`/analyse/find/` + surveyId)
          .then(response => {
              this.setState({
                  linkertScale:response.data[0].linkertScale,
                  analyseId:response.data[0]._id
              })                           
          })
          .catch((error) => {
              console.log(error);
          })
    }

    onSubmit() {
        try {
            var text = this.refs.result
            const textSplit = {
                linkertScale:text.value.split(',')
            }
            axios.post(`/analyse/add/${this.state.analyseId}`, textSplit)
            //console.log('👉 Success');
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    render(){
        return (
            <div>
                <div className="container" style={{width: '60%', marginTop: `25px`}}>
                        <h3 style={{marginTop: `15px`}}>เลือกรูปแบบการแสดงผล</h3>
                    <div className = "row" style={{marginTop: `15px`,marginBottom: `20px`}}>
                        <a href='single'><button type="button" className="btn btn-primary btn-lg">แสดง 1 กลุ่มตัวอย่าง</button></a>
                        <a href='compare'><button type="button" className="btn btn-primary btn-lg" style={{marginLeft: '10%'}}>แสดงทุกกลุ่มตัวอย่าง</button></a>
                    </div>
                </div>
                <hr/>
                <div className="container card" style={{width: '60%', marginTop: `25px`}}>
                    <div className="container-fluid">
                        <h3 style={{marginTop: `25px`}}>กลุ่มตัวอย่าง</h3>
                            <div className="dropdown" style={{margin: `20px`}}>
                            </div>
                    </div>
                </div>
                <hr/>
                <div className="container card" style={{width: '60%', marginTop: `25px`}}>
                    <div>
                        <h3 style={{marginTop: `25px`}}>แปลความข้อมูล</h3>
                        <p style={{ color: '#79a0d2' }}>*ฟังก์ชันการแปลความใช้ได้ดีก็ต่อเมื่อทุกคำถามมีจำนวนตัวเลือกและค่าของตัวเลือกเท่ากัน</p>
                        <input type="text" className="form-control" placeholder="ป้อนผลลัพธ์" aria-label="ป้อนผลลัพธ์" ref='result'></input>
                        <button type="button" className="btn btn-success btn-lg" style={{margin: `15px`}} onClick={() => this.onSubmit()}>ยืนยัน</button>
                    </div>
                </div>
                <hr/>
            </div> 
        )
    }
}
  
  export default SingleControl