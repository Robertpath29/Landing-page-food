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
            if (e.target.className != "fa-solid fa-magnifying-glass" && e.target.className != "header-input-button" && e.target.id != "search-input" && e.target.className != "output-value") {
                search.removeClass("visibility-input");
                $(".header-input-output").html("").addClass("d-none");
                search.val("");
                search.off("input");
                $("h1,h2,a").removeClass("active");
                $(document).off("click");
            }

        });
    }



}

function searchElem() {
    let arrayOutputElem = [];
    let arrayIndex = 0;
    const searchVal = $(this).val();
    const outputDiv = $(".header-input-output");
    outputDiv.html("");
    $("h1,h2,a").removeClass("active");

    if (outputDiv.hasClass("d-none"))
        outputDiv.removeClass("d-none");

    if (searchVal) {
        var regex = new RegExp(searchVal, 'gi');

        $("h1,h2,a").each(function () {
            if ($(this).text().match(regex)) {
                renderOutput($(this), outputDiv, arrayIndex);
                arrayOutputElem.push($(this));
                arrayIndex++;
            }
        });

        if (outputDiv.text() !== "") {

            $(".output-value").each(function () {
                $(this).on("click", function (event) {
                    moveToResultInput(event, arrayOutputElem)
                });

            });

        } else {
            outputDiv.html(`<h1>No result</h1>`);

        }

    } else {
        outputDiv.addClass("d-none");
    }


};

function renderOutput(valueElem, outputDiv, arrayIndex) {
    const output = outputDiv;
    let positionElem = Math.floor(valueElem.offset().top);
    output.append(`<p class="output-value" data-position="${positionElem}" data-index="${arrayIndex}">${valueElem.text()}</p>`);




}

function moveToResultInput(e, arrayOutputElem) {
    let pos = e.target.dataset.position;
    let elem = $(arrayOutputElem[e.target.dataset.index]);
    elem.addClass("active");
    scrollTo(pos);
}


