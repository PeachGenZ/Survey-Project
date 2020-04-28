import React, { Component } from 'react';
import axios from 'axios'
import Bar from '../../../components/analyse/analyse/Bar.js';
import {HorizontalBar} from 'react-chartjs-2';

class Table2 extends Component {
  constructor(props){
    super(props)
    this.state = {
        surveyId:this.props.surveyId,
        survey: "",
        data: "",
        analyseId:"",
        readyId:false,
        result: "",
        answerId:"",
        answers:"",
        amountAnswer:"",
        linkertScale:"",

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
        noSampleId:"",
        resultBar:"",
        already:false,

        widgetGender:"",
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount () {
    //get survey มาเพื่อเป็นตัวตั้งต้นเทียบกับ answer
    const surveyId = this.props.surveyId;
    await axios.get(`/surveys/find/` + surveyId)
      .then(response => {
          this.setState({
              survey: response.data,
              data: JSON.parse(response.data.data),
              thisSurvey: response.data,
              projectId: response.data.projectId,
              surveyName: response.data.nameSurvey,
          })                           

      })
      .catch((error) => {
          console.log(error);
      })

      axios.get(`/answers/find/` + surveyId)
      .then(response => {
          this.setState({
            answerId:response.data[0]._id,
            answers:response.data[0].answerUsers,
            amountAnswer:response.data[0].amountAnswer,
            widgetGender:response.data[0].answerUsers[0].resultAsString.widgetGender
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
          if(this.state.allSurvey[i].sampleGroupId === ""){
              this.setState({
                noSampleId:this.state.allSurvey[i]._id
              })
          }
      }
      this.setState({
          surveySample:sample
      })

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

      //get answer มานับคะแนน
    await axios.get(`/analyse/find/` + surveyId)
      .then(response => {
          this.setState({
              result:response.data[0],
              linkertScale:response.data[0].linkertScale,
              analyseId:response.data[0]._id,
              readyId:true,
              ready:1,
              resultBar:response.data[0].result,
              already:true,
          })                           
      })
      .catch((error) => {
          console.log(error);
      })
  }

  getTableData(){
    let resultArray = []
    for(let i=0; i<this.state.answerSample.length; i++){
      let preProcess = this.preProcess()
      let preResult = ""
      let result = ""
      let countAnswer = this.state.answerSample[i].amountAnswer
      let answer = this.state.answerSample[i].answerUsers
      preResult = this.calculateScore(preProcess,answer)
      result = this.getResult(preResult)
      resultArray.push(
        <div style={{marginTop:'5%'}}>
          <h2 className="text-center">กลุ่มตัวอย่าง: {this.state.sampleName[i]}</h2>
          <h2 className="text-center">(จำนวนคำตอบ {countAnswer} แบบสอบถาม)</h2>
          <table className="table table-bordered" style={{marginTop:'1%'}}>
            <thead>
              <tr>
                <th scope="col" className="text-center">ลำดับ</th>
                <th scope="col" className="text-center">คำถาม</th>
                <th scope="col" className="text-center">คะแนนที่ได้</th>
                <th scope="col" className="text-center">ค่าเฉลี่ยคะแนน</th>
                <th scope="col" className="text-center">ส่วนเบี่ยงเบนมาตรฐาน</th>
                <th scope="col" className="text-center">แปลความ</th>
              </tr>
            </thead>
            <tbody>
            { (result != undefined) ? result.map( (data, index) => {
              return (
                <tr key={ index }>
                  <td className="text-center">{ index+1 }</td>
                  <td className="text-center">{data.name}</td>
                  <td className="text-center">{(data.score) ? data.score.toFixed(2) : "0"}</td>
                  <td className="text-center">{(data.mean) ? data.mean.toFixed(2) : "0"}</td>
                  <td className="text-center">{(data.sd) ? data.sd.toFixed(2) : "0"}</td>
                  <td className="text-center">{(data.details) ? data.details : "-"}</td>
                </tr>
              )
            }) : <tr><td colSpan="6" className="text-center">Loading...</td></tr> }
            </tbody>
          </table>
        </div>
      )
    }
    return resultArray
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

  Filter(){
    
  }

  showControl() {
    return (
      <div className="text-center">
          <div className="container" style={{width: '60%', marginTop: `25px`}}>
                  <h3 style={{marginTop: `15px`}}>เลือกรูปแบบการแสดงผล</h3>
              <div className = "row" style={{marginTop: `15px`,marginBottom: `20px`}}>
                  <a href='single'><button type="button" className="btn btn-primary btn-lg">แสดง 1 กลุ่มตัวอย่าง</button></a>
                  <a href='compare'><button type="button" className="btn btn-primary btn-lg" style={{marginLeft: '10%'}}>แสดงทุกกลุ่มตัวอย่าง</button></a>
              </div>
          </div>
          <hr/>
          <div className="container card" style={{width: '60%', marginTop: `25px`, magin:'auto'}}>
              <form onSubmit={this.onSubmit}>
                  <h3 style={{marginTop: `25px`}}>แปลความข้อมูล</h3>
                  <p style={{ color: '#79a0d2' }}>*ฟังก์ชันการแปลความใช้ได้ดีก็ต่อเมื่อทุกคำถามมีจำนวนตัวเลือกและค่าของตัวเลือกเท่ากัน</p>
                  <input type="text" className="form-control" placeholder="ป้อนผลลัพธ์" aria-label="ป้อนผลลัพธ์" ref='result'></input>
                  <p style={{marginTop:'1%'}}>ผลลัพธ์ที่บันทึกไว้: {this.state.linkertScale + "  "}  </p>
                  <button className="btn btn-success btn-lg" style={{margin: `15px`}} >ยืนยัน</button>
              </form>
          </div>
          <hr/>
          <div className="container card" style={{width: '60%', marginTop: `25px`}}>
              <div className="container-fluid">
                  <h3 style={{marginTop: `10px`}}>Filter<i className="fa fa-filter"/></h3>
                  
                  {this.state.widgetGender ?
                  
                  <label style={{fontSize:'15px'}}>
                    <h4 style={{marginTop:'3%'}}>เพศ</h4>
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> ชาย 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> หญิง
                  </label> 
                  :""
                  }

                  <h4 style={{marginTop:'3%'}}>อายุ</h4>
                  {this.state.widgetGender ?
                  <label style={{fontSize:'15px'}}>
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> 18-23 ปี 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> 24-29 ปี
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> 30-35 ปี
                    <br/>
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> 36-41 ปี 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> 42-47 ปี 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> 48-53 ปี 
                    <br/>
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> 54-60 ปี
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> มากกว่า 60 ปี 

                  </label> 
                  :""
                  }

                  <h4 style={{marginTop:'3%'}}>สถานภาพ</h4>
                  {this.state.widgetGender ?
                  <label style={{fontSize:'15px'}}>
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> โสด 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> สมรส
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> หย่าร้าง,หม้าย,แยกกันอยู่
                  </label> 
                  :""
                  }
              </div>
          </div>
          <hr/>
          <hr/>
      </div> 
    )
  }

  getLabels(){
    let preProcess = this.preProcess()
    let result = this.getResult(preProcess)
    let labels=[]
    if(result){
      for(let i=0; i<result.length; i++){
        labels.push(result[i].name)
      }
    }
    return labels
  }

  getValue(data){
    let value=[]
    if(data){
      for(let i=0; i<data.length; i++){
        if(data[i].mean != null){
          value.push(data[i].mean.toFixed(3))
        }
      }
    }
    return value
  }

  showComponent(){
    let labels=this.getLabels()
    let resultArray = []
    for(let i=0; i<this.state.answerSample.length; i++){
      let preProcess = this.preProcess()
      let preResult = ""
      let result = ""
      let value = ""
      let answer = this.state.answerSample[i].answerUsers
      preResult = this.calculateScore(preProcess,answer)
      result = this.getResult(preResult)
      value = this.getValue(result)
      
      if(i===0){
        resultArray.push(
          {
            label: `${this.state.sampleName[i]}`,
            backgroundColor: 'rgba(0, 168, 255,0.5)',
            borderColor: 'rgba(0, 142, 226)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data:value
          },
        )
      }

      if(i===1){
        resultArray.push(
          {
            label: `${this.state.sampleName[i]}`,
            backgroundColor: 'rgba(255, 184, 31, 1)',
            borderColor: 'rgba(255, 174, 0, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 190, 51, 1)',
            hoverBorderColor: 'rgba(255, 177, 10, 1)',
            data:value
          },
        )
      }

      if(i===2){
        resultArray.push(
          {
            label: `${this.state.sampleName[i]}`,
            backgroundColor: 'rgba(191, 255, 41, 1)',
            borderColor: 'rgba(178, 255, 0, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(189, 255, 36, 1)',
            hoverBorderColor: 'rgba(180, 255, 5, 1)',
            data:value
          },
        )
      }
    }

    const data = {
        labels: labels,
        datasets: resultArray
    }
    
    return (
      <div className="chart">
          <h2>แผนภูมิที่พล็อตจากค่าเฉลี่ย</h2>
          <HorizontalBar data={data}/>
      </div> 
    )
  }

  preProcess(){
    //ฟังก์ชันนี้เป็นการนับคะแนนที่กระจัดกระจายอยู่แล้วรวมเป็น object เดียว
    let length=0
    let resultArray=[]
    let choicesArray=[]
    let result={
      name:"",
      title:"",
      type: "",
      choicesArray,
    }
    let choices={
      text: "",
      value: "",
      select: Number,
    }

    if(this.state.data.pages){
      length=this.state.data.pages.length

      for(var i = 0; i < length; i++) {

        for(var j = 0; j < this.state.data.pages[i].elements.length; j++){
          choicesArray=[]
          let min=0
          let max=0
          let linkertScale=[]
          for(var k = 0; k < this.state.data.pages[i].elements[j].choices.length; k++){
            if(this.state.data.pages[i].elements[j].type === "radiogroup"){
              if(min > this.state.data.pages[i].elements[j].choices[k].value){
                min=this.state.data.pages[i].elements[j].choices[k].value
              }

              if(max < this.state.data.pages[i].elements[j].choices[k].value){
                max=this.state.data.pages[i].elements[j].choices[k].value
              }
            }

            if(this.state.data.pages[i].elements[j].type === "checkbox"){
              if(min > this.state.data.pages[i].elements[j].choices[k].value){
                min=this.state.data.pages[i].elements[j].choices[k].value
              }
                max+=parseInt(this.state.data.pages[i].elements[j].choices[k].value)
            }
            
            choices={
              text:this.state.data.pages[i].elements[j].choices[k].text,
              value:this.state.data.pages[i].elements[j].choices[k].value,
              select:0
            }
            choicesArray.push(
              choices
            )
          }

          linkertScale=this.findLinkertScale(min,max)
          result={
            name:this.state.data.pages[i].elements[j].name,
            title:this.state.data.pages[i].elements[j].title,
            type:this.state.data.pages[i].elements[j].type,
            choicesArray,
            min,
            max,
            linkertScale
          }

          resultArray.push(
            result
          )
        }
      }
    }
    return resultArray
  }

  calculateScore(result,answers){
    if(answers){
      for(let i = 0; i < result.length; i++) {
        for(let j = 0; j < result[i].choicesArray.length; j++){
          for(let k = 0; k < answers.length; k++){
            if(result[i].type === 'radiogroup'){
              if(result[i].choicesArray[j].value === answers[k].resultAsString[result[i].name]){
                result[i].choicesArray[j].select++
              }
            }
            else if(result[i].type === 'checkbox'){
              for(let l=0; l < answers[k].resultAsString[result[i].name].length; l++){
                if(result[i].choicesArray[j].value === answers[k].resultAsString[result[i].name][l]){
                  result[i].choicesArray[j].select++
                }
              }
            }
          }
        }
      }
    }
    return result
  }

  findLinkertScale(choiceMin,choiceMax){
    let resultArray=[]
    let min = 0
    let max = 0
    for(let i=0; i<this.state.linkertScale.length; i++){
      let rage=0
      rage = ((choiceMax - choiceMin)/this.state.linkertScale.length).toFixed(2)
      if(i===0){
        min=choiceMin
        max=choiceMin + parseFloat(rage)
      }else if(this.state.linkertScale.length - i == 1){
        min=max+0.01
        max+=(parseFloat(rage))+0.01
      }else{
        min=max+0.01
        max+=parseFloat(rage)
      }
      let result={
        topic:this.state.linkertScale[i],
        min,
        max,
      }
      resultArray.push(result)
    }
    return resultArray
  }

  getResult(preProcess){
    //ฟังก์ชันนี้เป็นการคำนวณและจัดรูป object ผลลัพธ์เพื่อนำไปแสดงในตาราง
    let rArray=[]
    let x=0 
    let x2=0 //x กำลัง 2
    let n=this.state.amountAnswer
      for(var i=0; i<preProcess.length; i++){
        let r={
          name:"",
          score:0,
          mean:0,
          sd:0,
          details:"",
        }

        if(preProcess[i].title){
          r.name=preProcess[i].title
        }else{
          r.name=preProcess[i].name
        }

        for(var j=0; j<preProcess[i].choicesArray.length; j++){
          x += (preProcess[i].choicesArray[j].value * preProcess[i].choicesArray[j].select)
          x2 += Math.pow((preProcess[i].choicesArray[j].value * preProcess[i].choicesArray[j].select), 2)
        }

        r.score=x
        r.mean=(x/n)
        r.sd=Math.sqrt((n*x2-(x*x))/n*(n-1))
        rArray.push(r)
        x = 0
        x2 = 0

        for(let k=0; k<preProcess[i].linkertScale.length; k++){
          if(r.mean >= preProcess[i].linkertScale[k].min && r.mean <= preProcess[i].linkertScale[k].max){
            r.details = preProcess[i].linkertScale[k].topic
          }
        }
      }
    return rArray
  }

  render(){
    let preProcess = this.preProcess()
    this.getTableData()
    return (
      <div style={{marginBottom:'15%'}}>
          {this.showControl()}
          {this.showComponent()}
        <div>
          {this.getTableData()}
        </div>
      </div>

    );
  }
}

export default Table2