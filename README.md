#### 测试框架 Mocha 实例教程
Mocha（发音"摩卡"）诞生于2011年，是现在最流行的JavaScript测试框架之一，在浏览器和Node环境都可以使用。
所谓"测试框架"，就是运行测试的工具。通过它，可以为JavaScript应用添加测试，从而保证代码的质量。
本文全面介绍如何使用Mocha，让你轻松上手。如果你以前对测试一无所知，本文也可以当作JavaScript单元测试入门。值得说明的是，除了Mocha以外，类似的测试框架还有Jasmine、Karma、Tape等，也很值得学习。
##### 一、安装
我为本文写了一个示例库Mocha-demos，请先安装这个库。
```bash
$ git clone https://github.com/kgm1818/mocha-demos.git
```
如果你的电脑没装Git，可以直接下载zip压缩包，进行解压。
然后，进入mocha-demos目录，安装依赖（你的电脑必须有Node）。
```bash
$ cd mocha-demos
$ npm install
```
上面代码会在目录内部安装Mocha，为了操作的方便，请在全面环境也安装一下Mocha。
```bash
$ npm install --global mocha
```
##### 二、测试脚本的写法
Mocha的作用是运行测试脚本，首先必须学会写测试脚本。所谓"测试脚本"，就是用来测试源码的脚本。
下面是一个加法模块add.js的代码。
```bash
// add.js
function add(x, y) {
  return x + y;
}

module.exports = add;
```
要测试这个加法模块是否正确，就要写测试脚本。
 通常，测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。比如，add.js的测试脚本名字就是add.test.js。
 ```bash
 // add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```
上面这段代码，就是测试脚本，它可以独立执行。测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。
describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。
##### 三、断言库的用法
上面的测试脚本里面，有一句断言。
```bash
expect(add(1, 1)).to.be.equal(2);
```
所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是，调用add(1, 1)，结果应该等于2。
所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库。
```bash
var expect = require('chai').expect;
```
断言库有很多种，Mocha并不限制使用哪一种。上面代码引入的断言库是chai，并且指定使用它的expect断言风格。
expect断言的优点是很接近自然语言，下面是一些例子。
```bash
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```
基本上，expect断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等。两者之间使用to或to.be连接。
如果expect断言不成立，就会抛出一个错误。事实上，只要不抛出错误，测试用例就算通过。
```bash
it('1 加 1 应该等于 2', function() {});
```
上面的这个测试用例，内部没有任何代码，由于没有抛出了错误，所以还是会通过。
##### 四、Mocha的基本用法
有了测试脚本以后，就可以用Mocha运行它。请进入demo01子目录，执行下面的命令。
```bash
$ mocha add.test.js

  加法函数的测试
    ✓ 1 加 1 应该等于 2

  1 passing (5ms)
  ```
  上面的运行结果表示，测试脚本通过了测试，一共只有1个测试用例，耗时是5毫秒。
mocha命令后面紧跟测试脚本的路径和文件名，可以指定多个测试脚本。
```bash
$ mocha file1 file2 file3
```
Mocha默认运行test子目录里面的测试脚本。所以，一般都会把测试脚本放在test目录里面，然后执行mocha就不需要参数了。请进入demo02子目录，运行下面的命令。
```bash
$ mocha

   加法函数的测试
    √ 1 加 1 应该等于 2
    √ 任何数加0应该等于自身

  2 passing (6ms)
  ```
  这时可以看到，test子目录里面的测试脚本执行了。但是，你打开test子目录，会发现下面还有一个test/dir子目录，里面还有一个测试脚本multiply.test.js，并没有得到执行。原来，Mocha默认只执行test子目录下面第一层的测试用例，不会执行更下层的用例。

为了改变这种行为，就必须加上--recursive参数，这时test子目录下面所有的测试用例----不管在哪一层----都会执行。
```bash
$ mocha --recursive

  加法函数的测试
    √ 1 加 1 应该等于 2
    √ 任何数加0应该等于自身

  乘法函数的测试
    √ 1 乘 1 应该等于 1

  3 passing (10ms)
  ```
#####   五、通配符
命令行指定测试脚本时，可以使用通配符，同时指定多个文件。
```bash
$ mocha spec/{my,awesome}.js
$ mocha test/unit/*.js
```
上面的第一行命令，指定执行spec目录下面的my.js和awesome.js。第二行命令，指定执行test/unit目录下面的所有js文件。
除了使用Shell通配符，还可以使用Node通配符。
```bash
$ mocha 'test/**/*.@(js|jsx)'
```
上面代码指定运行test目录下面任何子目录中、文件后缀名为js或jsx的测试脚本。注意，Node的通配符要放在单引号之中，否则星号（*）会先被Shell解释。
上面这行Node通配符，如果改用Shell通配符，要写成下面这样。
```bash
$ mocha test/{,**/}*.{js,jsx}
```
##### 六、命令行参数
除了前面介绍的--recursive，Mocha还可以加上其他命令行参数。请在demo02子目录里面，运行下面的命令，查看效果。
###### 6.1 --help, -h
--help或-h参数，用来查看Mocha的所有命令行参数。
```bash
$ mocha --help
```
##### 七，配置文件mocha.opts
Mocha允许在test目录下面，放置配置文件mocha.opts，把命令行参数写在里面。请先进入demo03目录，运行下面的命令。
```bash
$ mocha --recursive --reporter tap --growl
```
上面这个命令有三个参数--recursive、--reporter tap、--growl。
然后，把这三个参数写入test目录下的mocha.opts文件。
```bash
--reporter tap
--recursive
--growl
```
然后，执行mocha就能取得与第一行命令一样的效果。
```bash
$ mocha
```
如果测试用例不是存放在test子目录，可以在mocha.opts写入以下内容。
```bash
server-tests
--recursive
```
上面代码指定运行server-tests目录及其子目录之中的测试脚本。
##### 八、ES6测试
未完待续。。。