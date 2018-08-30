import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import createTrack from './base';

import classNameFormat from '../../utils/classNameFormat';

class ScrollbarTrackHorizontal extends PureComponent {
  constructor() {
    super();

    this.state = {
    };
  }
  render() {
    const {
      isHover,
      scrollbarWidth,
      scrollbarLeft,
      setSlider
    } = this.props;

    return (
      <div className="react-scrollbar-simulation-track-horizontal">
        <div
          ref={setSlider}
          className={classNameFormat({
            'react-scrollbar-simulation-track-horizontal-slide': true,
            'react-scrollbar-simulation-track-horizontal-slide-hover': isHover,
          })}
          style={{
            width: `${scrollbarWidth}px`,
            transform: `translateX(${scrollbarLeft}px)`
          }}
        ></div>
      </div>
    )
  }
}

ScrollbarTrackHorizontal.propTypes = {
  isHover: PropTypes.bool,
  scrollbarWidth: PropTypes.number.isRequired,
  scrollbarLeft: PropTypes.number.isRequired,
  setSlider: PropTypes.func.isRequired
}

export default createTrack(ScrollbarTrackHorizontal);