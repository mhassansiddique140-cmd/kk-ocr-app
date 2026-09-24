const test = require('node:test');
const assert = require('node:assert');
const RULES = require('../js/tax-rules.js');
const { calculateTax } = require('../js/calculator.js');

const sal26 = RULES['FY 2025-26'].salaried;
const sal25 = RULES['FY 2024-25'].salaried;
const biz26 = RULES['FY 2025-26'].business;

test('no tax up to 600,000', () => {
  assert.strictEqual(calculateTax(600000, sal26).annualTax, 0);
  assert.strictEqual(calculateTax(0, sal26).annualTax, 0);
  assert.strictEqual(calculateTax(-5, sal26).annualTax, 0);
});

test('slab boundaries are continuous (FY 2025-26 salaried)', () => {
  assert.strictEqual(calculateTax(1200000, sal26).annualTax, 6000);
  assert.strictEqual(calculateTax(2200000, sal26).annualTax, 116000);
  assert.strictEqual(calculateTax(3200000, sal26).annualTax, 346000);
  assert.strictEqual(calculateTax(4100000, sal26).annualTax, 616000);
});

test('monthly salary of 100,000 in FY 2025-26', () => {
  const r = calculateTax(1200000, sal26);
  assert.strictEqual(r.monthlyTax, 500);
  assert.strictEqual(r.monthlyNet, 99500);
});

test('FY 2024-25 salaried', () => {
  assert.strictEqual(calculateTax(1200000, sal25).annualTax, 30000);
  assert.strictEqual(calculateTax(4100000, sal25).annualTax, 700000);
});

test('surcharge applies only above 10 million', () => {
  const at = calculateTax(10000000, sal26);
  assert.strictEqual(at.surcharge, 0);
  const above = calculateTax(12000000, sal26);
  const base = 616000 + 0.35 * (12000000 - 4100000);
  assert.strictEqual(above.baseTax, Math.round(base));
  assert.strictEqual(above.surcharge, Math.round(base * 0.09));
});

test('business slabs', () => {
  assert.strictEqual(calculateTax(1600000, biz26).annualTax, 170000);
  assert.strictEqual(calculateTax(5600000, biz26).annualTax, 1610000);
});
