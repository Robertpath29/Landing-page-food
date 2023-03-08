$(window).on("load", function () {

    $(".header-input-button").on({
        click: openCloseSearch
    })


});



function openCloseSearch() {
    $("#search-input").addClass("visibility-input");
    $(document).on("click", function (e) {
        if (e.target.className != "fa-solid fa-magnifying-glass" && e.target.className != "header-input-button" && e.target.id != "search-input") {
            const search = $("#search-input")
            search.removeClass("visibility-input");
            search.val("");
            $(document).off("click");
        }
    })
}