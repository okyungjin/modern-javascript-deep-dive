const foo = () => {
  console.log('foo');
};

const bar = () => {
  console.log('bar');
};

setTimeout(foo, 3_000);
bar();

/* console: bar 호출 -> (3초 경과 후) foo 호출
bar
foo
*/

/*
 * setTimeout, setInterval, HTTP 요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다.
 * 커스텀 이벤트를 디스패치하거나 click, blur, focus 메서드 등을 호출하면 해당 이벤트 핸들러가 태스크 큐를 거치지 않고 즉시 호출된다. 즉, 동기 처리 방식으로 동작한다.
 * 비동기 처리는 이벤트 루프와 태스크 큐와 깊은 관계가 있다.
 * */
