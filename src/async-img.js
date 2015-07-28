;var AsyncImg = (function ($) {
    var $window = $(window), self;

    var options = {
        hidden: false,
        offset: {
            x: 0,
            y: 0
        },
        callbacks: {},
        events: {}
    };

    var isWithinBoundingRect = function ($elem) {
        var rect = $elem[0].getBoundingClientRect();
        return rect.top < $window.height() - options.offset.y &&
               rect.bottom > 0 &&
               rect.left < $window.width() - options.offset.x &&
               rect.right > 0;
    }

    var isVisible = function ($elem) {
        return !!($elem[0].offsetWidth * $elem[0].offsetHeight);
    }

    var reloadItems = function () {
        self.items = $(self.selector);
    }

    return {
        init: function (selector, params) {
            self = this;

            $.extend(options, params);
            self.selector = selector;

            for (var i = 0; i < options.events.length; i++) {
                self.bind(options.events[i]);
            }

            self.update();
        },
        update: function (reload) {
            if (true === reload || !self.items) {
                reloadItems();
            }

            self.items.each(function () {
                $elem = $(this);

                if (true === $elem.data('loaded') || !$elem.data('src')) {
                    return true;
                }

                if (isWithinBoundingRect($elem) || (options.hidden && !isVisible($elem))) {
                    $elem.attr('src', $elem.data('src'));
                    $elem.load(function () {
                        $(this).data('loaded', true);

                        if (options.callbacks.load) {
                            options.callbacks.load($elem);
                        }
                    }).error(function () {
                        $(this).data('loaded', true);

                        if (options.callbacks.error) {
                            options.callbacks.error($elem);
                        }
                    });
                }
            });
        },
        bind: function (event) {
            $(event.target).on(event.type, function () {
                self.update(true);
            });
        }
    };
} (jQuery));
