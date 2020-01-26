var mobileBreakpoint = 767,
    editorContainer = $('.editor-container');

// Inactive action card positioning on load
$(window).on("load resize", function() {
    // Run only on mobile
    if ($(window).width() < mobileBreakpoint) {
        inactiveActionCardPadding()
        editorContainer.removeAttr("style");
    }
    else {
        // photobookResizer();
        editorContainer.height($(window).height() - $('.navbar').outerHeight());
    }
});

// Card action manager
$(document).ready(function() {
    // Run only on mobile
    if ($(window).width() < mobileBreakpoint) {
        $("a.card--action").cardTransitions();
    }
    $(".book--action").photobookTransitions();
});