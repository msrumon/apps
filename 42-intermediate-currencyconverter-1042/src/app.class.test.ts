import { beforeEach, describe, expect, it } from 'vitest';

import App from './app.class';

describe('App', () => {
  let app: App;

  beforeEach(async () => {
    app = new App();
    await app.init();
  });

  it('should throw error for missing inputs', () => {
    app.convert();
    expect([app.error, app.result]).toStrictEqual(['Missing fields!', '']);
  });

  it('should throw error for invalid currencies', () => {
    app.amount = '123';
    app.from = 'foo';
    app.to = 'bar';
    app.convert();
    expect([app.error, app.result]).toStrictEqual([
      'Unsupported currency!',
      '',
    ]);
  });

  it('should output correct result (1)', () => {
    app.amount = '123';
    app.from = 'USD';
    app.to = 'EUR';
    app.convert();
    expect([app.error, app.result]).toStrictEqual(['', '123 USD = 114.32 EUR']);
  });

  it('should output correct result (2)', () => {
    app.amount = '123';
    app.from = 'EUR';
    app.to = 'GBP';
    app.convert();
    expect([app.error, app.result]).toStrictEqual(['', '123 EUR = 105.48 GBP']);
  });

  it('should output correct result (3)', () => {
    app.amount = '123';
    app.from = 'CAD';
    app.to = 'AUD';
    app.convert();
    expect([app.error, app.result]).toStrictEqual(['', '123 CAD = 136.20 AUD']);
  });
});
