export const generateFibonacciIterable = (max) => {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};

for (const num of generateFibonacciIterable(10)) {
  console.log(num);
}
// 1
// 2
// 3
// 5
// 8
