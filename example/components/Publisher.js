import React, { Component } from "react";

import { OTPublisher } from "../../src";
import RadioButtons from "./RadioButtons";
import CheckBox from "./CheckBox";

export default class Publisher extends Component {
  publisher;

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: true,
      videoSource: "camera"
    };
  }

  setAudio = audio => {
    this.setState({ audio });
  };

  setVideo = video => {
    this.setState({ video });
  };

  setVideoSource = videoSource => {
    this.setState({ videoSource });
  };

  onError = err => {
    this.setState({ error: `Failed to publish: ${err.message}` });
  };

  render() {
    console.log('pub: ', this.publisher)
    return (
      <div>
        {this.state.error ? <div>{this.state.error}</div> : null}
        <OTPublisher
          ref={ref => {
            this.publisher = ref;
          }}
          properties={{
            publishAudio: this.state.audio,
            publishVideo: this.state.video
          }}
          onError={this.onError}
        />
        <RadioButtons
          buttons={[
            {
              label: "Camera",
              value: "camera"
            },
            {
              label: "Screen",
              value: "screen"
            }
          ]}
          initialChecked={this.state.videoSource}
          onChange={this.setVideoSource}
        />
        <CheckBox
          label="Publish Audio"
          initialChecked={this.state.audio}
          onChange={this.setAudio}
        />
        <CheckBox
          label="Publish Video"
          initialChecked={this.state.video}
          onChange={this.setVideo}
        />
        <Cycle onClick={() => {
          if (this.publisher) {
            console.log('cycle!')
            this.publisher.getPublisher().cycleVideo();
          }
        }} />
      </div>
    );
  }
}

class Cycle extends Component {
  render() {
    return <button onClick={this.props.onClick}>Cycle Video</button>;
  }
}
