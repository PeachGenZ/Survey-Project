import React, { Component } from 'react'
import axios from 'axios';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            project: [],
            already: false,
            dateToDo: []
        };
        this.showComponent = this.showComponent.bind(this);
    }

    async componentDidMount() {
        const surveyId = this.props.surveyId;
        await axios.get(`/surveys/find/` + surveyId)
            .then(response => {
                this.setState({
                    survey: response.data,
                })
                console.log(this.state.survey);

            })
            .catch((error) => {
                console.log(error);
            })

        if (await this.state.survey.frequency.amount !== 0) {
            axios.get(`/frequency/find/` + surveyId)
                .then(response => {
                    this.setState({
                        dateToDo: response.data[0].listTimeToDo,
                    })
                    console.log(this.state.dateToDo);

                })
                .catch((error) => {
                    console.log(error);
                })
        }

        await axios.get(`/projects/find/` + this.state.survey.userId)
            .then(response => {
                this.setState({
                    project: response.data,
                    already: true
                })
                console.log(this.state.project[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    showComponent(){
        return (
            <div>
                <section className="content-header text-center">
                    <div style={{fontSize:"40px"}}>วิเคราะห์ข้อมูล</div>
                </section>
                <section className="content text-center">
                    <a href={'/survey-management/'+this.props.surveyId+'/analyse/single'} >
                        <button type="button" className="btn-lg btn-success" style={{ marginTop: `1%` }}><h4>ดูผลลัพธ์แบบสอบถาม</h4></button>
                    </a>
                    <br />
                    <a href={'/survey-management/'+this.props.surveyId+'/define_analyse'} >
                        <button type="button" className="btn-lg btn-primary" style={{ marginTop: `1.5%` }}><h4>กำหนดผลลัพธ์แสดงผลเป็นรายบุคคล</h4></button>
                    </a>
                </section>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.state.already ?
                    this.showComponent()
                    : <div style={{ fontSize: "25px" }}>
                        <br /><br /><br /><br /><br /><br />
                        <div className="row text-center">
                            <i className="fa fa-refresh fa-spin" />
                        </div>
                        <div className="row text-center">
                            กำลังโหลดข้อมูล...
                        </div>
                    </div>
                }
            </div>
        )
    }

}

