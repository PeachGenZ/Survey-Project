import React, { Component } from 'react';
import axios from 'axios'

class Table1 extends Component {
  constructor(props){
    super(props)
    this.state = {
        survey: "",
        data: "",
        result:{},
        answers:"",
        amountAnswer:"",
    }
  }

  componentDidMount () {
    //get survey มาเพื่อเป็นตัวตั้งต้นเทียบกับ answer
    const surveyId = this.props.surveyId;
    axios.get(`http://localhost:5000/surveys/find/` + surveyId)
      .then(response => {
          this.setState({
              survey: response.data,
              data: JSON.parse(response.data.data),
          })                           
          //console.log(this.state.data)
      })
      .catch((error) => {
          console.log(error);
      })
      //get answer มานับคะแนน
    axios.get(`http://localhost:5000/answers/find/` + surveyId)
    .then(response => {
        this.setState({
          answers: response.data[0].answerUsers,
          amountAnswer:response.data[0].amountAnswer,
        })
        //console.log(this.state.answers)
    })
    .catch((error) => {
        console.log(error);
    })
  }

  prePrecess(){
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
          for(var k = 0; k < this.state.data.pages[i].elements[j].choices.length; k++){
            choices={
              text:this.state.data.pages[i].elements[j].choices[k].text,
              value:this.state.data.pages[i].elements[j].choices[k].value,
              select:0
            }
            choicesArray.push(
              choices
            )
          }
          result={
            name:this.state.data.pages[i].elements[j].name,
            title:this.state.data.pages[i].elements[j].title,
            type:this.state.data.pages[i].elements[j].type,
            choicesArray,
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
          }
        }
      }
    }
  }

  getResult(result){
    //ฟังก์ชันนี้เป็นการคำนวณและจัดรูป object ผลลัพธ์เพื่อนำไปแสดงในตาราง
    let rArray=[]
    let x=0
    let x2=0
    let n=this.state.amountAnswer
      for(var i=0; i<result.length; i++){
        let r={
          name:"",
          score:0,
          mean:0,
          sd:0,
        }

        if(result[i].title){
          r.name=result[i].title
        }else{
          r.name=result[i].name
        }
        for(var j=0; j<result[i].choicesArray.length; j++){
          x += (result[i].choicesArray[j].value * result[i].choicesArray[j].select)
          x2 += Math.pow((result[i].choicesArray[j].value * result[i].choicesArray[j].select), 2)
        }
        r.score=x
        r.mean=(x/n)
        r.sd=Math.sqrt((n*x2-(x*x))/n*(n-1))
        rArray.push(r)
        x = 0
        x2 = 0
      }
    return rArray
  }

  render(){
    //ลอง setState แล้วค่าไม่ยอมอัพเดทเลยเอาตัวแปรมารับแทน
    let prePrecess = this.prePrecess()
    let result = this.getResult(prePrecess)
    //console.log(prePrecess)
    //console.log(result)
    return (
      <div>
        <table className="table table-bordered">
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
                <td className="text-center">{data.score.toFixed(2)}</td>
                <td className="text-center">{data.mean.toFixed(2)}</td>
                <td className="text-center">{data.sd.toFixed(2)}</td>
                <td className="text-center">-</td>
              </tr>
            )
          }) : <tr><td colSpan="6" className="text-center">Loading...</td></tr> }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table1