import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ScrollInterface from '../scrollInterface';
import { calculateScrollPos, calculatePagePos } from '../../utils/calculateScrollPos';

import './index.css';

function createScrollbarTrack(WrapComponent) {
  class BaseScrollbarTrack extends PureComponent {
    constructor(props) {
      super();

      this.state = {
        isHover: false,
        scrollTop: props.scrollInterface.scrollTop,
        scrollLeft: props.scrollInterface.scrollLeft
      };

      // 滑块dom节点
      this.slider = null;
      // 鼠标的位置
      this.clientX = 0;
      this.clientY = 0;

      this.scrollCallback = this.scrollCallback.bind(this);
      this.setScroll = this.setScroll.bind(this);
      this.setSlider = this.setSlider.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.calculateVerticalBarPos = this.calculateVerticalBarPos.bind(this);
      this.calculateHorizontalBarPos = this.calculateHorizontalBarPos.bind(this);
    }

    componentDidMount() {
      this.slider.addEventListener('mouseenter', this.handleMouseEnter);
      this.slider.addEventListener('mouseleave', this.handleMouseLeave);
      this.slider.addEventListener('mousedown', this.handleMouseDown);

      this.props.scrollInterface.addCallback(this.scrollCallback);
    }

    componentWillUnmount() {
      this.slider.removeEventListener('mouseenter', this.handleMouseEnter);
      this.slider.removeEventListener('mouseleave', this.handleMouseLeave);
      this.slider.removeEventListener('mousedown', this.handleMouseDown);
    }

    // 滚动回调
    scrollCallback({ scrollTop, scrollLeft }) {
      this.setState({
        scrollTop,
        scrollLeft
      });
    }

    // 设置滚动距离
    setScroll(top, left) {
      this.props.scrollInterface.setScroll(top, left);
    }


    // 获取滑块的ref
    setSlider(dom) {
      this.slider = dom;
    }

    // 设置鼠标的位置
    setMousePos(event = {}) {
      const { clientX, clientY } = event;
      this.clientX = clientX;
      this.clientY = clientY;
    }
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
    handleMouseDown(event) {
      // event.stopImmediatePropagation();
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      document.onselectstart = function() {return false};
      this.setMousePos(event);
    }
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.onselectstart = undefined;
      this.setMousePos();
    }
    handleMouseMove(event) {
      const {
        clientX: newClientX,
        clientY: newClientY
      } = event;

      const {
        clientX: oldClientX,
        clientY: oldClientY
      } = this;

      const {
        clientHeight,
        scrollHeight,
        clientWidth,
        scrollWidth
      } = this.props.contentSize;

      const { scrollTop, scrollLeft } = this.state;

      const { pagePos } = calculatePagePos(clientHeight, scrollHeight, scrollTop, newClientY - oldClientY);

      this.setScroll(pagePos, null);

      // console.log(newClientX - oldClientX, newClientY - oldClientY);



      this.setMousePos({
        clientX: newClientX,
        clientY: newClientY
      });
    }

    // 计算纵向滚动条的位置
    calculateVerticalBarPos() {
      const {
        clientHeight,
        scrollHeight
      } = this.props.contentSize;

      const { scrollTop } = this.state;

      const {
        scrollbarSize,
        scrollbarPos
      } = calculateScrollPos(clientHeight, scrollHeight, scrollTop);

      return {
        scrollbarHeight: scrollbarSize,
        scrollbarTop: scrollbarPos
      };
    }

    // 计算横向滚动条的位置
    calculateHorizontalBarPos() {
      const {
        clientWidth,
        scrollWidth
      } = this.props.contentSize;

      const { scrollLeft } = this.state;

      const {
        scrollbarSize,
        scrollbarPos
      } = calculateScrollPos(clientWidth, scrollWidth, scrollLeft);

      return {
        scrollbarWidth: scrollbarSize,
        scrollbarLeft: scrollbarPos
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
    scrollInterface: PropTypes.instanceOf(ScrollInterface)
  }

  return BaseScrollbarTrack;
}

export default createScrollbarTrack;