import React from 'react';
import { connect } from 'react-redux';
import Tappable from 'react-tappable';
import MdClose from 'react-icons/lib/md/close';

import animateView from 'react-animated-views';

import { isAndroid } from 'utils/Device';

import GuidePane from 'components/GuidePane';
import Navbar from 'components/Navbar';
import GuideList from 'components/GuideList';

const GuideView = React.createClass({

  displayName: 'GuideView',

  propTypes: {
    children: React.PropTypes.object,
    guide: React.PropTypes.object,
    push: React.PropTypes.func,
    pop: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  componentDidMount() {
    // bind back button
    // This needs special attention or the animation won't be right :(
    document.addEventListener('backbutton', this.handleCloseButtonClick, false);
  },

  componentWillUnmount() {
    // unbind back button
    // Don't want to leave this bound
    document.removeEventListener('backbutton', this.handleCloseButtonClick);
  },

  handleCloseButtonClick() {
    const { pop } = this.props;
    pop('slideUp'); // I don't want to have to do this...
  },

  handleDayListItemClick(day) {
    const { push } = this.props;
    const animation = isAndroid() ? 'popFade' : 'slideLeft';
    push(`/guide/day/${day}`, animation);
  },

  render() {
    const { style, guide: { program } } = this.props;

    const dayKeys = Object.keys(program);
    const days = dayKeys.map(day => {
      const tappable = (
        <Tappable component="a" onTap={ () => this.handleDayListItemClick(day) }>
          <span style={ { fontSize: '120%', margin: '8px' } }>{ day }</span>
        </Tappable>
      );
      return (
        <li key={ day }>
          { tappable }
        </li>
      );
    });

    return (
      <div className="page" style={ style }>
        <GuidePane>
          <Navbar>
            <div className="title">Program</div>
            <Tappable
              className="button right" component="a" classBase="tappable"
              onTap={ this.handleCloseButtonClick }
            >
              <MdClose size="24" />
            </Tappable>
          </Navbar>
          <GuideList className="content">
            { days }
          </GuideList>
        </GuidePane>
      </div>
    );
  },
});

function mapStateToProps(state) {
  const { guide, nowPlaying } = state;
  return {
    guide,
    nowPlaying,
  };
}

export default animateView(connect(mapStateToProps)(GuideView));
