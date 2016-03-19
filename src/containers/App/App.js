import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import ErrorDialog from 'components/ErrorDialog';
import PlaybackControlsView from 'containers/PlaybackControlsView';

import { fetchGuideDataIfNeeded } from 'actions/guideActions';

const App = React.createClass({

  displayName: 'App',

  propTypes: {
    media: React.PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
  },

  getInitialState() {
    return {
      error: {
        displayed: false,
        message: '',
      },
    };
  },

  componentDidMount() {
    const { dispatch } = this.props;
    (function updateGuide() {
      dispatch(fetchGuideDataIfNeeded());
      setTimeout(updateGuide, 3600000); // Immediately, and every hour after
    }());
  },

  // Global error handler passed to all routes
  errorHandler(error) {
    const { err, msg } = error;
    console.log(msg);
    console.error(err);
    this.setState({
      error: {
        displayed: true,
        message: msg,
      },
    });
    setTimeout(() => {
      this.setState({
        error: {
          displayed: false,
          message: '',
        },
      });
    }, 2600);
  },

  render() {
    const {
      dispatch,
      media,
      location: { pathname: key },
    } = this.props;
    const props = {
      key,
      errorHandler: this.errorHandler,
    };

    return (
      <div className="app">
        <ErrorDialog error={ this.state.error } />
        <CSSTransitionGroup
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 300 }
          transitionName="routetransition"
        >
          { React.cloneElement(this.props.children || <div />, props) }
        </CSSTransitionGroup>
        <PlaybackControlsView />
      </div>
    );
  },
});

function mapStateToProps(state) {
  const { media, guide } = state;
  return {
    media,
    guide,
  };
}

export default connect(mapStateToProps)(App);
