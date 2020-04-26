import React, { Component } from 'react'
import Agreement from '../../views/Agreement';
import OnlineSurvey from '../../views/OnlineSurvey';
import ResultSurvey from '../../views/ResultSurvey';
import axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            name: "",
            answer:"",
            userResultId:"",
            result:"",
        }
        this.showOnlineSurvey = this.showOnlineSurvey.bind(this)
    }

    componentDidMount() {
        const surveyId = this.props.surveyId;
        axios.get(`/userResult/find/` + surveyId)
            .then(response => {
                this.setState({
                    userResultId: response.data[0]._id,
                    result: response.data[0],
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    checked = data => {
        this.setState({
            step: data.step,
            name: data.name
        })
    }

    onResult=(resultAsString)=>{
        this.setState({
            answer:resultAsString
        })
    }

    showOnlineSurvey() {
        if (this.state.step === 1) return <Agreement surveyId={this.props.match.params.surveyId} checked={this.checked} />
        else if (this.state.step === 2) return <OnlineSurvey surveyId={this.props.match.params.surveyId} name={this.state.name} checked={this.checked} answer={this.onResult} />
        else if(this.state.step === 3) return <ResultSurvey surveyId={this.props.match.params.surveyId} name={this.state.name} answer={this.state.answer} userResultId={this.state.userResultId} result={this.state.result}/>
    }


    render() {

        return (
            <div>
                {this.showOnlineSurvey()}
            </div>
        )
    }
}
