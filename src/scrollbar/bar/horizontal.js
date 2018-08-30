import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import createTrack from './base';

class ScrollbarTrackHorizontal extends PureComponent {
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
      clientWidth,
      scrollWidth
    } = contentSize;

    return (
      <div className="react-scrollbar-simulation-track-horizontal">
        <div className="react-scrollbar-simulation-track-horizontal-slide" style={{width: `${clientWidth / scrollWidth * 100}%`}}></div>
      </div>
    )
  }
}

ScrollbarTrackHorizontal.propTypes = {
}

export default createTrack(ScrollbarTrackHorizontal);