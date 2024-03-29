# 42장. 비동기 프로그래밍

- [자바스크립트의 동시성](#자바스크립트의-동시성)
- [태스크 큐 (Task Queue)](#태스크-큐-task-queue)
- [이벤트 루프 (Event Loop)](#이벤트-루프-event-loop)
- [`setTimeout(cb, 0)` 는 어떻게 동작하는가?](#settimeoutcb-0-는-어떻게-동작하는가)
- [Wrap Up](#wrap-up)

<br>

## 자바스크립트의 동시성
자바스크립트는 싱글 스레드로 동작한다. 자바스크립트의 동시성(concurrency)를 지원하는 것이 **이벤트 루프(Event Loop)** 이다.

비동기 처리에서 소스 코드의 평가와 실행을 제외한 모든 처리는 자바스크립트 엔진을 구동하는 환경인 브라우저 또는 Node.js가 담당한다.
- 자바스크립트 엔진 : `setTimeout`의 콜백 함수 평가와 실행 담당
- 브라우저 또는 Node.js : 호출 스케줄링을 위한 타이머 설정과 콜백 함수의 등록 담당

이를 위해 브라우저 환경은 태스크 큐와 이벤트 루프를 제공한다.

<img alt="Event Loop" src="https://user-images.githubusercontent.com/31913666/196041356-af3d107c-1327-4473-a240-1469bc18cebf.png" width="600">


<br>

## 태스크 큐 (Task Queue)
`setTimeout`이나 `setInterval`과 같은 **비동기 함수의 콜백 함수** 또는 **이벤트 핸들러**가 *일시적으로 보관되는 영역*이며, Event Queue 혹은 Callback Queue라고도 한다.<br>
(태스크 큐와는 별도로 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는 마이크로태스크 큐도 존재한다.)

<br>

## 이벤트 루프 (Event Loop)
이벤트 루프는 다음 사항을 반복해서 확인한다.
- 콜 스택에 현재 실행 중인 실행 컨텍스트가 있는지
- 태스크 큐에 대기 중인 함수(콜백 함수, 이벤트 핸들러 등)가 있는지

만약 콜 스택이 비어있고, 태스트 큐에 대기 중인 함수가 있다면 **이벤트 루프는 순차적으로 태스크 큐에 대기중인 함수를 콜 스택으로 이동시킨다**.

<br>

## `setTimeout(cb, 0)` 는 어떻게 동작하는가?
브라우저 환경에서 다음 코드의 동작 방식을 분석해보자.
```js
const foo = () => {
  console.log('foo');
};

const bar = () => {
  console.log('bar');
};

setTimeout(foo, 0); // 0초(실제는 4ms) 후에 foo 함수가 호출된다.
bar();
```
1. 전역 코드가 평가 👉 *전역 실행 컨텍스트* 생성되고 콜 스택에 푸시된다.


2. 전역 코드 실행 👉 `setTimeout` 함수 호출
   1. `setTimeout` 함수의 *함수 실행 컨텍스트* 생성되고 콜 스택에 푸시되어 *현재 실행중인 실행 컨텍스트*가 된다.
   2. 브라우저의 Web API인 타이머 함수도 *함수 실행 컨텍스트*를 생성한다.


3. `setTimeout` 함수가 실행되면 **콜백 함수를 호출 스케줄링**하고 종료되어 콜 스택에서 팝된다. 이때 호출 스케줄링 즉 **타이머 설정과 타이머가 만료되면 콜백 함수를 태스크 큐에 푸시하는 것은 브라우저의 역할**이다.


4. 브라우저와 자바스크립트 엔진이 수행하는 작업은 병행 처리된다
   1. **브라우저**: 타이머를 설정하고 타이머의 만료를 기다림. 타이머가 만료되면 콜백 함수 `foo`가 태스크 큐에 푸시된다. delay가 4ms 이하인 경우 최소 지연 시간 4ms가 지정된다. 따라서 콜백 함수 `foo`가 태스크 큐에 푸시되어 대기한다.
   2. **자바스크립트** 엔진: `bar` 함수가 호출되어 `bar` 함수의 함수 컨텍스트가 생성되고 콜 스택에 푸시되어 현재 실행 중인 실행 컨텍스트가 된다. `bar` 함수가 종료되어 콜 스택에서 팝된다. **이때 브라우저가 타이머를 설정한 후 4ms가 경과했다면 `foo` 함수는 아직 태스크 큐에서 대기 중이다.**


5. 전역 코드 실행이 종료되고 전역 시랭 컨텍스트가 콜 스택에서 팝된다. 이로서 콜 스택에는 아무런 실행 컨텍스트도 존재하지 않게 된다.


6. 이벤트 루프에 의해 콜 시택이 비어있음이 감지되고, 태스큐 큐에서 대기 중인 콜백함수 `foo`가 이벤트 루프에 의해 콜 스택에 푸시 된다. 콜백함수 `foo`의 *함수 실행 컨텍스트*가 생성되고 콜 스택에 푸시되어 *현재 실행 중인 실행 컨텍스트*가 된다. 이후 `foo` 함수가 종료되어 콜 스택에서 팝된다.

<br>

## Wrap Up
- 싱글 스레드 방식으로 동작하는 것은 브라우저가 아니라 브라우저에 내장된 자바스크립트 엔진이다.
- 자바스크립트 엔진은 싱글 스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다.
- 비동기 함수인 `setTimeout`의 콜백 함수는 태스크 큐에 푸시되어 대기하다가 콜 스택이 비게 되면<sup>전역 코드 및 명시적으로 호출된 함수가 모두 종료하면</sup> 콜 스택에 푸시되어 실행된다.