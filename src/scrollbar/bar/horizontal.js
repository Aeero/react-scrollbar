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
      sliderIsHover,
      trackIsShow,
      scrollbarWidth,
      scrollbarLeft,
      setSlider,
      setSliderTrack,
      widthIsOverflow
    } = this.props;

    return (
      <div ref={setSliderTrack} className={classNameFormat({
        'react-scrollbar-simulation-track-horizontal': true,
        'react-scrollbar-simulation-hidden': !widthIsOverflow,
        'react-scrollbar-simulation-op': trackIsShow
      })}>
        <div
          ref={setSlider}
          className={classNameFormat({
            'react-scrollbar-simulation-track-horizontal-slide': true,
            'react-scrollbar-simulation-track-horizontal-slide-hover': sliderIsHover,
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
  sliderIsHover: PropTypes.bool,
  trackIsShow: PropTypes.bool,
  scrollbarWidth: PropTypes.number.isRequired,
  scrollbarLeft: PropTypes.number.isRequired,
  setSlider: PropTypes.func.isRequired,
  widthIsOverflow: PropTypes.bool.isRequired
}

export default createTrack(ScrollbarTrackHorizontal, 'horizontal');
