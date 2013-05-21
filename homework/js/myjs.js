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
/*попытки сделать выплывающее меню - Все зашибись, кроме FF*/
$(document).ready(function Open(){
     $('.userPanel').click(function() {
         $('.userPanel ul') .toggle('2s');
     });
});
