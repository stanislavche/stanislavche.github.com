var $$ = $$ || {};

$$.initLogin = function(){

    var showLogin = function(){
        $('#b-page-wrapper').addClass('login');
        $('#b-login')
            .fadeIn()
            .find('.login-window').animate({
                height: '209'
            }, 300)
    }

    var hideLogin = function(){
        $('.login-window')
            .animate({
                height: 0
            }, 300,function(){
                $('#b-login').fadeOut();
                $('#b-page-wrapper').removeClass('login');
            })
    }


    $('#login-button').on('click', function(){
        showLogin()
    })

    $('#login-cancel-button').on('click', function(event){
        event.stopPropagation();
        hideLogin();
    })

    $('#b-login').on('click', function(event){
        event.stopPropagation();
        hideLogin();
    })

    $('.login-window').on('click', function(event){
        event.stopPropagation();
    })
}
