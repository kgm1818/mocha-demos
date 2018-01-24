var expect = require('chai').expect
describe('异步测试', function () {
  var foo = false;
  beforeEach(function (done) {
    setTimeout(() => {
      foo = true;
      done();
    }, 1000);
  });
  it('全局变量应该改变成功', function () {
    expect(foo).to.be.equal(true);
  });
})