function consoleTip(fn) {
  return function(flag, text) {
    if (flag) {
      fn(text);
    }
  }
}


export const error = consoleTip(() => console.error);

export const warn = consoleTip(() => console.wran);

export const log = consoleTip(() => console.log);