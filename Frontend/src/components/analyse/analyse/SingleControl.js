import React,{Component} from 'react';
import axios from 'axios'

class SingleControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkertScale:"",
            analyseId:"",
            projectId:"",
            answerSample:"",
            surveySample:"",
            thisSurvey:"",
            allSurvey:"",
            allSample:"",
            allAnswer:"",
            surveyName:"",
            sampleName:"",
            sampleCheck:"",
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount () {
        const surveyId = this.props.surveyId;
        await axios.get(`/analyse/find/` + surveyId)
          .then(response => {
              this.setState({
                  linkertScale:response.data[0].linkertScale,
                  analyseId:response.data[0]._id
              })                           
          })
          .catch((error) => {
              console.log(error);
          })
        
        await axios.get(`/surveys/find/` + surveyId)
        .then(response => {
            this.setState({
                thisSurvey: response.data,
                projectId: response.data.projectId,
                surveyName: response.data.nameSurvey,
            })                           
        })
        .catch((error) => {
            console.log(error);
        })


        const projectId = this.state.projectId
        await axios.get(`/surveys/` + projectId)
        .then(response => {
            this.setState({
                allSurvey: response.data,
            })                        
        })
        .catch((error) => {
            console.log(error);
        })
        

        await axios.get(`/sampleGroups/` + projectId)
        .then(response => {
            this.setState({
                allSample: response.data,
            })                        
        })
        .catch((error) => {
            console.log(error);
        })
        
        //คัดกลุ่มตัวอย่าง
        let sample=[]
        for(let i=0; i<this.state.allSurvey.length; i++){
            if(this.state.allSurvey[i].nameSurvey === this.state.surveyName){
                sample.push(this.state.allSurvey[i])
            }
        }
        this.setState({
            surveySample:sample
        })
        console.log(this.state.surveySample)

        let answerSample=[]
        for(let i=0; i<sample.length; i++){
            let surveyId=sample[i]._id
            axios.get(`/answers/find/` + surveyId)
                    .then(response => {
                        answerSample.push(response.data[0])
                    })
        }
        this.setState({
            answerSample:answerSample
        })
        console.log(this.state.answerSample)

        let sampleName=[]
        for(let i=0; i<sample.length; i++){
            for(let j=0; j<this.state.allSample.length; j++){
                if(sample[i].sampleGroupId === this.state.allSample[j]._id){
                    sampleName.push(this.state.allSample[j].nameSampleGroup) 
                }
            }
            if(sample[i].sampleGroupId === ""){
                sampleName.push("ไม่มีกลุ่มตัวอย่าง")
            }
        }
        this.setState({
            sampleName:sampleName
        })
        console.log(this.state.sampleName)
    }

    handleSampleChange = event => {
        this.setState({ sampleCheck : event.target.value })
        let sampleId
        let surveyId
        for(let i=0; i<this.state.allSample.length; i++){
            if(event.target.value === this.state.allSample[i].nameSampleGroup){
                sampleId = this.state.allSample[i]._id
            }
        }
        for(let i=0; i<this.state.allSample.length; i++){
            if(sampleId === this.state.allSurvey[i].sampleGroupId){
                surveyId = this.state.allSurvey[i]._id
            }
        }
        
        if(this.props.findAnswerId){
            this.props.findAnswerId(surveyId)
        }
    }

    onSubmit() {
        try {
            let text = this.refs.result
            const textSplit = {
                linkertScale:text.value.split(','),
            }
            axios.post(`/analyse/add/${this.state.analyseId}`, textSplit)
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
                        <select className="form-control text-center" value={this.state.sampleCheck} onChange={this.handleSampleChange} style={{width: '25%', margin:'auto', textAlign:'center'}}>
                            { (this.state.sampleName) ? this.state.sampleName.map( (data, index) => {
                                return (
                                        <option key={index} value={data}>{data}</option>
                                )
                                }) : ""}
                        </select>
                    </div>
                </div>
                <hr/>
                <div className="container card" style={{width: '60%', marginTop: `25px`}}>
                <form onSubmit={this.onSubmit}>
                        <h3 style={{marginTop: `25px`}}>แปลความข้อมูล</h3>
                        <p style={{ color: '#79a0d2' }}>*ฟังก์ชันการแปลความใช้ได้ดีก็ต่อเมื่อทุกคำถามมีจำนวนตัวเลือกและค่าของตัวเลือกเท่ากัน</p>
                        <input type="text" className="form-control" placeholder="ป้อนผลลัพธ์" aria-label="ป้อนผลลัพธ์" ref='result'></input>
                        <p style={{marginTop:'1%'}}>ผลลัพธ์ที่บันทึกไว้: {this.state.linkertScale + "  "}  </p>
                        <button className="btn btn-success btn-lg" style={{margin: `15px`}} >ยืนยัน</button>
                    </form>
                </div>
                <hr/>
            </div> 
        )
    }
}
  
  export default SingleControl