# 이터러블 (Iterable)

## ✅ 이터레이션 프로토콜 (Iteration Protocol)
ES6에서 도입된 **이터레이션 프로토콜**<sup>Iteration Protocol</sup> 은 순회 가능한<sup>iterable</sup> 데이터 컬렉션을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.


ES6에서는 순회 가능한 데이터 컬렉션을 **이터레이션 프로토콜을 준수하는 이터러블로 통일**하여 `for ... of` 문, **스프레드 문법**, **배열 디스트럭처링 할당**의 대상으로 사용할 수 있도록 일원화했다.

이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.

> `이터러블 프로토콜 (Iterable Protocol)`


- `Symbol.iterator` 메서드를 호출하면 **이터레이터 프로토콜을 준수한 이터레이터**를 반환한다.
- 이러한 규약을 이터러블 프로토콜이라 한다.
- 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다.
- 이터러블은 `for ... of` 문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

<br/>

> `이터레이터 프로토콜 (Iterator Protocol)`

이터러블의 `Symbol.iterator` 메서드를 호출하면 이터레이터 프로토콜을 준수한 **이터레이터**를 반환한다.

- 이터레이터는 `next` 메서드를 소유한다.
- `next` 메서드를 호출하면 이터러블을 순회하며 `value` 와 `done` 프로퍼티를 갖는 이터레이터 리털트 객체를 반환한다.
- 이러한 규약을 이터레이터 프로토콜이라 하며, 이터레이터 프로토콜을 준수하는 객체를 이터레이터라고 한다.
- 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.

<br/>

## ✅ 이터러블 (Iterable)
> 이터러블 프로토콜을 준수한 객체를 이터러블이라고 한다.

즉, 이터러블은 `Symbol.iterator` 를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 말한다.

<br/>

### 이터러블인지 확인하는 함수
이터러블을 확인하는 함수는 다음과 같이 구현할 수 있다.

```js
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// Array, String, Map, Set 등은 이터러블이다.
console.log(isIterable([])); // true
console.log(isIterable('')); // true
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set())); // true
console.log(isIterable({})); // false
```

<br/>

### 배열은 이터러블
> 배열은 `Array.prototype` 의 `Symbol.iterator` 메서드를 상속받는 이터러블이다.

이터러블은 `for ... of` 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.

```js
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
```

<br/>

### 일반 객체는 이터러블이 아님

`Symbol.iterator` 메서드를 직접 구현하거나 상속 받지 않은 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.

따라서 일반 객체는 `for ... of` 문으로 순회할 수 없으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.

```js
const obj = {
  a: 1,
  b: 2
};
console.log(Symbol.iterator in obj); // false

// 일반 객체는 for ... of 로 순회할 수 없다.
for (const item of obj) {
  console.log(item); // TypeError: obj is not iterable
}

// 일반 객체는 destructuring assign 할 수 없다.
const [b, c] = obj; // TypeError: obj is not iterable

// 일반 객체에 spread 문법의 사용을 허용한다.
console.log({ ...obj }); // { a: 1, b: 2 }
```

<br/><br/>

## ✅ 이터레이터 (Iterator)
