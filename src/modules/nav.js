$(window).on("load", function () {

    $(".header-nav").on("click", scroll)
    $(window).on("scroll", visibilityBtnUp);
    $(".navigation-up").on("click", scrollUp);
    visibilityBtnUp();

});

function scroll(e) {

    scrollTo(getOffsetElem(e));
}



function visibilityBtnUp() {
    const btnUp = $(".navigation-up");

    if (window.scrollY > 500) {
        btnUp.removeClass("d-none");

    } else {
        btnUp.addClass("d-none");
    }
}

function getOffsetElem(event) {

    let elemOffset = undefined;

    switch (event.target.id) {
        case "Product":
            return elemOffset = Math.floor($(".best-seller").offset().top);

        case "Promo":
            return elemOffset = Math.floor($(".lenora-fields").offset().top);

        case "About":
            return elemOffset = Math.floor($(".subscribe").offset().top);

        case "Contact":
            return elemOffset = Math.floor($(".footer").offset().top);

        default:
            break;

    }

}

export function scrollTo(positionElem) {
    $('html, body').animate({
        scrollTop: positionElem
    }, 1000);
}

function scrollUp() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);

}