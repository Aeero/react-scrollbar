import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import createTrack from './base';

class ScrollbarTrackVertical extends PureComponent {
  constructor() {
    super();

    this.state = {
    };
  }
  render() {
    const {
      contentSize
    } = this.props;

    const {
      clientHeight,
      scrollHeight
    } = contentSize;

    return (
      <div className="react-scrollbar-simulation-track-vertical">
        <div className="react-scrollbar-simulation-track-vertical-slide" style={{height: `${clientHeight / scrollHeight * 100}%`}}></div>
      </div>
    )
  }
}

ScrollbarTrackVertical.propTypes = {
}

export default createTrack(ScrollbarTrackVertical);