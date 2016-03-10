import React from 'react';
import classNames from 'classnames';

import './navbar.css';

export default React.createClass({

  displayName: 'Navbar',

  propTypes: {
    children: React.PropTypes.array,
  },

  render() {
    const cx = classNames({
      navbar: true,
      'very-dark-primary-color': true,
    });

    return (
      <div className={ cx }>
        { this.props.children }
      </div>
    );
  },
});
