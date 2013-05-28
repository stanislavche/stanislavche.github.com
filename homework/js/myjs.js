/*открытие, закрытие окна входа*/
function hiddenLayer() {
    document.getElementById("openning").style.visibility = "hidden";
    document.getElementsByClassName('blur')[0].setAttribute('style', '-webkit-filter: none;');
    return false;

}
function showLayer() {
    document.getElementById("openning").style.visibility = "visible";
    document.getElementsByClassName('blur')[0].setAttribute('style', '-webkit-filter: blur(2px);');
    return false;
}
/*мягкое исчезновение*/
$(document).ready(function(){
    $("#head").show();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() < 140) {
                $('#head').fadeIn();
            } else {
                $('#head').fadeOut();
            }
        });
    });
});
/*попытки сделать выплывающее меню*/
$(document).ready(function Open(){
     $('.userPanel').on('click', function() {
         $('.userPanel ul') .toggle('2s');
     });
});
/*комментарии*/
$(document).ready(function () {
    $("#open1").click(function() {
        var formContent = $("#commentwindow").html();
        $(".post0001 .empty").html(formContent);
        $(".post0003 .empty1").html("");
        $(".post0004 .empty").html("");
        $(".post0002 .empty").html("");
    });
});
$(document).ready(function () {
    $("#open2").click(function() {
        var formContent = $("#commentwindow").html();
        $(".post0002 .empty").html(formContent);
        $(".post0003 .empty1").html("");
        $(".post0004 .empty").html("");
        $(".post0001 .empty").html("");
    });
});
$(document).ready(function () {
    $("#open3").click(function() {
        var formContent = $("#commentwindow").html();
        $(".post0003 .empty1").html(formContent);
        $(".post0004 .empty").html("");
        $(".post0002 .empty").html("");
        $(".post0001 .empty").html("");
    });
});
$(document).ready(function () {
    $("#open4").click(function() {
        var formContent = $("#commentwindow").html();
        $(".post0004 .empty").html(formContent);
        $(".post0003 .empty1").html("");
        $(".post0002 .empty").html("");
        $(".post0001 .empty").html("");
    });
});
/*Всплывающее окно*/

/*validation*/
function Validate(id) {
    if ('.name'.val() == "") {
        id.addClass(".error");
        return false;
    } else {
        id.removeClass(".error");
        return true;
    }
}