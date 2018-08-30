import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './index.css';

function createScrollbarTrack(WrapComponent) {
  class BaseScrollbarTrack extends PureComponent {
    render() {
      return (
        <WrapComponent
          {...this.props}
        />
      )
    }
  }

  BaseScrollbarTrack.propTypes = {
    contentSize: PropTypes.object.isRequired
  }

  return BaseScrollbarTrack;
}

export default createScrollbarTrack;