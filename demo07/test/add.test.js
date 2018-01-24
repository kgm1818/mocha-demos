var add = require('../src/add.js')
var expect = require('chai').expect
describe('异步测试用例', function () {
  it('任何数加0应该等于自身....', function () {
    expect(add(1, 0)).to.be.equal(1);
  });
  it.only('1 加1 应该等于 2 ', function () {
    expect(add(1, 1)).to.be.equal(2);
  });
  it('0 加自身应该等于自身', function () {
    expect(add(1, 0)).to.be.equal(1);
  });
})