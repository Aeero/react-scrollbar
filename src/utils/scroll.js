// 检测滚动条的宽度（高度应该是一样的）
function _getScrollbarWidth() {
  let w1;
  let w2;
  let outer = document.createElement('div');
  let inner = document.createElement('div');

  outer.appendChild(inner);

  outer.style.display = 'block';
  outer.style.position = 'absolute';
  outer.style.width = '50px';
  outer.style.height = '50px';
  outer.overflow = 'hidden';

  inner.style.height = '100px';
  inner.style.width = 'auto';

  document.body.appendChild(outer);

  w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';

  w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);

  return w1 - w2;
}

// 滚动条宽度
export const scrollbarWidth = _getScrollbarWidth();

// dom的宽度是否溢出
export function domWidthOverflow(dom) {
  return dom.scrollWidth - dom.clientWidth;
}

// dom的高度是否溢出
export function domHeightOverflow(dom) {
  return dom.scrollHeight - dom.clientHeight;
}