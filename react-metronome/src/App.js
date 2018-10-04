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
    if (this.state.playing) {
      //Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    } else {
      setInterval(this.playClick(), 1000);
      this.setState({
        count: 0,
        playing: true
        //Play a click 'immediately' (after setState finishes)
      });

        this.playClick()
    };
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others like a real metronome.
    if (count % beatsPerMeasure == 0) {
      // uses the audio that was downloaded and loaded into the file. We are using the play()
      this.click1.play();
    } else {
      this.click2.play();
    }

    //Keep track of which beat we're on
    this.setState(state => ({
      count: ( state.count +1 ) % state.beatsPerMeasure
    }));
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
        <button onClick={this.startStop}>{!playing ? 'Start' : 'Stop'}</button>
      </div>
    );
  }
}

export default Metronome;
