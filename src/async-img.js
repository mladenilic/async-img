var AsyncImageLoader = function (selector, params) {
    'use strict';

    var $window = $(window),
        self = this;

    var options = {
        offset: {
            x: 0,
            y: 0
        },
        callbacks: {},
        bind: {},
        conditions: {
            visible: false,
            within_bounds: false
        }
    };

    var initialize = function () {
        var i;
        $.extend(options, params);
        self.selector = selector;
        for (i = 0; i < options.bind.length; i++) {
            self.bind(options.bind[i]);
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
        return !!($elem[0].offsetWidth * $elem[0].offsetHeight);
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

            $elem.attr('src', $elem.data('src'));
            $elem.load(function () {
                $(this).removeData('src').removeAttr('data-src');

                if (options.callbacks.load) {
                    options.callbacks.load($elem);
                }
            }).error(function () {
                $(this).removeData('src').removeAttr('data-src');

                if (options.callbacks.error) {
                    options.callbacks.error($elem);
                }
            });
        });
    };

    this.bind = function (event) {
        $(event.target).on(event.type, function () {
            setTimeout(self.update, event.delay || 0);
        });
    };

    initialize();
};
