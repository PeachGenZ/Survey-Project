import React, { Component} from 'react';
import axios from 'axios';

class Analyse extends Component {
  constructor(props){
    super(props)
    this.state = {
      survey:"",
      widget:"",      
      checkResult:undefined,
      userResultId:"",
      answerId:"",
      amountAnswer:"",
      
      gender:false,
      ages:false,
      status:false,
      education:false,
      job:false,
      income:false,
      
      widgetCheck:{
        gender:false,
        ages:false,
        status:false,
        education:false,
        job:false,
        income:false,
      },
      maleCalculate:"บวก",
      femaleCalculate:"บวก",
      age18Calculate:"บวก",
      age1823Calculate:"บวก",
      age2429Calculate:"บวก",
      age3035Calculate:"บวก",
      age3641Calculate:"บวก",
      age4247Calculate:"บวก",
      age4853Calculate:"บวก",
      age5460Calculate:"บวก",
      age60Calculate:"บวก",
      singleCalculate:"บวก",
      marryCalculate:"บวก",
      separatedCalculate:"บวก",

      result:[{
        topic:"",
        min:0,
        max:0,
        description:"",
      }],
    }
  }

  async componentDidMount () {
    const surveyId = this.props.match.params.surveyId;
    axios.get(`/surveys/find/` + surveyId)
      .then(response => {
          this.setState({
              survey: response.data,
              widget: response.data.builtIns
          })
      })
      .catch((error) => {
          console.log(error);
      })
    
    axios.get(`/userResult/find/` + surveyId)
      .then(response => {
          this.setState({
              checkResult: response.data,
              userResultId: response.data[0]._id,
          })
      })
      .catch((error) => {
          console.log(error);
      })

    await axios.get(`/answers/find/` + surveyId)
      .then(response => {
          this.setState({
            answerId:response.data[0]._id,
            amountAnswer:response.data[0].amountAnswer,
          })
      })
      .catch((error) => {
          console.log(error);
      })
  }

  handleResultNameChange = idx => evt => {
    const newResult = this.state.result.map((result, sidx) => {
      if (idx !== sidx) return result;
      return { ...result, topic: evt.target.value  };
    });

    this.setState({ result: newResult });
  };

  handleResultMinChange = idx => evt => {
    const newResult = this.state.result.map((result, sidx) => {
      if (idx !== sidx) return result;
      return { ...result, min: evt.target.value  };
    });

    this.setState({ result: newResult });
  };

  handleResultMaxChange = idx => evt => {
    const newResult = this.state.result.map((result, sidx) => {
      if (idx !== sidx) return result;
      return { ...result, max: evt.target.value  };
    });

    this.setState({ result: newResult });
  };

  handleResultDescriptionChange = idx => evt => {
    const newResult = this.state.result.map((result, sidx) => {
      if (idx !== sidx) return result;
      return { ...result, description: evt.target.value  };
    });

    this.setState({ result: newResult });
  };

  handleSubmit = evt => {
    let gender=null
    let ages=null
    let status=null

    if(this.state.gender){
      gender={
        male:{
          score:this.refs.male.value,
          calculate:this.state.maleCalculate
        },
        female:{
          score:this.refs.female.value,
          calculate:this.state.femaleCalculate
        }
      }
    }
    if(this.state.ages){
      ages={
        age18:{
          score:this.refs.age18.value,
          calculate:this.state.age18Calculate
        },
        age1823:{
          score:this.refs.age1823.value,
          calculate:this.state.age1823Calculate
        },
        age2429:{
          score:this.refs.age2429.value,
          calculate:this.state.age2429Calculate
        },
        age3035:{
          score:this.refs.age3035.value,
          calculate:this.state.age3035Calculate
        },
        age3641:{
          score:this.refs.age3641.value,
          calculate:this.state.age3641Calculate
        },
        age4247:{
          score:this.refs.age4247.value,
          calculate:this.state.age4247Calculate
        },
        age4853:{
          score:this.refs.age4853.value,
          calculate:this.state.age4853Calculate
        },
        age5460:{
          score:this.refs.age5460.value,
          calculate:this.state.age5460Calculate
        },
        age60:{
          score:this.refs.age60.value,
          calculate:this.state.age60Calculate
        }
      }
    }
    if(this.state.status){
      status={
        single:{
          score:this.refs.single.value,
          calculate:this.state.singleCalculate
        },
        marry:{
          score:this.refs.marry.value,
          calculate:this.state.marryCalculate
        },
        separated:{
          score:this.refs.separated.value,
          calculate:this.state.separatedCalculate
        },
      }
    }
    
    let setResult={
      result:this.state.result,
      calculate:{
        gender,
        ages,
        status,
      }
    }

    if(this.state.checkResult !== undefined){
      try {
        const resultOld = this.state.checkResult.userResult
        const editUserResult={
            setResult:setResult,
            userResult:resultOld
        }
        axios.post(`/userResult/add/${this.state.userResultId}`, editUserResult)
          .then(res => console.log(res))
      } catch (e) {
          console.log(`😱 Axios request failed: ${e}`);
      }
    }
    else{
      try {
        const answerId = this.state.answerId
        const surveyId = this.props.match.params.surveyId
        const createUserResult = {
          answerId:answerId,
          surveyId:surveyId,
          setResult:setResult,
          userResult:null
        }
        axios.post(`/userResult/create/`, createUserResult)
        console.log('👉 create data');
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
      }
    }
  };

  handleAddResult = () => {
      this.setState({
        result: this.state.result.concat([{ topic: "", min:"",max:""}])
      });
  };

  handleRemoveResult = idx => () => {
    this.setState({
      result: this.state.result.filter((s, sidx) => idx !== sidx)
    });
  };

  widgetCheck(){
    for(let i=0; i<this.state.widget.length; i++){
      if(this.state.widget[i].builtInWidget === 'gender'){
        this.state.widgetCheck.gender = true
      }
      if(this.state.widget[i].builtInWidget === 'ages'){
        this.state.widgetCheck.ages = true
      }
      if(this.state.widget[i].builtInWidget === 'status'){
        this.state.widgetCheck.status = true
      }
      if(this.state.widget[i].builtInWidget === 'education'){
        this.state.widgetCheck.education = true
      }
      if(this.state.widget[i].builtInWidget === 'job'){
        this.state.widgetCheck.job = true
      }
      if(this.state.widget[i].builtInWidget === 'income'){
        this.state.widgetCheck.income = true
      }
    }
  }

  createForm(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.result.map((result, idx) => (
            <div className="result">
              <div style={{marginLeft:'30%'}}>
                <h3>ผลลัพธ์ที่ {idx+1}</h3>
                <div className="input-group input-group-lg" style={{width: "60%" , marginTop:"1%"}}>
                  <span className="input-group-addon">หัวข้อ</span>
                  <input type="text" className="form-control" placeholder="ป้อนข้อความ" value={result.topic} onChange={this.handleResultNameChange(idx)}/>
                </div>
                <div className="input-group input-group-lg" style={{width: "60%", marginTop:"1%"}}>
                  <span className="input-group-addon" id="topic">ช่วงคะแนน</span>
                  <input type="number" className="form-control" placeholder="น้อยสุด" value={result.min} onChange={this.handleResultMinChange(idx)}/>
                  <span className="input-group-addon">ถึง</span>
                  <input type="number" className="form-control" placeholder="มากสุด" value={result.max} onChange={this.handleResultMaxChange(idx)}/>
                </div>
                <div className="form-group" style={{marginTop:"0.8%"}}>
                  <span style={{fontSize:"17px"}}>รายละเอียด</span>
                  <textarea className="form-control" rows="6" style={{width: "60%"}} value={result.description} onChange={this.handleResultDescriptionChange(idx)}/>
                </div>
              </div>

              <div className='text-center'>
                <button className="btn btn-danger btn-sm" type="button" onClick={this.handleRemoveResult(idx)}>ลบ</button>
              </div>

            </div>
            
          ))}
          <div className='text-center' style={{marginTop:'3.5%'}} >
            <button type="button" className="btn btn-primary btn-lg" onClick={this.handleAddResult}>เพิ่มผลลัพธ์</button>
          </div>

          <div>
            <div className="input-group" style={{marginBottom:'10%', marginTop:'2%'}}>
              <h2>การคำนวณเพิ่มเติม</h2>
              <div>
                {this.widgetCheck()}
                <p style={{ color: '#79a0d2', marginTop:"1%"}}>ฟังก์ชันในส่วนนี้จะดำเนินการเพิ่มเติมเมื่อการคำนวณคะแนนคำตอบของผู้ตอบแบบสอบถามเสร็จสิ้น</p>

                {this.state.widgetCheck.gender ?
                  <label style={{fontSize:'26px'}}>
                    <input type="checkbox" style={{ width: 30, height: 30 }} checked={this.state.gender} onChange={this.handleCheckboxGender}/> เพศ
                  </label> 
                  :""
                }
                {
                  this.state.gender ? 
                    <div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>เพศชาย</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.maleCalculate} onChange={this.handleMale} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="male" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>เพศหญิง</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.femaleCalculate} onChange={this.handleFemale} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="female" /> คะแนน</span>
                      </div>
                    </div>
                    
                    :""
                }
              </div>

              <div style={{marginTop:'2%'}}>
                {this.state.widgetCheck.ages ?
                  <label style={{fontSize:'26px'}}>
                    <input type="checkbox" style={{ width: 30, height: 30 }} checked={this.state.ages} onChange={this.handleCheckboxAges}/> อายุ
                  </label> 
                  :""
                }
                {
                  this.state.ages ? 
                    <div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>น้อยกว่า 18 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age18Calculate} onChange={this.handleAge18} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age18" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>อายุ 18-23 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age1823Calculate} onChange={this.handleAge1823} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age1823" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>อายุ 24-29 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age2429Calculate} onChange={this.handleAge2429} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age2429" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>อายุ 30-35 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age3035Calculate} onChange={this.handleAge3035} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age3035" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>อายุ 36-41 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age3641Calculate} onChange={this.handleAge3641} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age3641" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>อายุ 42-47 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age4247Calculate} onChange={this.handleAge4247} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age4247" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>อายุ 48-53 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age4853Calculate} onChange={this.handleAge4853} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age4853" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>อายุ 54-60 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age5460Calculate} onChange={this.handleAge5460} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age5460" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>มากกว่า 60 ปี</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.age60Calculate} onChange={this.handleAge60} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="age60" /> คะแนน</span>
                      </div>
                    </div>
                    
                    :""
                }
              </div>

              <div style={{marginTop:'2%'}}>
              {this.state.widgetCheck.status ?
                  <label style={{fontSize:'26px'}}>
                    <input type="checkbox" style={{ width: 30, height: 30 }} checked={this.state.status} onChange={this.handleCheckboxStatus}/> สถานภาพ
                  </label> 
                  :""
                }
                {
                  this.state.status ? 
                    <div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>โสด</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.singleCalculate} onChange={this.handleSingle} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                            <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="single" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"100%"}}>
                            <label style={{fontSize:22}}>สมรส</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.marryCalculate} onChange={this.handleMarry} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="marry" /> คะแนน</span>
                      </div>
                      <div className="input-group input-group-lg" style={{ marginTop:"1%", width:"200%"}}>
                            <label style={{fontSize:22}}>หย่าร้าง,หม้าย,แยกกันอยู่</label>
                            <span style={{fontSize:16}}> ดำเนินการโดย </span>     
                              <select className="text-center" value={this.state.separatedCalculate} onChange={this.handleSeparated} style={{width: '15%', margin:'auto'}}>
                                <option value="บวก">บวก</option>
                                <option value="ลบ">ลบ</option>
                                <option value="คูณ">คูณ</option>
                                <option value="หาร">หาร</option>
                              </select>
                              <span> <i className="fa fa-arrow-right"/> <input type="number" placeholder="ป้อนจำนวนคะแนน" ref="separated" /> คะแนน</span>
                      </div>
                    </div>
                    
                    :""
                }
              </div>
              
            </div>

            <div className='text-center' style={{marginBottom:'10%', marginTop:'1.5%'}}>
              <button className="btn btn-success btn-lg" style={{margin: `15px`}}>ยืนยัน</button>
              {/*<button type="button" className="btn btn-success btn-lg" style={{margin: `1%`}} onClick={() => this.handleSubmit()}>ยืนยัน</button>*/}
            </div>
          </div>
        </form>
      </div>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleCheckboxGender = event => {
    this.setState({ gender: event.target.checked })
  }
  handleCheckboxAges = event => {
    this.setState({ ages: event.target.checked })
  }
  handleCheckboxStatus = event => {
    this.setState({ status: event.target.checked })
  }

  handleMale = event => {
    this.setState({ maleCalculate : event.target.value })
  }
  handleFemale = event => {
    this.setState({ femaleCalculate : event.target.value })
  }
  handleAge18 = event => {
    this.setState({ age18Calculate : event.target.value })
  }
  handleAge1823 = event => {
    this.setState({ age1823Calculate : event.target.value })
  }
  handleAge2429 = event => {
    this.setState({ age2429Calculate : event.target.value })
  }
  handleAge3035 = event => {
    this.setState({ age3035Calculate : event.target.value })
  }
  handleAge3641 = event => {
    this.setState({ age3641Calculate : event.target.value })
  }
  handleAge4247 = event => {
    this.setState({ age4247Calculate : event.target.value })
  }
  handleAge4853 = event => {
    this.setState({ age4853Calculate : event.target.value })
  }
  handleAge5460 = event => {
    this.setState({ age5460Calculate : event.target.value })
  }
  handleAge60 = event => {
    this.setState({ age60Calculate : event.target.value })
  }
  handleSingle = event => {
    this.setState({ singleCalculate : event.target.value })
  }
  handleMarry = event => {
    this.setState({ marryCalculate : event.target.value })
  }
  handleSeparated = event => {
    this.setState({ separatedCalculate : event.target.value })
  }

  render() {
    return(
      <div className= "container" style={{ marginTop: `50px` }}>
          <a href='.' ><button type="button" className="btn btn-warning btn-flat" style={{marginRight: '100%'}}><i className="fa fa-toggle-left" /> ย้อนกลับ</button></a>
          
          <div>
            <div className="text-center">
              <h2 className="text-center">กำหนดผลลัพธ์แสดงรายบุคคล</h2>
              <br/>
              {/*<div className="text-center" >
                เลือกจำนวนผลลัพธ์ที่ต้องการสร้าง
                <select className="form-control text-center" value={this.state.value} onChange={this.handleChange} style={{width: '25%', margin:'auto', textAlign:'center'}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </div>*/}
              <p style={{ color: '#79a0d2', marginTop:"1%"}}>*เมื่อผู้ตอบแบบสอบถามทำแบบสอบถามเสร็จสิ้นฟังก์ชันนี้จะสรุปผลลัพธ์ตามคะแนนที่ผู้ตอบแบบสอบถามทำได้</p>
              <p style={{ color: '#79a0d2', marginTop:"1%"}}>ในการคำนวณค่าคะแนนเพื่อหาผลลัพธ์ ดำเนินการโดยหาผลรวมของคำตอบทุกข้อ</p>
            </div>
            <br/>
            {this.createForm()}
          </div>
      </div>
      
    )
  }
}

export default Analyse;