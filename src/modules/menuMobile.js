$(window).on("load", function () {
    let resize = true;

    if (window.outerWidth < 1038) {
        openCloseMenuMobile();
        resize = false;
    };

    $(window).on("resize", function () {
        if (window.outerWidth < 1038 && resize) {
            openCloseMenuMobile();
            resize = false;
        } else if (window.outerWidth > 1038) {
            $(".header-nav").css("height", "");
            $("body").off("click");
            resize = true;

        }
    })

});

function openCloseMenuMobile() {
    const menuBtn = $(".button-nav");
    const nav = $(".header-nav");
    menuBtn.on("click", function () {
        nav.css("height", "20rem");
    });
    eventDocumentClick(nav)

}

function eventDocumentClick(nav) {
    $("body").on("click", function () {
        if (nav.height() > 0) {
            nav.css("height", "0rem");
        }
    })
}