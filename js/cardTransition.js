/// Card (page) transition manager
(function($) {
    $.fn.PageTransitions = function() {
        var currentCard = $('.card-container--active'),
            nextCard = false,

            isAnimating = false,
			animEndEventNames = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },
            inClasses = 'card-container--active card-container--focus',
            outClasses = 'card-container--inactive card-container--blur',

            // animation end event name
			animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],
            // support css animations
            support = Modernizr.cssanimations;        
        
        this.on('click', function(end) {
            var options = $(this);
            options.$nc = $(this).attr('href')

            nextCardSwitch(options);
        })
        
        function nextCardSwitch(options) {
            nextCard = $(options.$nc);

            currentCard.addClass(outClasses)
                        .removeClass(inClasses)
                        .on(animEndEventName, function() {
                            currentCard.off(animEndEventName);
                        })

            nextCard.addClass(inClasses)
                    .removeClass(outClasses)
                    .css({
                            'max-height': $(window).height(),
                            'top': '0',
                        })
                    .on(animEndEventName, function() {
				        nextCard.off(animEndEventName);
                    })
        }

        return this;
    };
 
}(jQuery));

/// Setting action card positions on mobile screens
function inactiveActionCardPadding() {
    var checkoutContainer = $('#card-container--checkout'),
        momentsContainer = $('#card-container--moments'),
        cardWrapper = $('.card-wrapper'),
        cardActionTrigger = $('.card--action'),
        inactiveContainerClass = 'card-container--inactive',

        documentHeight = $(document).height(),
        viewportHeight = $(window).height();

    // console.log('document: ' + documentHeight + '| window: ' + viewportHeight);

    function setupActionPosition(target) {
        var targetAction = $(target).children(cardActionTrigger),
        actionHeight = 0;
        
        if($(target).hasClass(inactiveContainerClass)) {
            actionHeight = targetAction.outerHeight();
            containerHeight = target.height();

            $(target).css({
                'top': (documentHeight - actionHeight),
                'max-height': (viewportHeight) - (viewportHeight - actionHeight),
            });
        }
        else(console.log('false'));
    }

    setupActionPosition(checkoutContainer);
    setupActionPosition(momentsContainer);
}


$(document).ready(function() {
    $("a.card--action").PageTransitions();
});

$(window).on("load", inactiveActionCardPadding());