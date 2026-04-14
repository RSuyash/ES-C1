import test from 'node:test';
import assert from 'node:assert/strict';

import { navigateToLandingPath, readLandingPath } from './landing-navigation';

test('readLandingPath prefers the explicit initial path', () => {
  assert.equal(readLandingPath('/thank-you'), '/thank-you');
});

test('navigateToLandingPath pushes history, scrolls to top, and emits popstate', () => {
  const events: string[] = [];
  const pushCalls: unknown[][] = [];
  const replaceCalls: unknown[][] = [];
  const scrollCalls: Array<{ top?: number; left?: number }> = [];
  const originalWindow = globalThis.window;

  const fakeWindow = {
    history: {
      state: { from: 'test' },
      pushState: (...args: unknown[]) => pushCalls.push(args),
      replaceState: (...args: unknown[]) => replaceCalls.push(args),
    },
    scrollTo: (options: { top?: number; left?: number }) => scrollCalls.push(options),
    dispatchEvent: (event: Event) => {
      events.push(event.type);
      return true;
    },
    location: {
      pathname: '/',
    },
  } as unknown as Window & typeof globalThis;

  Object.assign(globalThis, { window: fakeWindow });

  try {
    navigateToLandingPath('/thank-you');
  } finally {
    Object.assign(globalThis, { window: originalWindow });
  }

  assert.equal(pushCalls.length, 1);
  assert.deepEqual(pushCalls[0], [{ from: 'test' }, '', '/thank-you']);
  assert.equal(replaceCalls.length, 0);
  assert.deepEqual(scrollCalls[0], { top: 0, left: 0 });
  assert.deepEqual(events, ['popstate']);
});
