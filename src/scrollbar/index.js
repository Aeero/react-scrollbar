import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ScrollbarContent from './content';
import ScrollbarTrackVertical from './bar/vertical';
import ScrollbarTrackHorizontal from './bar/horizontal';

import './index.css';

class Scrollbar extends PureComponent {
  constructor() {
    super();

    this.state = {
      contentSize: {
        clientWidth: 0,
        scrollWidth: 0,
        clientHeight: 0,
        scrollHeight: 0
      },
      contentPosition: {
        scrollLeft: 0,
        scrollTop: 0
      }
    };

    this.setContentSize = this.setContentSize.bind(this);
    this.setContentPosition = this.setContentPosition.bind(this);
  }

  // 设置容器的实际宽高
  setContentSize(size) {
    this.setState({
      contentSize: size
    });
  }

  // 设置滚动偏移量
  setContentPosition(pos) {
    this.setState({
      contentPosition: pos
    });
  }

  render() {
    const {
      children
    } = this.props;

    const {
      contentSize,
      contentPosition
    } = this.state;

    return (
      <div className="react-scrollbar-simulation" style={{width:'300px', height:'300px'}}>
        <ScrollbarContent
          setContentSize={this.setContentSize}
          setContentPosition={this.setContentPosition}
        >
        {children}
        </ScrollbarContent>
        <ScrollbarTrackVertical
          contentSize={contentSize}
          contentPosition={contentPosition}
        />
        <ScrollbarTrackHorizontal
          contentSize={contentSize}
          contentPosition={contentPosition}
        />
      </div>
    )
  }
}

Scrollbar.propTypes = {
}

export default Scrollbar;