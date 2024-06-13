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
    // assert.doesNotThrow(() => {
    //     Calculator.main(12, 1,s 1, 1, 1);
    // });
    // assert.doesNotThrow(() => {
    //     Calculator.main(1, 1, 1, 1, 1);
    // });
});

test("Test main invalid month2", () => {
    assert.throws(()=>{
        Calculator.main(1, 1, 0, 1, 1)
    }, /invalid month2/);
    assert.throws(()=>{
        Calculator.main(1, 1, 13, 1, 1)
    }, /invalid month2/);
    // assert.doesNotThrow(() => {
    //     Calculator.main(1, 1, 12, 1, 1);
    // });
    // assert.doesNotThrow(() => {
    //     Calculator.main(1, 1, 1, 1, 1);
    // });
});

test("Test main invalid day1", () => {
    assert.throws(()=>{
        Calculator.main(1, 0, 1, 1, 1)
    }, /invalid day1/);
    assert.throws(()=>{
        Calculator.main(1, 32, 1, 1, 1)
    }, /invalid day1/);
});

test("Test main invalid day2", () => {
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 0, 1)
    }, /invalid day2/);
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 32, 1)
    }, /invalid day2/);
});

test("Test main invalid year", () => {
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 1, 0)
    }, /invalid year/);
    assert.throws(()=>{
        Calculator.main(1, 1, 1, 1, 10001)
    }, /invalid year/);
    // assert.doesNotThrow(() => {
    //     Calculator.main(1, 1, 1, 1, 1);
    // });
    // assert.doesNotThrow(() => {
    //     Calculator.main(1, 1, 1, 1, 10000)
    // });
});

// -           if (month1 === month2 && day1 > day2) {
// +           if (true && day1 > day2) {
test("Test main day1 > day2", () => {
    assert.throws(()=>{
        Calculator.main(1, 5, 1, 1, 1)
    }, /day1 must be less than day2 if month1 is equal to month2/);
    
    assert.throws(()=>{
        Calculator.main(1, 5, 1, 5, 1)
    }, /day1 must be less than day2 if month1 is equal to month2/);

    // assert.doesNotThrow(() => {
    //     Calculator.main(1, 1, 1, 1, 1);
    // });
});

test("Test main month1 > month2", () => {
    assert.throws(()=>{
        Calculator.main(5, 1, 1, 1, 1)
    }, /month1 must be less than month2/);

    assert.throws(()=>{
        Calculator.main(5, 1, 5, 1, 1)
    }, /month1 must be less than month2/);
    // assert.doesNotThrow(() => {
    //     Calculator.main(1, 1, 1, 1, 1);
    // });
});

