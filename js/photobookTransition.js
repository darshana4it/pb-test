/// Custom photobook transition manager
(function($) {
    $.fn.photobookTransitions = function(action) {
        var currentState = false,
            currentPage = false,
            nextPage = false,
            focusedSide = false,

            photobookId = false,
            bookOpen = false,
            numPages = false,
            
            photobookClass = '.book',
            pageClass = '.page',
            frontCoverClass = '.front-cover',
            bookOpenClass = 'book--cover-open',
            pageTurnClass = 'page--turned',
            leftFocusClass = 'book--focus-left-page',

            inClasses = '',
            outClasses = '',

            isAnimating = false,
			animEndEventNames = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },

            // animation end event name
			animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],
            // support css animations - to be implemented
            support = Modernizr.cssanimations;        
        
        this.on('click', function(e) {
            var options = $(this);
            options.$pbName = $(this).parents(photobookClass);

            init(options);
            turn();
        })
        
        function init(options) {
            // Setting photobook
            (options.$pbName) ? photobookId = options.$pbName : console.log("Photobook couldn't identified");

            // Detecting focused side
            ($(photobookId).hasClass(leftFocusClass)) ? focusedSide = 'left' : focusedSide = 'right';

            // Number of pages
            (options.$pbName) ? numPages = $(photobookId).children(pageClass).length : numPages = false ;

            (options.$currentPage) ? currentPage = $(options).$pbName.data('page') : currentPage = 1;
        }

        // Cover/ page turn
        function turn() {
            if (photobookId.hasClass(bookOpenClass)) {
                bookOpen = true;

                if((bookOpen)) {
                    // photobookId.removeClass(leftFocusClass);
                    if(currentPage < numPages) {
                        $cpClass = pageClass + currentPage;
                        photobookId.children($cpClass).addClass(pageTurnClass);
                        currentPage++;
                    }
                }
                else {

                }
            }
            else {
                photobookId.addClass(bookOpenClass);
                bookOpen = true;
            }
        }
        init();
        
        return this;
    };
 
}(jQuery));

// Resizing photobook based on screen height - to be improved
function photobookResizer() {
    
}

$(window).on("load", photobookResizer(

));

$(document).ready(function() {
    $(".book--action").photobookTransitions();
});