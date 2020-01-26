/// Card (page) transition manager
(function($) {
    $.fn.PageTransitions = function() {
        var currentCard = false,
            nextCard = false,
            dataBlur = false,

            isAnimating = false,
			animEndEventNames = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },
            inClasses = 'card-container--active card-container--focus',
            outClasses = 'card-container--inactive',
            blurClass = 'card-container--blur',

            // animation end event name
			animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],
            // support css animations
            support = Modernizr.cssanimations;        
        
        this.on('click', function(end) {
            var options = $(this);

            options.$nc = $(this).attr('href');
            options.$cc = $(this);
            options.$blurNc = $(this).data('blur');
            options.$blurCc = $(options.$nc).hasClass(blurClass);

            nextCardSwitch(options);
        })
        
        function init() {
            currentCard = $('.card-container--active');
            dataBlur = false;
        };

        function nextCardSwitch(options) {
            init();
            nextCard = $(options.$nc);
            inClassesMod = inClasses;

            // Blur class injection for current card
            if(options.$blurNc == true) {
                outClassesMod  = outClasses + " " + blurClass;
            }
            else {
                outClassesMod = outClasses;
            }

            currentCard.addClass(outClassesMod)
                        .removeClass(inClassesMod)
                        .on(animEndEventName, function() {
                            currentCard.off(animEndEventName);
                        })


            // Blur class injection for next card
            if(options.$blurCc == true) {
                outClassesMod = outClasses + " " + blurClass;
            }
            else {
                outClassesMod = outClasses;
            }

            nextCard.addClass(inClassesMod)
                    .removeClass(outClassesMod)
                    // .css({'max-height': $(window).height(), 'top': '0'})
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