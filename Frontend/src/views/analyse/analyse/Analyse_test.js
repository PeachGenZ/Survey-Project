import React, { Component} from 'react';
import axios from 'axios';


class Analyse extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      result: [{
         topic: "",
         min:"",
         max:""
      }]
    };
  }

  handleResultNameChange = idx => evt => {
    const newResult = this.state.result.map((result, sidx) => {
      if (idx !== sidx) return result;
      return { ...result, topic: evt.target.value,  };
    });

    this.setState({ result: newResult });
    console.log(this.state.result)
  };

  handleSubmit = evt => {
    const { topic, result } = this.state;
    alert(`Incorporated: ${topic} with ${result.length} result`);
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>result</h4>

        {this.state.result.map((result, idx) => (
          <div className="result">
            <input
              type="text"
              placeholder={`result #${idx + 1} topic`}
              value={result.topic}
              onChange={this.handleResultNameChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveResult(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddResult}
          className="small"
        >
          Add Result
        </button>
        <button>Incorporate</button>
      </form>
    );
  }
}

export default Analyse;