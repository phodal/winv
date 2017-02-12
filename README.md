# WINA: A mini MINA framework for fun

[![Travis build status](http://img.shields.io/travis/phodal/winv.svg?style=flat)](https://travis-ci.org/phodal/winv)
[![Code Climate](https://codeclimate.com/github/phodal/winv/badges/gpa.svg)](https://codeclimate.com/github/phodal/winv)
[![Test Coverage](https://codeclimate.com/github/phodal/winv/badges/coverage.svg)](https://codeclimate.com/github/phodal/winv)
[![Dependency Status](https://david-dm.org/phodal/winv.svg)](https://david-dm.org/phodal/winv)
[![devDependency Status](https://david-dm.org/phodal/winv/dev-status.svg)](https://david-dm.org/phodal/winv#info=devDependencies)

设计构思
---

基本的设计点有：

 - 兼容微信小程序的语法——它并没有多少复杂的语法。只是简单的Virtual DOM操作，以及事件绑定
 - 尽可能兼容大部分的微信API，兼容所有的微信API几乎是不可能的。
 - 提供一个Virtual DOM转换的混合应用插件。

在之前的文章里，我们提到了MINA框架的基本原理，也差不多就是组件：

 - WXML转JSON Virtual DOM组件
 - Virtual DOM组件，并在这其中提供双向绑定
 - UI组件转换器，即将WXML转换为Web浏览器中的标签
 - UI组件，需要有一套UI组件，最好是和小程序保持一致，如WEUI
 - AMD组件，提供模块化需求
 - APP引擎，需要有Page模块和APP模块，来处理页面逻辑，还有Route。

一个WINV框架的Demo
---

计划了好几天的Demo，终于写完了，并且可以出来溜溜了~~。

这份代码在GitHub上，欢迎试玩：[https://github.com/phodal/winv](https://github.com/phodal/winv)

并创建一个更好的出来，毕竟国庆要和我们家 ‘花仲马’出去玩。

好了，看我们的代码，这还只是一个丑陋的原型，但是差不多可以解释了。

```javascript
var App = winv.App;
var Page = winv.Page;

App({
    onLaunch: function() {
        console.log('On Launch');
    }
});
Page({
    data: {
        motto: 'hello, world'
    },
    onLoad: function() {
        console.log('On Load');
    }
});

winv.setTemplate('<view class="container"><text class="user-motto">{{motto}}</text></view>')
winv.appRun();
```    

它在页面上的运行结果就是，输出一个 ``hello, world``。顺便吐槽一句，微信小程序自带的hello world不是标准的hello world。Wiki上说：

> 但是需要注意的是，Hello World的标准程序是“hello, world”，没有感叹号，全部小写，逗号后面有空格，与现在流行的写法并不一致。

出于原型的原因考虑，没有像MINA一样，使用大量的事件来触发，只是简单的Run：

```javascript
var domJson = this.stringToDomJSON(this.template)[0];
var dom = this.jsonToDom(domJson);
document.getElementById('app').appendChild(dom);
for (var event in window.eventPool) {
  window.eventPool[event]();
}
```

第一步，将上面的Template转化为JSON格式的Template，由DOMParser将其转换为DOM，并在这个时候添加一个Page标签。然后在转换的时候，顺便做一些更新的数据操作。
第二步，这个JSON DOM在转换成真实的DOM的时候，应该要添加事件绑定，只是还没有实现。
第三步，上面的DOM会被放到app ID里，结果就变成了

```xml
<winv-div class="page">
	<winv-div class="page__hd">
		<winv-view class="container">
			<winv-text class="user-motto">hello, world</winv-text>
		</winv-view>
	</winv-div>	
</winv-div>
```

一看就知道还有好多坑要填。

第四步，则是调用上面的on方法，写得比较简单、粗暴。

至于，对事件和数据的判断还是和MINA一致：

```javascript
if('on' === option.slice(0, 2))
```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2016 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/blog/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
