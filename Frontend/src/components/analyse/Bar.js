import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';

class Bar extends Component {
  constructor(props){
    super(props)
  }
  mapTopic() {
    if(this.state.data){
      return this.state.data.map(data =>(
        <Bar topic={data.topic}/>
      ))
    }
  }

  render(){
    let topic = []
    for (var i = 0; i < this.props.data.length; i++) {
      topic.push(
        this.props.data[i].topic
      );
    }

    const data = {
        labels:topic,
        datasets: [
            {
              label: 'กลุ่มตัวอย่างที่ 1',
              backgroundColor: 'rgba(0, 168, 255,0.5)',
              borderColor: 'rgba(0, 142, 226)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [3.48, 3, 3.62, 3, 2.2, 3.85, 4.5, 3.15]
            },
        ]
    };
    return (
        <div className="chart">
            <h2>แผนภูมิที่พล็อตจากค่าเฉลี่ย</h2>
            <HorizontalBar data={data}/>
            {console.log(topic)}
        </div>
    );
    
  }
}
  
  export default Bar