import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import createTrack from './base';

import classNameFormat from '../../utils/classNameFormat';

class ScrollbarTrackVertical extends PureComponent {
  constructor() {
    super();

    this.state = {
    };
  }
  render() {
    const {
      isHover,
      scrollbarHeight,
      scrollbarTop,
      setSlider
    } = this.props;

    return (
      <div className="react-scrollbar-simulation-track-vertical">
        <div
          ref={setSlider}
          className={classNameFormat({
            'react-scrollbar-simulation-track-vertical-slide': true,
            'react-scrollbar-simulation-track-vertical-slide-hover': isHover
          })}
          style={{
            height: `${scrollbarHeight}px`,
            transform: `translateY(${scrollbarTop}px)`
          }}
        ></div>
      </div>
    )
  }
}

ScrollbarTrackVertical.propTypes = {
  isHover: PropTypes.bool,
  scrollbarHeight: PropTypes.number.isRequired,
  scrollbarTop: PropTypes.number.isRequired,
  setSlider: PropTypes.func.isRequired
}

export default createTrack(ScrollbarTrackVertical, 'vertical');
