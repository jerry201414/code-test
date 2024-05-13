const throttle = (fn, delay) => {
  let timer = null;
  let startTime = Date.now();

  return function () {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    const context = this;
    const args = arguments;

    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
};

const debounce = (fn, delay) => {
  let timer = null;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
