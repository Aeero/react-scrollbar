function calculateScrollbar(clientSize, pageSize) {
  // 滚动条的尺寸
  const scrollbarSize = clientSize / pageSize * clientSize;
  // 滚动条可滚动的距离
  const scrollbarMaxScroll = clientSize - scrollbarSize;
  // 视图可滚动的距离
  const pageMaxScroll = pageSize - clientSize;

  return {
    scrollbarSize,
    scrollbarMaxScroll,
    pageMaxScroll
  };
}



export function calculateScrollPos(clientSize, pageSize, scrollPos) {
  const {
    scrollbarSize,
    scrollbarMaxScroll,
    pageMaxScroll
  } = calculateScrollbar(clientSize, pageSize);

  const scrollbarPos = scrollPos / pageMaxScroll * scrollbarMaxScroll;

  return {
    scrollbarSize,
    scrollbarMaxScroll,
    pageMaxScroll,
    scrollbarPos
  };
}

export function calculatePagePos(clientSize, pageSize, scrollPos, scrollbarOffset) {
  const {
    scrollbarSize,
    scrollbarMaxScroll,
    pageMaxScroll,
    scrollbarPos
  } = calculateScrollPos(clientSize, pageSize, scrollPos);

  const newScrollbarPos = scrollbarPos + scrollbarOffset;

  const newPagePos = newScrollbarPos / scrollbarMaxScroll * pageMaxScroll;

  return {
    scrollbarSize,
    scrollbarMaxScroll,
    pageMaxScroll,
    scrollbarPos: newScrollbarPos,
    pagePos: newPagePos
  };
}