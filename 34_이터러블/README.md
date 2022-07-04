# 이터러블 (Iterable)

- [✅ &nbsp;이터레이션 프로토콜 (Iteration Protocol)](#-이터레이션-프로토콜-iteration-protocol)
- [✅ &nbsp;이터러블 (Iterable)](#-이터러블-iterable)
- [✅ &nbsp;이터레이터 (Iterator)](#-이터레이터-iterator)
- [✅ &nbsp;빌트인 인터러블](#-빌트인-인터러블)
- [✅ &nbsp;for ... of 문](#-for--of-문)
- [✅ &nbsp;무한 이터러블과 지연 평가](#-무한-이터러블과-지연-평가)

<br/>

![iterable-iterator](https://user-images.githubusercontent.com/31913666/176586876-da5390a7-4c9b-4bd3-ac8a-7788e9e05fb1.jpeg)

## ✅ &nbsp;이터레이션 프로토콜 (Iteration Protocol)

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

<br/><br/>

## ✅ &nbsp;이터러블 (Iterable)

> 이터러블 프로토콜을 준수한 객체를 이터러블이라고 한다.

즉, 이터러블은 `Symbol.iterator` 를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 말한다.

<br/>

### 이터러블인지 확인하는 함수

이터러블을 확인하는 함수는 다음과 같이 구현할 수 있다.

```js
const isIterable = (v) =>
  v !== null && typeof v[Symbol.iterator] === 'function';

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
  b: 2,
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

## ✅ &nbsp;이터레이터 (Iterator)

> 이터러블의 `Symbol.iterator` 메서들르 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.

이터러블의 `Symbol.iterator` 메서드가 반환한 이터레이터는 `next` 메서드를 갖는다.

```js
const array = [1, 2, 3];

// 배열은 이터러블 프로토콜을 준수한 이터러블이므로, Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();
console.log('next' in iterator); // true
```

이터레이터의 `next` 메서드는 이터러블의 각 요소를 순회하기 위한 포인터 역할을 한다.

즉, `next` 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는
**이터레이터 리절트 객체<sup>Iterator result object</sup>** 를 반환한다.

<br/>

```js
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

이터레이터의 `next` 메서드가 반환하는 이터레이터 리절트 객체

- `value` 현재 순회 중인 이터러블의 값
- `done` 프로퍼티는 이터러블의 순회 완료 여부

<br/><br/>

## ✅ &nbsp;빌트인 인터러블

자바스크립트는 이터레이션 프로포콜을 준수한 객체인 `빌트인 이터러블` 을 제공한다.

다음의 표준 빌트인 객체들은 **빌트인 인터러블**이다.

| 빌트인 이터러블 | `Symbol.iterator` 메서드                                                                |
| --------------- | --------------------------------------------------------------------------------------- |
| `Array`         | `Array.prototype[Symbol.iterator]`                                                      |
| `String`        | `String.prototype[Symbol.iterator]`                                                     |
| `Map`           | `Map.prototype[Symbol.iterator]`                                                        |
| `Set`           | `Set.prototype[Symbol.iterator]`                                                        |
| `TypedArray`    | `TypedArray.prototype[Symbol.iterator]`                                                 |
| `arguments`     | `arguments.prototype[Symbol.iterator]`                                                  |
| DOM 컬렉션      | `NodeList.prototype[Symbol.iterator]` <br/> `HTMLCollection.prototype[Symbol.iterator]` |

<br/><br/>

## ✅ &nbsp;for ... of 문

### for ... in

`for ... in ` 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서
프로퍼티 어트리뷰트 `[[Enumberable]]` 의 값이 `true` 인 프로퍼티를 순회하여 열거<sup>enumeration</sup> 한다.

이 때, 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.

### for ... of

`for ... of` 문은 내부적으로 이터레이터의 `next` 메서드를 호출하여 이터러블을 순회하며
`next` 메서드가 반환한 이터레이터 리절트 객체의 `value` 프로퍼티 값을 `for ... of` 문의 변수에 할당한다.

그리고 이터레이터 리절트 객체의 `done` 프로퍼티 값이 `false` 이면 이터러블의 순회를 계속하고
`true` 이면 이터러블의 순회를 중단한다.

```js
for (const item of [1, 2, 3]) {
  // item에 순차적으로 1, 2, 3이 할당된다.
  console.log(item);
}
```

<br/>

`for ... of` 문의 내부 동작을 for 문으로 표현하면 다음과 같다.

```js
// for .. of 문의 내부 동작을 for문으로 표현
const iterable = [1, 2, 3];
const iterator = iterable[Symbol.iterator]();

for (;;) {
  const res = iterator.next();
  if (res.done) break;
  const item = res.value;
  console.log(item);
}
```

<br/><br/>

## ✅ &nbsp;무한 이터러블과 지연 평가

다음 소스는 무한 이터러블을 정의한 소스이다.

```js
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
```

> 이터러블은 데이터 공급자의 역할을 한다.

배열이나 문자열 등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급한다. 하지만 **이터러블은 지연 평가 <sup>Lazy evalutation</sup>을 통해 데이터를 생성한다.**

> **지연 평가 (Lazy evalutation)**
>
> 지연 평가란 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가, 데이터가 필요한 시점이 되면 데이터를 생성하는 기법이다. 즉, 평가 결과가 필요할 때까지 평가를 늦추는 기법이 지연 평가이다.

위 예제에서 `fibonacciFunc` 함수는 무한 이터러블을 생성한다.

하지만 데이터 소비자인 `for ... of` 문이나 배열 디스트럭처링 할당 등이 실행되기 이전까지는 데이터를 생성하지 않는다.

`for ... of` 문의 경우 이터러블을 순회할 때 내부에서 이터레이터의 `next` 메서드를 호출하는데 바로 이 때 데이터가 생성된다. `next` 메서드가 호출되기 이전까지는 데이터를 생성하지 않는다.

지연 평가를 사용하면 빠른 속도를 기대할 수 있고 불필요한 메모리의 낭비를 줄일 수 있다. 또한 무한을 표현할 수 있다는 장점이 있다.
