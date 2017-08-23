import React, { PureComponent } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { coreConstants } from '/imports/core';
import * as actions from '../../api/redux/actions';

const mediationsMap = {
  relax: {
    name: 'Медитация расслабления',
    path: 'audio/relaxation_meditation.mp3',
  },
  money: {
    name: 'Медитация денежный поток',
    path: 'audio/money_meditation.mp3',
  },
}

export class MeditationOverlayComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.timeInterval = null;
  }

  state = {
    playing: true,
    time: '',
    loading: true,
  };

  componentDidMount() {
    const meditation = mediationsMap[this.props.name];
    const mediaSuccess = () => this.setMeditationChecked();
    const mediaError = (e) => console.log(e);
    const mediaStatus = status => console.log(status);
    this.media = new Media(`${coreConstants.CLOUDFRONT_URL}${meditation.path}`, mediaSuccess, mediaError, mediaStatus);
    Meteor.media = this.media;
    this.media.play();
    this.timeInterval = Meteor.setInterval(() => {
      const duration = this.media.getDuration();
      if (duration > -1) {
        this.media.getCurrentPosition((position) => {
          const time = moment.duration(Math.round(duration - position), 'seconds').format('hh:mm:ss', { trim: false });
          if (this.state.playing || position === 0) {
            this.setState({ time });
            this.media.play();
          }
          if (position > 0 && this.state.loading) {
            this.setState({ loading: false });
          }
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    Meteor.clearInterval(this.timeInterval);
    this.media.stop();
  }

  setToEnd = () => {
    console.log(this.media.getDuration() - 10);
    this.media.seekTo(Math.round(this.media.getDuration() - 10) * 1000);
  };

  setMeditationChecked = () => {
    const duration = this.media.getDuration();
    this.media.getCurrentPosition((position) => {
      if ((position === 0 && !this.state.loading)) {
        this.props.setMeditationChecked();
      }
    });
  };

  togglePlay = () => {
    if (this.state.playing) {
      this.media.pause();
      this.setState({ playing: false });
    } else {
      this.media.play();
      this.setState({ playing: true });
    }
  };

  render() {
    const { name } = this.props;
    const meditation = mediationsMap[name].name;
    return (
      <div id="meditation-overlay">
        <button
            className="close"
            onClick={this.props.toggle}
        >
          <i className="fa fa-times" />
        </button>
        <div className="content">
          <h2>{meditation}</h2>
          <div className="controls">
            <h1>{this.state.time ? this.state.time : <i className="fa fa-spinner fa-spin" />}</h1>
            <button onClick={this.togglePlay}>
              {
                this.state.loading
                  ? <i className="fa fa-spinner fa-spin" />
                  : <i className={`fa ${this.state.playing ? 'fa-pause' : 'fa-play'}`} />
              }
            </button>
          </div>
          <p>После того, как аудио закончится, задание пометится как выполненное!</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const MeditationOverlay = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeditationOverlayComponent);

export default MeditationOverlay;
