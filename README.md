# Async Image Loader
Asynchronous and lazy image loading library

### Demo

[http://mladenilic.github.io/async-img/](http://mladenilic.github.io/async-img/)

### Options

```JavaScript
 new AsyncImageLoader(<selector>, <options>);
```

* `selector` - any valid jQuery selector
* `options`
    * `binds` - array of events on which images will be loaded
        * `type` - jQuery event type
        * `target` - any valid jQuery selector
        * `delay` - number of miliseconds event wil be delayed (dafault: `0`)
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

### Methods

```JavaScript
<script>
    var loader = new AsyncImageLoader('.example');

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
