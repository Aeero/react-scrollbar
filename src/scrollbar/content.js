import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import scrollInterface from './scrollInterface';

import {
  scrollbarWidth
} from '../utils/scroll';

import ScrollInterface from './scrollInterface';

const scrollContentBoxStyle = {
  width: `calc(100% + ${scrollbarWidth}px)`,
  height: `calc(100% + ${scrollbarWidth}px)`,
  marginRight: `${-scrollbarWidth}px`,
  marginBottom: `${-scrollbarWidth}px`,
  // paddingRight: `${scrollbarWidth}px`,
  // paddingBottom: `${scrollbarWidth}px`
};

class ScrollbarContent extends PureComponent {
  constructor() {
    super();

    this.dom = null;
  }

  componentDidMount() {
    this.props.scrollInterface.init(this.dom);
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div
        className="react-scrollbar-simulation-content"
        style={scrollContentBoxStyle}
        ref={ d => this.dom = d }
      >
        {children}
      </div>
    )
  }
}

ScrollbarContent.propTypes = {
  scrollInterface: PropTypes.instanceOf(ScrollInterface)
}

export default ScrollbarContent;
