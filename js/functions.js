// Inactive action card positioning on load
$(window).on("load resize", function() {
    inactiveActionCardPadding()
});

// Card action manager
$(document).ready(function() {
    $(".book--action").photobookTransitions();
    $("a.card--action").cardTransitions();
});