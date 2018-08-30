import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './index.css';

function createScrollbarTrack(WrapComponent) {
  class BaseScrollbarTrack extends PureComponent {
    constructor() {
      super();

      this.state = {
        isHover: false
      };

      this.slider = null;

      this.setSlider = this.setSlider.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.calculateVerticalBarPos = this.calculateVerticalBarPos.bind(this);
      this.calculateHorizontalBarPos = this.calculateHorizontalBarPos.bind(this);
    }

    componentDidMount() {
      this.slider.addEventListener('mouseenter', this.handleMouseEnter);
      this.slider.addEventListener('mouseleave', this.handleMouseLeave);
      this.slider.addEventListener('mousedown', this.handleMouseDown);
    }

    componentWillUnmount() {
      this.slider.removeEventListener('mouseenter', this.handleMouseEnter);
      this.slider.removeEventListener('mouseleave', this.handleMouseLeave);
      this.slider.removeEventListener('mousedown', this.handleMouseDown);
    }

    // addEvents() {
      
    // }
    // removerEvents() {
      
    // }

    // 获取滑块的ref
    setSlider(dom) {
      this.slider = dom;
    }
    // 
    handleMouseEnter() {
      this.setState({
        isHover: true
      });
    }
    handleMouseLeave() {
      this.setState({
        isHover: false
      });
    }
    handleMouseDown() {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
    handleMouseMove(event) {
      const {
        clientX,
        clientY
      } = event;

      console.log(clientX, clientY);
    }

    // 计算纵向滚动条的位置
    calculateVerticalBarPos() {
      const {
        clientHeight,
        scrollHeight,
        scrollTop
      } = {
        ...this.props.contentSize,
        ...this.props.contentPosition
      };

      // 滚动条的高度
      const scrollbarHeight = clientHeight / scrollHeight * clientHeight;
      // 滚动条可滚动的高度
      const scrollbarMaxScrollHeight = clientHeight - scrollbarHeight;
      // 内容区域可滚动的高度
      const contentMaxScrollHeight = scrollHeight - clientHeight;
      // 滚动条的位置
      const scrollbarTop = scrollTop / contentMaxScrollHeight * scrollbarMaxScrollHeight;

      return {
        scrollbarHeight,
        scrollbarTop
      };
    }

    // 计算横向滚动条的位置
    calculateHorizontalBarPos() {
      const {
        clientWidth,
        scrollWidth,
        scrollLeft
      } = {
        ...this.props.contentSize,
        ...this.props.contentPosition
      };

      // 滚动条的宽度
      const scrollbarWidth = clientWidth / scrollWidth * clientWidth;
      // 滚动条可滚动的宽度
      const scrollbarMaxScrollWidth = clientWidth - scrollbarWidth;
      // 内容区域可滚动的宽度
      const contentMaxScrollWidth = scrollWidth - clientWidth;
      // 滚动条的位置
      const scrollbarLeft = scrollLeft / contentMaxScrollWidth * scrollbarMaxScrollWidth;

      return {
        scrollbarWidth,
        scrollbarLeft
      };
    }


    render() {
      const {
        isHover
      } = this.state;

      return (
        <WrapComponent
          {...this.calculateHorizontalBarPos()}
          {...this.calculateVerticalBarPos()}
          isHover={isHover}
          setSlider={this.setSlider}
        />
      )
    }
  }

  BaseScrollbarTrack.propTypes = {
    contentSize: PropTypes.shape({
      clientHeight: PropTypes.number,
      clientWidth: PropTypes.number,
      scrollWidth: PropTypes.number,
      scrollHeight: PropTypes.number
    }).isRequired,
    contentPosition: PropTypes.shape({
      scrollTop: PropTypes.number,
      scrollLeft: PropTypes.number
    }).isRequired
  }

  return BaseScrollbarTrack;
}

export default createScrollbarTrack;