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
      sliderIsHover,
      trackIsShow,
      scrollbarHeight,
      scrollbarTop,
      setSlider,
      setSliderTrack,
      heightIsOverflow
    } = this.props;

    return (
      <div ref={setSliderTrack} className={classNameFormat({
        'react-scrollbar-simulation-track-vertical': true,
        'react-scrollbar-simulation-hidden': !heightIsOverflow,
        'react-scrollbar-simulation-op': trackIsShow
      })}>
        <div
          ref={setSlider}
          className={classNameFormat({
            'react-scrollbar-simulation-track-vertical-slide': true,
            'react-scrollbar-simulation-track-vertical-slide-hover': sliderIsHover
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
  sliderIsHover: PropTypes.bool,
  trackIsShow: PropTypes.bool,
  scrollbarHeight: PropTypes.number.isRequired,
  scrollbarTop: PropTypes.number.isRequired,
  setSlider: PropTypes.func.isRequired,
  heightIsOverflow: PropTypes.bool.isRequired
}

export default createTrack(ScrollbarTrackVertical, 'vertical');
