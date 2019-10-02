// npm install react-rainbow-components@1.4.0 --save
import React, { Component } from 'react';
import { Slider } from 'react-rainbow-components';

import { caesar } from '../utils/caesar';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.encrypt = this.encrypt.bind(this);

    this.state = {
      message: "DIESISTEINEGEHEIMENACHRICHT",
      encryption: "Lorem ipsum",
      shift: 2,
    };
  }

  encrypt() {
    const encryption = caesar(this.state.message, this.state.shift);
    this.setState({ encryption: encryption });
  }

  handleChange(event) {
    this.setState({ message: event.target.value }, this.encrypt);
  }

  handleSliderChange(event) {
    this.setState(
      { shift: Number.parseInt(event.target.value) },
      this.encrypt
    );
  }

  // https://www.pastiebin.com/5d-8b-7d-dd-93-d55
  render() {
    return (
      <div className="ui container">
        <h1>Cäsar-Verschlüsselung</h1>

        <div className="ui segment">
          <h2 className="ui dividing header">Geheimbotschaft</h2>

          <textarea
            value={this.state.message}
            onChange={this.handleChange}
          />
        </div>

        <div className="ui segment">
          <h2>Verschiebung</h2>

          <Slider
            label="Verschiebung"
            min={0}
            max={25}
            value={this.state.shift}
            onChange={this.handleSliderChange}
          />
        </div>

        <div className="ui segment">
          <h2 className="ui dividing header">Codierte Botschaft</h2>

          <pre>
            {this.state.encryption}
          </pre>
        </div>
      </div>
    );
  }
}
