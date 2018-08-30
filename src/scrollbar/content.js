import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  scrollbarWidth
} from '../utils/scroll';

const scrollContentBoxStyle = {
  marginRight: `${-scrollbarWidth}px`,
  marginBottom: `${-scrollbarWidth}px`,
  paddingRight: `${scrollbarWidth}px`,
  paddingBottom: `${scrollbarWidth}px`
};

class ScrollbarContent extends PureComponent {
  constructor() {
    super();

    this.dom = null;

    this.scroll = this.scroll.bind(this);
    this.getContainerSize = this.getContainerSize.bind(this);
  }

  componentDidMount() {
    this.dom.addEventListener('scroll', this.scroll);
    this.props.setContentSize(this.getContainerSize());
  }
  componentWillUnmount() {
    this.dom.removeEventListener('scroll', this.scroll);
  }

  // 滚动事件
  scroll(event) {
    this.props.setContentPosition({
      scrollTop: this.dom.scrollTop,
      scrollLeft: this.dom.scrollLeft
    });
  }

  // 获取容器宽高
  getContainerSize() {
    const dom = this.dom;

    return {
      clientWidth: dom.clientWidth,
      scrollWidth: dom.scrollWidth,
      clientHeight: dom.clientHeight,
      scrollHeight: dom.scrollHeight
    };
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
  setContentSize: PropTypes.func.isRequired,
  setContentPosition: PropTypes.func.isRequired
}

export default ScrollbarContent;