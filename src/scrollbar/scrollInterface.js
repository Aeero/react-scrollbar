import { error } from '../utils/consoleTip';
import throttle from '../utils/throttle';

/**
* @constructor
**/
class ScrollInterface {
  constructor(dom) {
    this.dom = null;
    this.scrollTop = 0;
    this.scrollLeft = 0;

    // 各种回调
    this.callbackFns = {
      scroll: [],
      init: []
    };


    this.contentSize = {
      clientWidth: 0,
      scrollWidth: 0,
      clientHeight: 0,
      scrollHeight: 0
    };

    this.init(dom);

    this.setScrollBoxSizeThrottle = throttle(this.setScrollBoxSize.bind(this));
  }

  // 增加事件监听
  addCallback = (eventName, fn) => {
    this.callbackFns[eventName].push(fn);
  }

  // 移除事件的监听
  removeCallback = (eventName, fn) => {
    const index = this.callbackFns[eventName].indexOf(fn);

    if (index >= 0) {
      this.callbackFns[eventName].splice(index, 1);
    }
  }

  // 执行事件
  doCallback(eventName, ...args) {
    for (let i = 0, l = this.callbackFns[eventName].length; i < l; i++) {
      this.callbackFns[eventName][i](...args);
    }
  }

  // 绑定dom节点
  init = (dom) => {
    // error(
    //   !(dom instanceof Element),
    //   'ScrollInterface 初始化错误！'
    // );
    if (!(dom instanceof Element)) {
      return;
    }

    this.dom = dom;
    this.setScrollBoxSize();
    this.doCallback('init');

    this.dom.addEventListener('scroll', this.scroll);
    this.scroll();
  }


  // 设置容器的尺寸
  setScrollBoxSize = () => {
    const dom = this.dom;

    this.contentSize = {
      clientWidth: dom.clientWidth,
      scrollWidth: dom.scrollWidth,
      clientHeight: dom.clientHeight,
      scrollHeight: dom.scrollHeight
    };
  }

  // 获取容器的尺寸
  getScrollBoxSize = () => {
    return this.contentSize;
  }

  // 滚动回调
  scroll = () => {
    this.scrollTop = this.dom.scrollTop;
    this.scrollLeft = this.dom.scrollLeft;

    this.setScrollBoxSizeThrottle();

    this.doCallback('scroll', {
      scrollTop: this.scrollTop,
      scrollLeft: this.scrollLeft
    });
  }

  setScroll = (top, left) => {
    this.dom.scrollTop = top || this.scrollTop;
    this.dom.scrollLeft = left || this.scrollLeft;
  }
}

export default ScrollInterface;
