// ======== 이터러블 확인 함수 ========
const isIterable = (v) =>
  v !== null && typeof v[Symbol.iterator] === "function";

// Array, String, Map, Set 등은 이터러블이다.
console.log(isIterable([])); // true
console.log(isIterable("")); // true
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set())); // true
console.log(isIterable({})); // false

console.log("================================================================");

// ======== 배열은 이터러블이다 ========
// for ... of / destructing
const array = [1, 2, 3];

console.log(Symbol.iterator in array); // true

// for ... of
for (const item of array) {
  console.log(item);
}

// spread
console.log([...array]); // [1, 2, 3]

// destructuring assignment
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]

console.log("================================================================");

// ======== 일반 객체는 이터러블이 아님 ========
const obj = {
  a: 1,
  b: 2,
};

console.log(Symbol.iterator in obj); // false

// TODO: Remove comment
// for (const item of obj) {
//   console.log(item); // TypeError: obj is not iterable
// }

// const [b, c] = obj; // TypeError: obj is not iterable

console.log({ ...obj }); // { a: 1, b: 2 }
