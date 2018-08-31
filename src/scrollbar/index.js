import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ScrollbarContent from './content';
import ScrollbarTrackVertical from './bar/vertical';
import ScrollbarTrackHorizontal from './bar/horizontal';

import ScrollInterface from './scrollInterface';

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
      }
    };

    this.scrollInterface = new ScrollInterface();

    this.setContentSize = this.setContentSize.bind(this);
  }

  // 设置容器的实际宽高
  setContentSize(size) {
    this.setState({
      contentSize: size
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
          scrollInterface={this.scrollInterface}
        >
        {children}
        </ScrollbarContent>
        <ScrollbarTrackVertical
          contentSize={contentSize}
          scrollInterface={this.scrollInterface}
        />
        <ScrollbarTrackHorizontal
          contentSize={contentSize}
          scrollInterface={this.scrollInterface}
        />
      </div>
    )
  }
}

Scrollbar.propTypes = {
}

export default Scrollbar;