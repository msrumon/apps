import { beforeEach, describe, expect, it } from 'vitest';

import App from './app.class';

describe('App', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  it('should throw error for invalid number 10..01', () => {
    app.input = '10..01';
    app.convert();
    expect([app.error, app.output]).toStrictEqual([
      'Not a binary number!',
      '--',
    ]);
  });

  it('should throw error for invalid number 10.2.01', () => {
    app.input = '10.2.01';
    app.convert();
    expect([app.error, app.output]).toStrictEqual([
      'Not a binary number!',
      '--',
    ]);
  });

  it('should throw error for invalid binary number 121', () => {
    app.input = '121';
    app.convert();
    expect([app.error, app.output]).toStrictEqual([
      'Not a binary number!',
      '--',
    ]);
  });

  it('should output 9 for input 1001', () => {
    app.input = '1001';
    app.convert();
    expect([app.error, app.output]).toStrictEqual(['', '9']);
  });

  it('should output 2.25 for input 10.01', () => {
    app.input = '10.01';
    app.convert();
    expect([app.error, app.output]).toStrictEqual(['', '2.25']);
  });
});
