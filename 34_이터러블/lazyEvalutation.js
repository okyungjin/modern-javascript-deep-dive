const fibonacciFunc = () => {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return {
        value: cur, // 무한을 구현하기 위해 done을 생략한다.
      };
    },
  };
};

for (const num of fibonacciFunc()) {
  if (num > 1000) break;
  console.log(num); // 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
}

const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3); // 1 2 3
