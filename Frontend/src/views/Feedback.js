import React, { Component } from 'react'
import { Button } from 'reactstrap'
import axios from 'axios';
import ListAnswer from '../components/ListAnswer';


export default class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer:[],
            listAnswer:[]
        }
        this.showAnswers = this.showAnswers.bind(this);
    }

    componentDidMount(){
        const surveyId = this.props.surveyId;
        console.log(surveyId);
        axios.get(`http://localhost:5000/answers/find/` + surveyId)
            .then(response => {
                this.setState({
                    answer: response.data,
                    listAnswer: response.data[0].answerUsers
                })

                console.log(this.state.answer[0].answerUsers);
                console.log(this.state.listAnswer);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    showAnswers(){
        /*console.log(this.state.listAnswer);
        return(
            this.state.listAnswer.map(res => {
                return <ListAnswer answer={res} />
            })
        )*/
    }

    render() {
        return (
            <div>
                <h1>เริ่มต้นวิเคราะห์ข้อมูลทางสถิติ</h1>
                <a href={'/survey-management/'+this.props.surveyId+'/analyse/single'} >
                    <button type="button" className="btn btn-outline-primary btn-block btn-lg" style={{ marginTop: `2%` }}>ดูผลลัพธ์</button>
                </a>
                <a href={'/survey-management/'+this.props.surveyId+'/define_analyse'} >
                    <button type="button" className="btn btn-outline-success btn-block btn-lg" style={{ marginTop: `2%` }}>กำหนดผลลัพธ์การแสดงผลลัพธ์เป็นรายบุคคล</button>
                </a>
            </div>
        )
    }
}
