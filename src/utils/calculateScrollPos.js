/**
* 计算滚动容器参数
* @params {number} clientSize - 滚动容器的尺寸
* @params {number} pageSize - 滚动容器里内容的尺寸
* @return {object} .scrollbarSize - 滚动条的尺寸
* @return {object} .scrollbarMaxScroll - 滚动条可滚动的距离
* @return {object} .pageMaxScroll - 视图可滚动的距离
**/
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




/**
* 计算滚动条滚动的距离
* @params {number} clientSize - 滚动容器的尺寸
* @params {number} pageSize - 滚动容器里内容的尺寸
* @params {number} scrollPos - 滚动的距离
* @return {object} .scrollbarSize - 滚动条的尺寸
* @return {object} .scrollbarMaxScroll - 滚动条可滚动的距离
* @return {object} .pageMaxScroll - 视图可滚动的距离
* @return {object} .scrollbarPos - 滚动条的滚动距离
**/
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




/**
* 根据滚动条的滚动偏移量计算容器滚动的距离
* @params {number} clientSize - 滚动容器的尺寸
* @params {number} pageSize - 滚动容器里内容的尺寸
* @params {number} scrollPos - 滚动的距离
* @params {number} scrollbarOffset - 滚动条的偏移量
* @return {object} .scrollbarSize - 滚动条的尺寸
* @return {object} .scrollbarMaxScroll - 滚动条可滚动的距离
* @return {object} .pageMaxScroll - 视图可滚动的距离
* @return {object} .scrollbarPos - 滚动条的滚动距离
* @return {object} .pagePos - 滚动容器的滚动距离
**/
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
