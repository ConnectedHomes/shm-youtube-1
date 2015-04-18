# Angular Youtube

[![wercker status](https://app.wercker.com/status/adac01a17208b68356699703f2c462c8/m "wercker status")](https://app.wercker.com/project/bykey/adac01a17208b68356699703f2c462c8)


```
bower i shm-youtube
```

Import shm.youtube module into your app.  
```js
var app = angular.module('yourApp', ['shm.youtube'])

```

Use that tag  
```html
<youtube 
	width="100%"
	height="480"
	mercy="1000"
	video="98QwPO1b5j4">
</youtube>
```

The mercy attribute is the time delay in milliseconds until the DOM element gets replaced with the iframe. This can be useful to avoid repaints while transitioning from states.