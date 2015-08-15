var AsyncImage = (function (window, $) {
    'use strict';

    var Loader = function (selector, params) {
        var $window = $(window),
            self = this;

        var options = {
            offset: {
                x: 0,
                y: 0
            },
            callbacks: {},
            binds: {},
            conditions: {
                visible: false,
                within_bounds: false
            },
            throttle: 300,
            event_namespace: '.async-image'
        };

        var initialize = function () {
            var i;
            $.extend(options, params);
            self.selector = selector;
            for (i = 0; i < options.binds.length; i++) {
                self.bind(options.binds[i]);
            }
        };

        var isWithinBoundingRect = function ($elem) {
            var rect = $elem[0].getBoundingClientRect();
            return rect.top < $window.height() - options.offset.y &&
                   rect.bottom > 0 &&
                   rect.left < $window.width() - options.offset.x &&
                   rect.right > 0;
        };

        var isVisible = function ($elem) {
            return 0 !== $elem[0].offsetWidth * $elem[0].offsetHeight;
        };

        var throttle = function (call, threshhold) {
            var can = true;
            return function () {
                if (can) {
                    can = false;
                    call.apply(this, arguments);

                    setTimeout(function () {
                        can = true;
                    }, threshhold || options.throttle);
                }
            };
        };

        this.update = function () {
            $(self.selector).each(function () {
                var $elem = $(this);

                if (!$elem.data('src')) {
                    return true;
                }

                if (true === options.conditions.within_bounds && !isWithinBoundingRect($elem)) {
                    return true;
                }

                if (true === options.conditions.visible && !isVisible($elem)) {
                    return true;
                }

                if (options.conditions.custom && !options.conditions.custom.call(this)) {
                    return true;
                }

                $elem.attr('src', $elem.data('src'));
                $elem.off(options.event_namespace);

                $elem.load(function () {
                    $(this).removeData('src').removeAttr('data-src');

                    if (options.callbacks.load) {
                        options.callbacks.load.call(this);
                    }
                }).error(function () {
                    $(this).removeData('src').removeAttr('data-src');

                    if (options.callbacks.error) {
                        options.callbacks.error.call(this);
                    }
                });
            });
        };

        this.bind = function (event) {
            $(event.target).on(event.type + options.event_namespace, throttle(function () {
                setTimeout(self.update, event.delay || 0);
            }), event.throttle);
        };

        this.onLoad = function (callback) {
            options.callbacks.load = callback;
        };

        this.onError = function (callback) {
            options.callbacks.error = callback;
        };

        initialize();
    };

    return {
        new: function (selector, params) {
            return new Loader(selector, params);
        },
        lazy: function (selector, xOffset, yOffset, delay, throttle) {
            return new Loader(selector, {
                binds: [ { target: window, type: 'scroll', delay: delay || 0, throttle: throttle } ],
                conditions: { within_bounds: true },
                offset: { x: xOffset || 0, y: yOffset || 0 }
            });
        }
    };
}(window, jQuery));
