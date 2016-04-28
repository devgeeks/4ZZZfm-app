import React from 'react';
import { connect } from 'react-redux';
import Tappable from 'react-tappable';
import MdArrowBack from 'react-icons/lib/md/arrow-back';

import { popFadeView, slideLeftView } from 'containers/AnimatedViews';

import GuidePane from 'components/GuidePane';
import Navbar from 'components/Navbar';

import { isAndroid } from 'utils/Device';

const GuideDayView = React.createClass({

  displayName: 'GuideDayView',

  propTypes: {
    style: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  handleBackButtonClick(e) {
    const { router } = this.context;
    e.preventDefault();
    router.goBack();
  },

  render() {
    const { style } = this.props;

    return (
      <div className="page" style={ style }>
        <GuidePane>
          <Navbar>
            <Tappable className="button left" component="a" classBase="tappable"
              onTap={ this.handleBackButtonClick }
            >
              <MdArrowBack size="24" />
            </Tappable>
            <div className="title">Day</div>
          </Navbar>
          <div className="content">list of shows...</div>
        </GuidePane>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return { ...state };
}

export default isAndroid()
  ? popFadeView(connect(mapStateToProps)(GuideDayView))
  : slideLeftView(connect(mapStateToProps)(GuideDayView));
