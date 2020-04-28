import React, { Component } from 'react';
import axios from 'axios'
import Bar from '../../../components/analyse/analyse/Bar.js';
import {HorizontalBar} from 'react-chartjs-2';

class Table1 extends Component {
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
        count:0,

        widgetGender:"",
        male:true,
        female:true,
        age1823:true,
        age2429:true,
        age3035:true,
        age3641:true,
        age4247:true,
        age4853:true,
        age5460:true,
        age60:true,
        single:true,
        marry:true,
        separated:true,
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
              sampleCheck: response.data.sampleGroupId,
          })                           

      })
      .catch((error) => {
          console.log(error);
      })


      await axios.get(`/answers/find/` + surveyId)
      .then(response => {
          this.setState({
            answerId:response.data[0]._id,
            answers:response.data[0].answerUsers,
            amountAnswer:response.data[0].amountAnswer,
            widgetGender:response.data[0].answerUsers[0].resultAsString.widgetGender,
          })
      })
      .catch((error) => {
          console.log(error);
      })

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

      await axios.get(`/sampleGroups/` + this.state.sampleCheck)
      .then(response => {
          this.setState({
            sampleCheck: response.data.nameSampleGroup,
          })                        
      })

      .catch((error) => {
          console.log(error);
      })

      if(!this.state.sampleCheck){
        this.setState({
          sampleCheck: "ไม่มีกลุ่มตัวอย่าง",
        })    
      }

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
    
  }

  handleSampleChange = event => {
    this.setState({ 
      sampleCheck : event.target.value ,
      readyId : false
    })

    let sampleName = event.target.value
    let sampleId = ""
    let surveyIds = ""

    for(let i=0; i<this.state.allSample.length; i++){
        if(sampleName === this.state.allSample[i].nameSampleGroup){
          sampleId = this.state.allSample[i]._id
        }else if(sampleName === "ไม่มีกลุ่มตัวอย่าง"){
          sampleId = this.state.noSampleId
        }
    }

    for(let i=0; i<this.state.allSurvey.length; i++){
        if(sampleId === this.state.allSurvey[i].sampleGroupId){
          surveyIds = this.state.allSurvey[i]._id
        }else if(sampleName === "ไม่มีกลุ่มตัวอย่าง"){
          surveyIds = sampleId
        }
    }

    axios.get(`/surveys/find/` + surveyIds)
      .then(response => {
          this.setState({
              survey: response.data,
              data: JSON.parse(response.data.data),
              thisSurvey: response.data,
              surveyName: response.data.nameSurvey,
              surveyId:surveyIds
          })                           
    })
    .catch((error) => {
        console.log(error);
    })
    
    axios.get(`/answers/find/` + surveyIds)
      .then(response => {
          this.setState({
            answerId:response.data[0]._id,
            answers:response.data[0].answerUsers,
            amountAnswer:response.data[0].amountAnswer,
          })
    })
    .catch((error) => {
        console.log(error);
    })

    axios.get(`/analyse/find/${surveyIds}`)
      .then(response => {
          this.setState({
              result:response.data[0],
              analyseId:response.data[0]._id,
              readyId:true,
              ready:1,
              resultBar:response.data[0].result,
              already:true
          })                           
      })
      .catch((error) => {
          console.log(error);
      })
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

  handleCheckboxMale = event => {
    this.setState({ male: event.target.checked })
  }

  handleCheckboxFemale = event => {
    this.setState({ female: event.target.checked })
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
                  <div style={{marginTop:'3%'}}>
                    {this.state.widgetGender ?
                    <label style={{fontSize:'15px'}}>
                      <h4>เพศ</h4>
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.male} onChange={this.handleCheckboxMale}/> ชาย 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.female} onChange={this.handleCheckboxFemale}/> หญิง
                    </label> 
                    :""
                    }
                  </div>

                  <div style={{marginTop:'3%'}}>
                    {this.state.widgetGender ?
                    <label style={{fontSize:'15px'}}>
                      <h4>อายุ</h4>
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age1823} onChange={this.handleCheckboxStatus}/> 18-23 ปี 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age2429} onChange={this.handleCheckboxStatus}/> 24-29 ปี
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age3035} onChange={this.handleCheckboxStatus}/> 30-35 ปี
                      <br/>
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age3641} onChange={this.handleCheckboxStatus}/> 36-41 ปี 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age4247} onChange={this.handleCheckboxStatus}/> 42-47 ปี 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age4853} onChange={this.handleCheckboxStatus}/> 48-53 ปี 
                      <br/>
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age5460} onChange={this.handleCheckboxStatus}/> 54-60 ปี
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.age60} onChange={this.handleCheckboxStatus}/> มากกว่า 60 ปี 

                    </label> 
                    :""
                    }
                  </div>
                  
                  <div style={{marginTop:'3%'}}>
                    {this.state.widgetGender ?
                    <label style={{fontSize:'15px'}}>
                      <h4>สถานภาพ</h4>
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.single} onChange={this.handleCheckboxStatus}/> โสด 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.marry} onChange={this.handleCheckboxStatus}/> สมรส
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      <input type="checkbox" style={{ width: 15, height: 15 }} checked={this.state.separated} onChange={this.handleCheckboxStatus}/> หย่าร้าง,หม้าย,แยกกันอยู่
                    </label> 
                    :""
                    }
                  </div>
                  <hr/>
                  <div>
                    <h4 style={{marginTop:'3%'}}>กลุ่มตัวอย่าง</h4>
                    <select className="form-control text-center" value={this.state.sampleCheck} onChange={this.handleSampleChange} style={{width: '25%', margin:'auto', textAlign:'center'}}>
                        { (this.state.sampleName) ? this.state.sampleName.map( (data, index) => {
                            return (
                                    <option key={index} value={data}>{data}</option>
                            )
                            }) : ""}
                    </select>
                  </div>
                  
              </div>
          </div>
          <hr/>
      </div> 
    )
  }

  showSurvey(){
    let preProcess = this.preProcess()
    let showArray=[]
    for(var i=0; i<preProcess.length; i++){
      let topic=""
      let min=""
      let max=""
      let choice=[]

      min=preProcess[i].min
      max=preProcess[i].max

      if(preProcess[i].title){
        topic=preProcess[i].title
      }else{
        topic=preProcess[i].name
      }
      for(var j=0; j<preProcess[i].choicesArray.length; j++){
        choice.push(
          <p><b style={{ color: '#289e00' }}>ตัวเลือกที่ {j+1}:</b> {preProcess[i].choicesArray[j].text} ({preProcess[i].choicesArray[j].value} คะแนน) ตอบข้อนี้ {preProcess[i].choicesArray[j].select} จำนวน </p>
        )
      }

      showArray.push(
      <div>
        <h4><i className="fa  fa-arrow-circle-o-right"/> คำถามที่ {i+1} {topic}</h4>
        <p style={{fontSize:16}}>{choice}</p>
      </div>
      )
    }
    return showArray
  }

  showLinkertScale(){
    let resultArray = []
    let topic=""
    
    if(this.state.result.preProcess){
      for(let i=0; i< this.state.result.preProcess.length; i++){
        let result=[]
        if(this.state.result.preProcess[i].title){
          topic=this.state.result.preProcess[i].title
        }else{
          topic=this.state.result.preProcess[i].name
        }

        for(let j=0; j< this.state.result.preProcess[i].linkertScale.length; j++){
          result.push(
            <p>{this.state.result.preProcess[i].linkertScale[j].topic}:{this.state.result.preProcess[i].linkertScale[j].min.toFixed(2)} - {this.state.result.preProcess[i].linkertScale[j].max.toFixed(2)} </p>
          )
        }
        resultArray.push(
        <div>
          <h4><i className="fa  fa-arrow-circle-o-right"/> คำถามที่ {i+1} {topic}</h4>
          <p style={{fontSize:16}}>{result}</p>
        </div>
        )
      }
    }
    return resultArray
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

  getData(){
    let preProcess = this.preProcess()
    let result = this.getResult(preProcess)
    let value=[]
    if(result){
      for(let i=0; i<result.length; i++){
        if(result[i].mean != null){
          value.push(result[i].mean.toFixed(3))
        }
      }
    }
    return value
  }

  showComponent(){
    let labels=this.getLabels()
    let value=this.getData()

    const data = {
        labels: labels,
        datasets: [
            {
              label: this.state.sampleCheck,
              backgroundColor: 'rgba(0, 168, 255,0.5)',
              borderColor: 'rgba(0, 142, 226)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: value
            },
        ]
    };

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
    this.calculateScore(resultArray)
    return resultArray
  }


  calculateScore(result){
    if(this.state.answers){
      for(var i = 0; i < result.length; i++) {
        for(var j = 0; j < result[i].choicesArray.length; j++){
          for(var k = 0; k < this.state.answers.length; k++){
            if(this.state.male === true){
              if(result[i].type === 'radiogroup' && this.state.answers[k].resultAsString.widgetGender === "ชาย"){
                if(result[i].choicesArray[j].value === this.state.answers[k].resultAsString[result[i].name]){
                  result[i].choicesArray[j].select++
                }
              }
              else if(result[i].type === 'checkbox' && this.state.answers[k].resultAsString.widgetGender === "ชาย"){
                for(var l=0; l < this.state.answers[k].resultAsString[result[i].name].length; l++){
                  if(result[i].choicesArray[j].value === this.state.answers[k].resultAsString[result[i].name][l]){
                    result[i].choicesArray[j].select++
                  }
                }
              }
            }

            if(this.state.female === true){
              if(result[i].type === 'radiogroup' && this.state.answers[k].resultAsString.widgetGender === "หญิง"){
                if(result[i].choicesArray[j].value === this.state.answers[k].resultAsString[result[i].name]){
                  result[i].choicesArray[j].select++
                }
              }
              else if(result[i].type === 'checkbox' && this.state.answers[k].resultAsString.widgetGender === "หญิง"){
                for(var l=0; l < this.state.answers[k].resultAsString[result[i].name].length; l++){
                  if(result[i].choicesArray[j].value === this.state.answers[k].resultAsString[result[i].name][l]){
                    result[i].choicesArray[j].select++
                  }
                }
              }
            }

            /*else{
              if(result[i].type === 'radiogroup'){
                if(result[i].choicesArray[j].value === this.state.answers[k].resultAsString[result[i].name]){
                  result[i].choicesArray[j].select++
                }
              }
              else if(result[i].type === 'checkbox'){
                for(var l=0; l < this.state.answers[k].resultAsString[result[i].name].length; l++){
                  if(result[i].choicesArray[j].value === this.state.answers[k].resultAsString[result[i].name][l]){
                    result[i].choicesArray[j].select++
                  }
                }
              }
              count++
            }*/
          }
        }
      }
    }
  }

  count(){
    let count = 0
      if(this.state.answers){
        for(var i = 0; i < this.state.answers.length; i++){
          if(this.state.male === true){
            if(this.state.answers[i].resultAsString.widgetGender === "ชาย"){
              count++;
            }
          }
          if(this.state.female === true){
            if(this.state.answers[i].resultAsString.widgetGender === "หญิง"){
              count++
            }
          }
        }
      }
      return count 
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
          min:0,
          max:0,
          score:0,
          mean:0,
          sd:0,
          details:"",
        }

        r.min = parseInt(preProcess[i].min)
        r.max = parseInt(preProcess[i].max)

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

  async sendData(preProcess,result){
      if(!this.state.result){
        try {
          const answerId = this.state.answerId
          const surveyId = this.props.surveyId
          const createAnalyse = {
            answerId:answerId,
            surveyId:surveyId,
            preProcess:preProcess,
            result:result,
            amountAnswer:this.state.amountAnswer
          }
          await axios.post(`/analyse/create/`, createAnalyse)
          console.log('👉 create data');
        } catch (e) {
          console.log(`😱 Axios request failed: ${e}`);
        }
      }
      else if(this.state.readyId){
        try {
          const analyse = {
            preProcess:preProcess,
            result:result,
            amountAnswer:this.state.amountAnswer
          }
          axios.post(`/analyse/edit/${this.state.analyseId}`, analyse)
          console.log('👉 Returned data');
        } catch (e) {
          console.log(`😱 Axios request failed: ${e}`);
        }
      }
  }

  render(){
    let preProcess = this.preProcess()
    let result = this.getResult(preProcess)
    let count = this.count(preProcess)
    {(this.state.answers) ? this.sendData(preProcess,result) : console.log("Not send data")}

    return (
      <div>
        {this.showControl()}
        

        <h2 className="text-center" style={{marginTop:'5%'}}>กลุ่มตัวอย่าง: {this.state.sampleCheck}</h2>
        <h2 className="text-center">(จำนวนคำตอบ {count} รายการ)</h2>
          {this.showComponent()}
        <div className="box box-success with-border"  style={{marginTop:'3%'}}>
          <table className="table table-bordered" >
            <thead>
              <tr>
                <th scope="col" className="text-center">ลำดับ</th>
                <th scope="col" className="text-center">คำถาม</th>
                <th scope="col" className="text-center">คะแนนต่ำสุด</th>
                <th scope="col" className="text-center">คะแนนสูงสุด</th>
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
                  <td className="text-center">{(data.min) ? data.min.toFixed(2)*count : "0"}</td>
                  <td className="text-center">{(data.max) ? data.max.toFixed(2)*count : "0"}</td>
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
        { this.state.linkertScale.length !== 0 ?
          <div className="box box-success with-border" style={{marginTop:'5%'}}>
            <h3 className="text-center" style={{marginBottom:'2%'}}>ช่วงคะแนนการแปลความ</h3>
            {this.showLinkertScale()}
          </div>:""}
        <div className="box box-success with-border" style={{marginTop:'5%',marginBottom:'15%'}}>
          <h3 className="text-center" style={{marginBottom:'2%'}}>ข้อมูลแบบสอบถาม</h3>
          {this.showSurvey()}
        </div>
      </div>

    );
  }
}

export default Table1