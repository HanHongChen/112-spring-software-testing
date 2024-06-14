const assert = require('assert');
const { test } = require('node:test');

const Calculator = require('../src/calculator');
const { isTypedArray } = require('util/types');

// TODO: write your test cases here to kill mutants
test("Test main invalid month1", () => {
    assert.throws(()=>{
        Calculator.main(0, 1, 1, 1, 1)
    }, /invalid month1/);
    assert.throws(()=>{
        Calculator.main(13, 1, 1, 1, 1)
    }, /invalid month1/);

    assert.doesNotThrow(() => {
        const result = Calculator.main(12, 1, 12, 2, 2021);
        assert.strictEqual(result, 1);
    });
});

test("Test main invalid month2", () => {
    assert.throws(()=>{
        Calculator.main(1, 1, 0, 1, 1)
    }, /invalid month2/);
    assert.throws(()=>{
        Calculator.main(1, 1, 13, 1, 1)
    }, /invalid month2/);
});

test("Test main invalid day1", () => {
    assert.throws(()=>{
        Calculator.main(1, 0, 1, 1, 1)
    }, /invalid day1/);
    assert.throws(()=>{
        Calculator.main(1, 32, 1, 1, 1)
    }, /invalid day1/);
    assert.doesNotThrow(() => {
        const result = Calculator.main(1, 31, 2, 1, 2021);
        assert.strictEqual(result, 1);
    });
});

test("Test main invalid day2", () => {
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 0, 1)
    }, /invalid day2/);
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 32, 1)
    }, /invalid day2/);
    assert.doesNotThrow(() => {
        const result = Calculator.main(1, 1, 1, 31, 2021);
        assert.strictEqual(result, 30);
    });
});

test("Test main invalid year", () => {
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 1, 0)
    }, /invalid year/);
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 1, 10001)
    }, /invalid year/);
    assert.doesNotThrow(() => {
        const result = Calculator.main(1, 1, 1, 2, 10000);
        assert.strictEqual(result, 1);
    });
});

test("Test main day1 > day2", () => {
    assert.throws(()=>{
        Calculator.main(1, 5, 1, 1, 1)
    }, /day1 must be less than day2 if month1 is equal to month2/);
    assert.doesNotThrow(() => {
        const result = Calculator.main(1, 1, 1, 1, 1);
        assert.strictEqual(result, 0);
    });
    // assert.doesNotThrow(() => {
    //     const result = Calculator.main(1, 1, 1, 2, 10000);
    //     assert.strictEqual(result, 1);
    // });
});

test("Test main month1 > month2", () => {
    assert.throws(()=>{
        Calculator.main(5, 1, 1, 1, 1)
    }, /month1 must be less than month2/);
    assert.doesNotThrow(() => {
        const result = Calculator.main(1, 1, 1, 2, 10000);
        assert.strictEqual(result, 1);
    });
});

test("Test main valid date range", () => {
    assert.doesNotThrow(() => {
        const result = Calculator.main(1, 1, 2, 1, 2023);
        assert.strictEqual(result, 31);
    });
});

// 測試閏年
test("Test main valid date range in leap year", () => {
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 28, 3, 1, 2020);
        assert.strictEqual(result, 2);
    });
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 1, 3, 1, 500);
        assert.strictEqual(result, 28);
    });
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 28, 3, 1, 400);
        assert.strictEqual(result, 2);
    });
});

// 測試普通年份
test("Test main valid date range in non-leap year", () => {
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 28, 3, 1, 2021);
        assert.strictEqual(result, 1);
    });
});

// 測試跨越多個月的計算
test("Test main valid date range spanning multiple months", () => {
    assert.doesNotThrow(() => {
        const result = Calculator.main(4, 1, 6, 1, 2023);
        assert.strictEqual(result, 61);
    });
});

