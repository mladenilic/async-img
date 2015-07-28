;var AsyncImageLoader = function (selector, params) {
    var $window = $(window),
        self = this;

    var options = {
        hidden: false,
        offset: {
            x: 0,
            y: 0
        },
        callbacks: {},
        events: {}
    };

    var initialize = function () {
        $.extend(options, params);
        self.selector = selector;
        for (var i = 0; i < options.events.length; i++) {
            self.bind(options.events[i]);
        }

        self.update();
    }

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

    this.update = function () {
        $(self.selector).each(function () {
            $elem = $(this);

            if (!$elem.data('src')) {
                return true;
            }

            if (isWithinBoundingRect($elem) || (options.hidden && !isVisible($elem))) {
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
            }
        });
    }

    this.bind = function (event) {
        $(event.target).on(event.type, function () {
            self.update();
        });
    }

    initialize();
}
