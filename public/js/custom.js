(function($){
    $(document).ready(function(){
        $('.sidebar-toggle-icon').click(function(){
            $('.main-menu').toggleClass('leftt');
            $('.middle-line').toggleClass('middle-bars');          
            $('.toggle-item li a span').toggle();
            $('.s-menu').toggleClass('tg-menu');
            $('.work-box').toggleClass('ps-90');
            $('.contact').toggleClass('ps-90');
            $('.xpp').toggle();
        });

        // dropdown menu toggle
        $('.consultar').click(function(){
            $('#consultar').slideToggle();
        });
        $('.transferir').click(function(){
            $('#transferir').slideToggle();
        });
        $('.pagar').click(function(){
            $('#pagar').slideToggle();
        });
        $('.pay').click(function(){
            $('#pay').slideToggle();
        });
        $('.configurar').click(function(){
            $('#configurar').slideToggle();
        });

        // sticky menu
        $(window).scroll(function(){
            var wh = $(this).scrollTop();
            
            if(wh){
              $('.menu-area').addClass('menu-sticky');
            }else{
              $('.menu-area').removeClass('menu-sticky');
            }
        });

        // Active menu
        $('.toggle-item').on('click', 'li .ipp', function(){
            $('.toggle-item li .active').removeClass('active');
            $(this).addClass('active');
        });
        // logo-menu 
        $('.menu-logo ul').on('click', 'li .mnu', function(){
            $('.menu-logo li .active').removeClass('active');
            $(this).addClass('active');
        });

        


    });
})(jQuery)