$(window).on("load", function () {

    $("#subscribe").on("click", validInput);

});


function validInput(e) {
    e.preventDefault();
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const input = $(`[type="email"]`);
    const inputVal = input.val();
    if (pattern.test(inputVal)) {
        postAjax(inputVal);
        animDone();
        $("#subscribe").off("click");
    } else {
        animNoValid(input);
        $(document).on("click", removeBorderRed)
    }
}

function animDone() {
    $(".subscribe-input").addClass("d-none");
    $(".done").removeClass("d-none");
    setTimeout(() => {
        $(".doneCheck").css({
            "left": "155px"
        })

    }, 100);

    setTimeout(() => {
        $(".doneCheck").addClass("d-none");
    }, 1500);
}

function postAjax(inputVal) {
    $.ajax({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        data: { email: inputVal },
        success: function (result) {
            console.log(result);
        }
    });
}

function animNoValid(input) {
    input.css("border", "3px solid red");
    const form = $(".subscribe-input");
    form.animate({ "margin-left": "-=15px" }, 50)
        .animate({ "margin-left": "+=30px" }, 50)
        .animate({ "margin-left": "-=30px" }, 50)
        .animate({ "margin-left": "+=30px" }, 50)
        .animate({ "margin-left": "-=15px" }, 50);
}

function removeBorderRed(e) {
    if (e.target.id != "subscribe") {
        $(`[type="email"]`).css("border", "none");
        $(document).off("click");
    }

}