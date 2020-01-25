(function($) {
    $.fn.PageTransitions = function() {
        var currentCard = $('.card-container--active'),
            nextCard = false,

            isAnimating = false,
            endCurrentCard = false,
            endNextCard = false,
            animEndEventClasses = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },
            // animation end event name
            animEndEventClasses = animEndEventClasses[Modernizr.prefixed('animation')],
            // support css animations
            support = Modernizr.cssanimations;        

        return this;
    };
 
}( jQuery ));