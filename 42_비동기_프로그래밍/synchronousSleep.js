/**
 * `delay` 시간이 경과한 후 `func` 함수를 실행한다.
 */
const sleep = (func, delay) => {
  const delayUntil = Date.now() + delay;
  while (Date.now() < delayUntil) {}
  func();
};

const foo = () => {
  console.log('foo');
};

const bar = () => {
  console.log('bar');
};

sleep(foo, 3_000);
bar();

/* console
foo
bar
*/
