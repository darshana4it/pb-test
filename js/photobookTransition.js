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
                        if (currentPage % 2 === 0) {
                            photobookId.children($cpClass).addClass(pageTurnClass)
                            (photobookId.hasClass(leftFocusClass)) ? photobookId.removeClass(leftFocusClass) : 0;
                        }
                        else {
                            photobookId.children($cpClass).addClass(pageTurnClass);
                            photobookId.addClass(leftFocusClass);
                        }

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
        
        return this;
    };
 
}(jQuery));

// Resizing photobook based on screen height - to be improved
function photobookResizer() {
    var pageWidth, pageHeight;

    var basePage = {
        height: 320,
        width: 500,
        scale: 1,
        scaleX: 1,
        scaleY: 1
    };

    $(function(){
        var $page = $('.photobook-container');
        
        getPageSize();
        scalePages($page, pageWidth, pageHeight);
        
        //using underscore to delay resize method till finished resizing window
        $(window).resize(_.debounce(function () {
            getPageSize();            
            scalePages($page, pageWidth, pageHeight);
        }, 150));
        

        function getPageSize() {
            pageHeight = $(window).width() - $('.toolbox-panel').outerWidth();
            pageWidth = $(window).height() - $('.navbar').outerHeight();
        }

        function scalePages(page, maxWidth, maxHeight) {            
            var scaleX = 1, scaleY = 1;                      
            scaleX = maxWidth / basePage.width;
            scaleY = maxHeight / basePage.height;
            basePage.scaleX = scaleX;
            basePage.scaleY = scaleY;
            basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;

            var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth)/2));
            var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight)/2));

            // page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;');
            page.attr('style', '-webkit-transform:scale(' + basePage.scale + ');');
        }
    });

    console.log(basePage.height);
}