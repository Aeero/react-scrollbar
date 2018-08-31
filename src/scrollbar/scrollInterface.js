import { error } from '../utils/consoleTip';

class ScrollInterface {
  constructor() {
    this.dom = null;
    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.callbackFns = [];

    this.addCallback = this.addCallback.bind(this);
    this.init = this.init.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  addCallback(fn) {
    this.callbackFns.push(fn);
  }

  init(dom) {
    // error(
    //   !(dom instanceof Element),
    //   'ScrollInterface 初始化错误！'
    // );

    this.dom = dom;
    this.dom.addEventListener('scroll', this.scroll);
    this.scroll();
  }

  scroll() {
    this.scrollTop = this.dom.scrollTop;
    this.scrollLeft = this.dom.scrollLeft;

    for (let i = 0, l = this.callbackFns.length; i < l; i++) {
      this.callbackFns[i]({
        scrollTop: this.scrollTop,
        scrollLeft: this.scrollLeft
      });
    }
  }

  setScroll(top, left) {
    this.dom.scrollTop = top || this.scrollTop;
    this.dom.scrollLeft = left || this.scrollLeft;
  }
}

export default ScrollInterface;