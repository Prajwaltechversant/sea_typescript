// import {describe, expect, test} from '@jest/globals';

// describe('sum module', () => {
//   const z = 0
//   test('adding numbers should be greater than 10 ', () => {
//     expect(z).toBe(0)
//   });
// });

// // src/screens/Testing/jest/sample1/sum.test.ts

// import renderer from 'react-test-renderer';
// import Intro from  './Intro'

// jest.useFakeTimers();
// jest.spyOn(global, 'setTimeout');
// import timerGame from './timerGame'
// test('waits 1 second before ending the game', () => {
  
//   timerGame();
//   // timerGame();


//   expect(setTimeout).toHaveBeenCalledTimes(1);
//   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
// });

import timerGame from './timerGame'

jest.useFakeTimers();
test('calls the callback after 1 second', () => {
  const callback = jest.fn();

  timerGame(callback);
  timerGame(callback);


  // At this point in time, the callback should not have been called yet
  expect(callback).not.toHaveBeenCalled();

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // Now our callback should have been called!
  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenCalledTimes(2);
});


// src/screens/Testing/jest/sample1/__tests__/timerGame-test.js