import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import axios from 'axios';

class ResultSurvey extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            result:"",
            data:"",
            userResultId:"",
        }
    }

    async componentDidMount() {
        const surveyId = this.props.surveyId;
        const name = this.props.name;

        axios.get(`/surveys/find/` + surveyId)
            .then(response => {
                if (response.data.shareTo === "OPEN" || response.data.shareTo === "CLOSE") {
                    this.setState({
                        name: this.props.auth.user.firstname + " " + this.props.auth.user.lastname
                    })
                } else {
                    if (this.props.name !== "") this.setState({ name: name })
                    else this.setState({ name: this.props.auth.user.firstname + " " + this.props.auth.user.lastname })
                }

            })
            .catch((error) => {
                console.log(error);
            })
        
        axios.get(`/userResult/find/` + surveyId)
            .then(response => {
                this.setState({
                    result: response.data[0],
                    userResultId: response.data[0]._id,
            })
        })
        .catch((error) => {
            console.log(error);
        })
        
        axios.get(`/surveys/find/` + surveyId)
      .then(response => {
          this.setState({
              data: JSON.parse(response.data.data),
              already:true,
          })                           
      })
      .catch((error) => {
          console.log(error);
      })


    }

    goToMainPage() {
        window.location = "/requests";
    }

    preProcess(){
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
            
                    resultArray.push(result)
                }
            }
        }
        return resultArray
    }

    calculate(){
        let result=this.preProcess()
        let userScore = 0
        
        if(this.state.data){
            for(var i = 0; i < result.length; i++) {
                for(var j = 0; j < result[i].choicesArray.length; j++){
                    if(result[i].type === 'radiogroup'){
                        if(result[i].choicesArray[j].value === this.props.answer.resultAsString[result[i].name]){
                            userScore+=parseInt(this.props.answer.resultAsString[result[i].name])
                        }
                    }else if(result[i].type === 'checkbox'){
                        for(var l=0; l < this.props.answer.resultAsString[result[i].name].length; l++){
                            if(result[i].choicesArray[j].value === this.props.answer.resultAsString[result[i].name][l]){
                                userScore+=parseInt(this.props.answer.resultAsString[result[i].name][l])
                            }
                        }
                    }
                }
            }
        }
        return userScore
    }

    resultCalculate(userScore){

        if(this.state.result.setResult[0].calculate.gender){
            let maleScore = parseFloat(this.state.result.setResult[0].calculate.gender.male.score)
            let femaleScore = parseFloat(this.state.result.setResult[0].calculate.gender.female.score)

            if(this.state.result.setResult[0].calculate.gender.male.calculate === "บวก"){
                userScore += maleScore
            }
            if(this.state.result.setResult[0].calculate.gender.male.calculate === "ลบ"){
                userScore -= maleScore
            }
            if(this.state.result.setResult[0].calculate.gender.male.calculate === "คูณ"){
                userScore *= maleScore
            }
            if(this.state.result.setResult[0].calculate.gender.male.calculate === "หาร"){
                userScore /= maleScore
            }
            if(this.state.result.setResult[0].calculate.gender.female.calculate === "บวก"){
                userScore += femaleScore
            }
            if(this.state.result.setResult[0].calculate.gender.female.calculate === "ลบ"){
                userScore -= femaleScore
            }
            if(this.state.result.setResult[0].calculate.gender.female.calculate === "คูณ"){
                userScore *= femaleScore
            }
            if(this.state.result.setResult[0].calculate.gender.female.calculate === "หาร"){
                userScore /= femaleScore
            }
        }
        

        if(this.state.result.setResult[0].calculate.ages){
            let age1823 = parseFloat(this.state.result.setResult[0].calculate.ages.age1823.score)
            let age2429 = parseFloat(this.state.result.setResult[0].calculate.ages.age2429.score)
            let age3035 = parseFloat(this.state.result.setResult[0].calculate.ages.age3035.score)
            let age3641 = parseFloat(this.state.result.setResult[0].calculate.ages.age3641.score)
            let age4247 = parseFloat(this.state.result.setResult[0].calculate.ages.age4247.score)
            let age4853 = parseFloat(this.state.result.setResult[0].calculate.ages.age4853.score)
            let age5460 = parseFloat(this.state.result.setResult[0].calculate.ages.age5460.score)
            let age60 = parseFloat(this.state.result.setResult[0].calculate.ages.age60.score)

            if(this.state.result.setResult[0].calculate.ages.age1823.score === "บวก"){
                userScore += age1823
            }
            if(this.state.result.setResult[0].calculate.ages.age1823.score === "ลบ"){
                userScore -= age1823
            }
            if(this.state.result.setResult[0].calculate.ages.age1823.score === "คูณ"){
                userScore *= age1823
            }
            if(this.state.result.setResult[0].calculate.ages.age1823.score === "หาร"){
                userScore /= age1823
            }
            if(this.state.result.setResult[0].calculate.ages.age2429.score === "บวก"){
                userScore += age2429
            }
            if(this.state.result.setResult[0].calculate.ages.age2429.score === "ลบ"){
                userScore -= age2429
            }
            if(this.state.result.setResult[0].calculate.ages.age2429.score === "คูณ"){
                userScore *= age2429
            }
            if(this.state.result.setResult[0].calculate.ages.age2429.score === "หาร"){
                userScore /= age2429
            }
            if(this.state.result.setResult[0].calculate.ages.age3035.score === "บวก"){
                userScore += age3035
            }
            if(this.state.result.setResult[0].calculate.ages.age3035.score === "ลบ"){
                userScore -= age3035
            }
            if(this.state.result.setResult[0].calculate.ages.age3035.score === "คูณ"){
                userScore *= age3035
            }
            if(this.state.result.setResult[0].calculate.ages.age3035.score === "หาร"){
                userScore /= age3035
            }
            if(this.state.result.setResult[0].calculate.ages.age3641.score === "บวก"){
                userScore += age3641
            }
            if(this.state.result.setResult[0].calculate.ages.age3641.score === "ลบ"){
                userScore -= age3641
            }
            if(this.state.result.setResult[0].calculate.ages.age3641.score === "คูณ"){
                userScore *= age3641
            }
            if(this.state.result.setResult[0].calculate.ages.age3641.score === "หาร"){
                userScore /= age3641
            }
            if(this.state.result.setResult[0].calculate.ages.age4247.score === "บวก"){
                userScore += age4247
            }
            if(this.state.result.setResult[0].calculate.ages.age4247.score === "ลบ"){
                userScore -= age4247
            }
            if(this.state.result.setResult[0].calculate.ages.age4247.score === "คูณ"){
                userScore *= age4247
            }
            if(this.state.result.setResult[0].calculate.ages.age4247.score === "หาร"){
                userScore /= age4247
            }
            if(this.state.result.setResult[0].calculate.ages.age4853.score === "บวก"){
                userScore += age4853
            }
            if(this.state.result.setResult[0].calculate.ages.age4853.score === "ลบ"){
                userScore -= age4853
            }
            if(this.state.result.setResult[0].calculate.ages.age4853.score === "คูณ"){
                userScore *= age4853
            }
            if(this.state.result.setResult[0].calculate.ages.age4853.score === "หาร"){
                userScore /= age4853
            }
            if(this.state.result.setResult[0].calculate.ages.age5460.score === "บวก"){
                userScore += age5460
            }
            if(this.state.result.setResult[0].calculate.ages.age5460.score === "ลบ"){
                userScore -= age5460
            }
            if(this.state.result.setResult[0].calculate.ages.age5460.score === "คูณ"){
                userScore *= age5460
            }
            if(this.state.result.setResult[0].calculate.ages.age5460.score === "หาร"){
                userScore /= age5460
            }
            if(this.state.result.setResult[0].calculate.ages.age60.score === "บวก"){
                userScore += age60
            }
            if(this.state.result.setResult[0].calculate.ages.age60.score === "ลบ"){
                userScore -= age60
            }
            if(this.state.result.setResult[0].calculate.ages.age60.score === "คูณ"){
                userScore *= age60
            }
            if(this.state.result.setResult[0].calculate.ages.age60.score === "หาร"){
                userScore /= age60
            }
        }

        if(this.state.result.setResult[0].calculate.status){
            let single = parseFloat(this.state.result.setResult[0].calculate.status.single.score)
            let marry = parseFloat(this.state.result.setResult[0].calculate.status.marry.score)
            let separated = parseFloat(this.state.result.setResult[0].calculate.status.separated.score)

            if(this.state.result.setResult[0].calculate.status.single.score === "บวก"){
                userScore += single
            }
            if(this.state.result.setResult[0].calculate.status.single.score === "ลบ"){
                userScore -= single
            }
            if(this.state.result.setResult[0].calculate.status.single.score === "คูณ"){
                userScore *= single
            }
            if(this.state.result.setResult[0].calculate.status.single.score === "หาร"){
                userScore /= single
            }
            if(this.state.result.setResult[0].calculate.status.marry.score === "บวก"){
                userScore += marry
            }
            if(this.state.result.setResult[0].calculate.status.marry.score === "ลบ"){
                userScore -= marry
            }
            if(this.state.result.setResult[0].calculate.status.marry.score === "คูณ"){
                userScore *= marry
            }
            if(this.state.result.setResult[0].calculate.status.marry.score === "หาร"){
                userScore /= marry
            }
            if(this.state.result.setResult[0].calculate.status.separated.score === "บวก"){
                userScore += separated
            }
            if(this.state.result.setResult[0].calculate.status.separated.score === "ลบ"){
                userScore -= separated
            }
            if(this.state.result.setResult[0].calculate.status.separated.score === "คูณ"){
                userScore *= separated
            }
            if(this.state.result.setResult[0].calculate.status.separated.score === "หาร"){
                userScore /= separated
            }
    
        }
        
        return userScore
    }

    showComponent(){
        let score=this.calculate()
        let resultScore=(this.state.result ? this.resultCalculate(score) :"")
        return (
            <div style={{fontSize:"30px"}}>
                <br/><br/><br/><br/>
                <div className="row text-center">
                    ขอบคุณ {this.state.name !== "NONAME" ? " คุณ"+this.state.name+" ":""} เป็นอย่างมาก
                </div>
                <div className="row text-center">
                    ที่ให้ความร่วมมือในการเก็บข้อมูลเพื่อทำงานวิจัย
                </div>
                <br/>
                <div className="row text-center">
                    <button className="btn btn-success" onClick={this.goToMainPage}>กลับสู่หน้าหลัก</button>
                </div>
            </div>
        )
    }

    showResult(){
        let topic=""
        let description=""
        let score=this.calculate()
        let resultScore=(this.state.result ? this.resultCalculate(score) :"")

        for(let i=0; i<this.state.result.setResult[0].result.length; i++){
            let min=parseFloat(this.state.result.setResult[0].result[i].min) 
            let max=parseFloat(this.state.result.setResult[0].result[i].max) 
            console.log(this.state.result.setResult[0].result[i])
            
            if(resultScore >= min && resultScore <= max){
                topic=this.state.result.setResult[0].result[i].topic 
                description=this.state.result.setResult[0].result[i].description 
            }
        }
        this.sendData(topic)

        return (
            <div className="text-center" style={{marginTop:'17%' , width:'60%', marginLeft:'20%'}} >
                <h1>{topic}</h1>
                <h3>{description}</h3>
            </div>
        )
    }

    sendData(topic){
        let userResult=[topic]

        axios.post(`/userResult/add/${this.state.userResultId}`, userResult)
        .then(res => console.log(res));
    }

    render() {
        return (
            <div>
                {this.state.result ?  this.showResult() : this.showComponent()}
            </div>
        )
    }
}

ResultSurvey.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ResultSurvey);