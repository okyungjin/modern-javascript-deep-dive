/**
 * 자바스크립트는 싱글 스레드로 동작한다. 자바스크립트의 동시성(concurrency)를 지원하는 것이 이벤트 루프(Event Loop)이다.
 * 이벤트 루프는 브라우저에 내장되어 있는 기능 중 하나이다.
 */

const foo = () => {
  console.log('foo');
};

const bar = () => {
  console.log('bar');
};

setTimeout(foo, 0);
bar();
