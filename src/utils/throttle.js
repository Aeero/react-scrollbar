export default function throttle(fn, delay = 500) {
  let flag = false;

  let timer = null;

  return (...args) => {
    if (!flag) {
      flag = true;
      fn(...args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      flag = false;
    }, delay);
  }
}
