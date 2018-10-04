import React, { Component } from 'react';
import './App.css';
import click1 from './audio/click1.wav';
import click2 from './audio/click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    }

    //create Audio objects with the files Webpack loaded, and we'll play them later.  Audio object is already given to us, I believe thanks to Webpack when you installed react.js
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    //this method allows the user to move the slider by changing the value of the bpm in the state
    const bpm = event.target.value;
    this.setState({
      bpm
    });
  }

  startStop = () => {
    // uses the audio that was downloaded and loaded into the file. We are using the play()
    this.click1.play();
  }

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="App">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm} 
            onChange={this.handleBpmChange}
          />
        </div>
        <button  onClick={this.startStop}>{playing ? 'Playing' : 'Stop'}</button>
      </div>
    );
  }
}

export default Metronome;
