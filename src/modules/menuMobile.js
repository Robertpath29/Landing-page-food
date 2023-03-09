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
            $(document).off("click");

        }
    })

});

function openCloseMenuMobile() {
    const menuBtn = $(".button-nav");
    const nav = $(".header-nav");
    menuBtn.on("click", function () {
        nav.animate({
            height: "20rem"
        }, 10)
    });

    $(document).on("click", function () {
        if (nav.height() > 0) {
            nav.animate({
                height: "0px"
            }, 10);
        }
    })
}