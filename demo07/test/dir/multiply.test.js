var mulit = require('../../src/multiply.js')
var expect = require('chai').expect
describe('乘法函数测试', function () {
  it.only('1 乘 1 应该等于 1 ', function () {
    expect(mulit(1, 1)).to.be.equal(1);
  })
})