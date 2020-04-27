import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import axios from 'axios'

class Bar extends Component {
  constructor(props){
    super(props)
    this.state = {
      resultBar:"",
      already:false,
    }
  }

  componentDidMount () {
    const surveyId = this.props.surveyId;
    axios.get(`/analyse/find/` + surveyId)
      .then(response => {
          this.setState({
              resultBar:response.data[0].result,
              already:true
          })                           
          //console.log(this.state.resultBar)
      })
      .catch((error) => {
          console.log(error);
      })
  }
  
  getLabels(){
    let labels=[]
    if(this.state.resultBar){
      for(let i=0; i<this.state.resultBar.length; i++){
        labels.push(this.state.resultBar[i].name)
      }
    }
    return labels
  }

  getData(){
    let value=[]
    if(this.state.resultBar){
      for(let i=0; i<this.state.resultBar.length; i++){
        if(this.state.resultBar[i].mean != null){
          value.push(this.state.resultBar[i].mean.toFixed(3))
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
              label: 'กลุ่มตัวอย่างที่ 1',
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

  render(){
    return (
      <div>
        {this.state.already ? this.showComponent():""}
      </div>
    )
    
  }
}
  
  export default Bar