import React from 'react';
import { connect } from 'react-redux';
import Tappable from 'react-tappable';
import MdEventNote from 'react-icons/lib/md/event-note';
import MdInfoOutline from 'react-icons/lib/md/info-outline';

import { determineNowPlayingIfNeeded } from 'actions/nowPlayingActions';

import NowPlaying from 'components/NowPlaying';
import PlaybackPane from 'components/PlaybackPane';
import Navbar from 'components/Navbar';

const PlayView = React.createClass({

  displayName: 'PlayView',

  propTypes: {
    audio: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
    errorHandler: React.PropTypes.func,
    nowPlaying: React.PropTypes.object,
    store: React.PropTypes.object,
    guide: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  componentWillMount() {
    const { dispatch } = this.props;
    window.nowPlayingTimer = setInterval(() => {
      console.log('checking now playing');
      dispatch(determineNowPlayingIfNeeded());
    }, 30000);
  },

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.guide.shows !== this.props.guide.shows) {
      dispatch(determineNowPlayingIfNeeded());
    }
  },

  componentWillUnmount() {
    clearInterval(window.nowPlayingTimer);
  },

  handleInfoButtonClick() {
    const { router } = this.context;
    router.push('/info');
  },

  handleGuideButtonClick() {
    const { router } = this.context;
    router.push('/guide');
  },

  render() {
    const { nowPlaying } = this.props;

    return (
      <div>
        <PlaybackPane>
          <Navbar>
            <Tappable className="button left" component="a" classBase="tappable"
              onTap={ this.handleInfoButtonClick }
            >
              <MdInfoOutline size="24" />
            </Tappable>
            <div className="title">Listen</div>
            <Tappable className="button right" component="a" classBase="tappable"
              onTap={ this.handleGuideButtonClick }
            >
              <MdEventNote size="24" />
            </Tappable>
          </Navbar>
          <NowPlaying nowPlaying={ nowPlaying } />
        </PlaybackPane>
      </div>
    );
  },
});

function mapStateToProps(state) {
  const { media, guide, nowPlaying } = state;
  return {
    media,
    guide,
    nowPlaying,
  };
}

export default connect(mapStateToProps)(PlayView);
