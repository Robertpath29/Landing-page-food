import { scrollTo } from "./nav.js"
$(window).on("load", function () {

    $(".header-input-button").on({
        click: openCloseSearch
    })


});


function openCloseSearch() {
    const search = $("#search-input");
    search.on("input", searchElem)

    if (!search.hasClass("visibility-input")) {
        search.addClass("visibility-input");
        $(document).on("click", function (e) {
            if (e.target.className != "fa-solid fa-magnifying-glass" && e.target.className != "header-input-button" && e.target.id != "search-input") {
                search.removeClass("visibility-input");
                $(".header-input-output").html("").addClass("d-none");
                search.val("");
                search.off("input");
                $(document).off("click");
            }
        });
    }



}

function searchElem() {
    const searchVal = $(this).val();
    const outputDiv = $(".header-input-output");
    outputDiv.html("");
    if (outputDiv.hasClass("d-none"))
        outputDiv.removeClass("d-none");

    if (searchVal) {
        var regex = new RegExp(searchVal, 'gi');
        $("body *").each(function () {
            if ($(this).text().match(regex)) {
                renderOutput($(this), outputDiv);

            }
        });

        if (outputDiv.text() !== "") {

            $(".output-value").each(function () {
                $(this).on("click", moveToResultInput);

            });

        } else {
            outputDiv.html(`<h1>No result</h1>`);

        }

    } else {
        outputDiv.addClass("d-none");
    }


};

function renderOutput(valueElem, outputDiv) {
    const output = outputDiv;
    let positionElem = Math.floor(valueElem.offset().top);
    output.append(`<p class="output-value" data-position="${positionElem}">${valueElem.text()}</p>`);



}

function moveToResultInput(e) {
    let pos = e.target.dataset.position;
    scrollTo(pos);
}


