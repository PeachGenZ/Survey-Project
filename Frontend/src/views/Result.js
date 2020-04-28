import React, { Component } from 'react'
import axios from 'axios';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            project: [],
            already: false,
            dateToDo: [],
            ownSurvey: true,
            report:""
        };
        this.showComponent = this.showComponent.bind(this);
        this.shareTo = this.shareTo.bind(this);
        this.wantName = this.wantName.bind(this);
        this.haveGroup = this.haveGroup.bind(this);
        this.frequency = this.frequency.bind(this);
        this.dateToDo = this.dateToDo.bind(this);
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

        axios.get(`/userResult/find/` + surveyId)
        .then(response => {
            this.setState({
                report: response.data[0].userResult
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    shareTo() {
        if (this.state.survey.shareTo === "OPEN") {
            return <div>
                กลุ่มเปิด <i data-toggle="tooltip" title="สมาชิกเว็บนี้เท่านั้นที่มีสิทธิ์ทำแบบสอบถาม" className="glyphicon glyphicon-question-sign" />
            </div>
        }
        else if (this.state.survey.shareTo === "CLOSE") {
            return <div>
                กลุ่มปิด <i data-toggle="tooltip" title="สมาชิกเว็บนี้เท่านั้นที่มีสิทธิ์ทำแบบสอบถาม" className="glyphicon glyphicon-question-sign" />
            </div>
        }
        else if (this.state.survey.shareTo === "PUBLIC") {
            return <div>
                กลุ่มสาธารณะ <i data-toggle="tooltip" title="ผู้ที่ไม่ได้เป็นสมาชิกก็มีสิทธิ์ทำแบบสอบถามนี้ได้" className="glyphicon glyphicon-question-sign" />
            </div>
        }
    }

    wantName() {
        if (this.state.survey.wantName) return "ใช่";
        else return "ไม่ใช่";
    }

    haveGroup() {
        if (this.state.survey.haveGroup) return "ใช่";
        else return "ไม่ใช่";
    }

    frequency() {
        if (this.state.survey.frequency.amount !== 0) {
            var unitsOfTime = ""
            if (this.state.survey.frequency.unitsOfTime === "day") unitsOfTime = "วัน";
            else if (this.state.survey.frequency.unitsOfTime === "week") unitsOfTime = "สัปดาห์";
            else if (this.state.survey.frequency.unitsOfTime === "month") unitsOfTime = "เดือน";
            else if (this.state.survey.frequency.unitsOfTime === "year") unitsOfTime = "ปี";
            return "ทุก ๆ " + this.state.survey.frequency.amount + " " + unitsOfTime;
        }
        if (this.state.survey.doOnce) return "ครั้งเดียว";
        else return "หลายครั้ง";
    }

    dateToDo() {
        return (
            this.state.dateToDo.map((date, index) => {
                return (
                    <div className="row">
                        <div className="col-md-6">
                            <p>ครั้งที่ {index + 1} : </p>
                        </div>
                        <div className="col-md-6">
                            {date.day + "/" + date.month + "/" + date.year}
                        </div>
                    </div>
                )
            })
        )
    }

    showStatus() {
        if (this.state.survey.status === "ONLINE") return <small><i className="fa fa-circle text-success" /> ออนไลน์</small>
        else if (this.state.survey.status === "PAUSE") return <small><i className="fa fa-circle text-warning" /> หยุดรับข้อมูลชั่วคราว</small>
        else if (this.state.survey.status === "FINISH") return <small><i className="fa fa-circle text-danger" /> ปิดรับข้อมูล</small>
    }

    goToProject() {
        window.location = "/project-management/" + this.state.survey.projectId
    }

    showButtonDoSurvey() {
        if (this.state.survey.status === "ONLINE") return <button className="btn btn-success btn-sm" onClick={() => window.location = "/online-survey/" + this.state.survey._id}>ทำแบบสอบถาม</button>
        else if (this.state.survey.status === "PAUSE") return <button className="btn btn-success btn-sm" disabled>ทำแบบสอบถาม</button>
        else if (this.state.survey.status === "FINISH") return ""
    }

    showComponent(){
        return (
            <div>
                <section className="content-header">
                <h1>
                    <i className="fa fa-file-text-o" /> {this.state.survey.nameSurvey} {this.showStatus()}
                    &nbsp;&nbsp;
                    {this.state.ownSurvey ?
                        "" : this.showButtonDoSurvey()
                    }

                </h1>

                {this.state.ownSurvey ?
                    <ol className="breadcrumb">
                        <li ><a href="/requests"><i className="fa fa-envelope-o" /> คำร้องขอ</a></li>
                        <li ><a onClick={this.goToProject.bind(this)}><i className="fa fa-folder-o" /> {this.state.project.nameProject}</a></li>
                        <li className="active"><i className="fa fa-file-text-o" /> {this.state.survey.nameSurvey}</li>
                    </ol>
                    : ""
                }
                
                <div className="text-center" style={{fontSize:"36px", marginTop:'3%'}}>วิเคราะห์ข้อมูล</div>
                </section>
                <section className="content text-center">
                    <a href={'/survey-management/'+this.props.surveyId+'/analyse/single'} >
                        <button type="button" className="btn btn-lg btn-success" style={{ marginTop: `1%` }}><h4>ดูผลลัพธ์แบบสอบถาม</h4></button>
                    </a>
                    <br />
                    <a href={'/survey-management/'+this.props.surveyId+'/define_analyse'} >
                        <button type="button" className="btn btn-lg btn-primary" style={{ marginTop: `1.5%` }}><h4>กำหนดผลลัพธ์แสดงผลเป็นรายบุคคล</h4></button>
                    </a>

                    <div className="box box-success with-border" style={{marginTop:'5%'}}>
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col" className="text-center">ลำดับ</th>
                            <th scope="col" className="text-center">ชื่อ</th>
                            <th scope="col" className="text-center">กลุ่มตัวอย่าง</th>
                            <th scope="col" className="text-center">วัน/เดือน/ปี เวลา</th>
                            <th scope="col" className="text-center">ผลลัพธ์</th>
                            </tr>
                        </thead>
                        <tbody>
                        { (this.state.report) ? this.state.report.map( (data, index) => {
                            return (
                            <tr key={ index }>
                                <td className="text-center">{ index+1 }</td>
                                <td className="text-center">{data.name}</td>
                                <td className="text-center">{data.sample}</td>
                                <td className="text-center">{data.date}</td>
                                <td className="text-center">{data.topic}</td>
                            </tr>
                            )
                        }) : <tr><td colSpan="6" className="text-center">ไม่มีข้อมูล...</td></tr> }
                        </tbody>
                        </table>
                    </div>
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

