for (const item of [1, 2, 3]) {
  console.log(item); // item에 순차적으로 1, 2, 3이 할당된다.
}

console.log('================================================================');

// for .. of 문의 내부 동작을 for문으로 표현
const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator]();

for (;;) {
  const res = iterator.next();
  if (res.done) break;
  const item = res.value;
  console.log(item);
}
