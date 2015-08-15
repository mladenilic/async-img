# Async Img
Asynchronous and lazy image loading library

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
### Demo

[http://mladenilic.github.io/async-img/](http://mladenilic.github.io/async-img/)

### Initializing Asynchronous Loader

```JavaScript
AsyncImage.new(<selector>, <options>);
```

* `selector` - image elements which will be asynchronous laoded (valid jQuery selector)
* `options`
    * `binds` - array of events on which images will be loaded
        * `type` - string (`click`, `mouseover`)
        * `target` - event target (valid jQuery selector)
        * `delay` - number of miliseconds event will be delayed (dafault: `0`)
        * `throttle` - fire maximum of one event per x miliseconds (dafault: `300`)
    * `conditions` - object specifying conditions under which images will be loaded
        * `visible` - load image only if element is not hidden (default: `false`)
        * `within_bounds` - load image only if element is within viewport (default: `false`)
        * `custom` - callback with user defined function that returns boolean value
    * `callbacks` - object with user defined callbacks
        * `load` - called on image load
        * `error` - called when loading image fails
    * `offset` - adds offsets when calculating if image element is in viewport
        * `x` - horizontal offset (dafault: `0`)
        * `y` - verticaloffset (dafault: `0`)
    * `throttle` - default throttle value for all events (default: `300`)
    * `event_namespace` - namespace used to register events (default: `'.async-img'`)

### Initializing Lazy Loader

```JavaScript
AsyncImage.lazy(<selector>);
```

* `selector` - image elements which will be lazy laoded (valid jQuery selector)

### Methods

```JavaScript
<script>
    var loader = AsyncImage.new('.example');

    // Bind additional events to triget image loadin
    loader.bind({target: '.button', type: 'click', delay: 250});

    // Manually trigger image loading
    loader.update();

    // Dynamically register callbacks
    loader.onLoad(function () {
      console.log($(this).attr('src'), 'Loaded');
    });

    loader.onError(function () {
      console.log($(this).attr('src'), 'could not be loaded');
    });
</script>
```
### Licence
Licensed under the MIT license.
