const array = [1, 2, 3];

// 배열은 이터러블 프로토콜을 준수한 이터러블이므로, Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();
console.log("next" in iterator); // true

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
