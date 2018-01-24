var expect = chai.expect
describe('加法函数测试', function (){
  it('1 加 1 应该等于2', function (){
    expect(add(1, 1)).to.be.equal(2);
  });
  it('0加自身不变',function (){
    expect(add(0, 1)).to.be.equal(1);
    expect(add(0, 0)).to.be.equal(0)
  })
})