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

    this.scrollInterface = new ScrollInterface();
  }

  render() {
    const {
      children,
      style = {}
    } = this.props;

    const {
      width = '100%',
      height = '100%',
      ...otherStyle
    } = style;

    return (
      <div className="react-scrollbar-simulation" style={{width, height, ...otherStyle}}>
        <ScrollbarContent
          scrollInterface={this.scrollInterface}
        >
        {children}
        </ScrollbarContent>
        <ScrollbarTrackVertical
          scrollInterface={this.scrollInterface}
        />
        <ScrollbarTrackHorizontal
          scrollInterface={this.scrollInterface}
        />
      </div>
    )
  }
}

Scrollbar.propTypes = {
}

export default Scrollbar;
