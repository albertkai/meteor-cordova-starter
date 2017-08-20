import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { coreConstants } from '/imports/core';
import * as actions from '../../api/redux/actions';

const videoMap = {
  sport1: 'GoDkzdxphks',
  stretching: '7TvReZrFTF8',
  sparta: 'AGO7z8pI3sg',
  yoga: 'FUlcIZHm300',
  tsigun: 'Njxb0XSgmW0',
};

export class SportOverlayComponent extends PureComponent {

  componentDidMount() {
    const { setSportChecked } = this.props;
    if (Meteor.isClient) {
      this.player = new YT.Player('player', {
        height: '60%',
        width: '100%',
        videoId: videoMap[this.props.name],
        playerVars: {
          enablejsapi: 1,
          origin: document.domain,
          rel: 0,
        },
        events: {
          onReady(e) {
            e.target.playVideo();
          },
          onError(e) {
            console.error(e);
          },
          onStateChange(state) {
            if (state.data === 0) {
              setSportChecked();
            }
          },
        },
      });
    }
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return (
      <div id="sport-overlay">
        <button
            className="close"
            onClick={this.props.toggle}
        >
          <i className="fa fa-times" />
        </button>
        <div id="player" />
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const SportOverlay = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SportOverlayComponent);

export default SportOverlay;
