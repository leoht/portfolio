
(function ($) {

    setTimeout(function () {
        $('.intro h1').fadeIn(700);
    }, 600);

    setTimeout(function () {
        $('.show-menu').fadeIn(700);
    }, 900);
    

    $('.page.skills').waypoint(function () {
        $('.backtop').fadeIn(500);
    });

    $('.backtop a').click(function (e) {
        e.preventDefault();
        $(document).scrollTo($('.intro'), 1200, { easing: 'easeInOutCirc' });
    });


    $('.show-menu, nav').mouseover(function () {
        $('nav').show(0);
    });

    $('.show-menu, nav').mouseout(function () {
        $('nav').hide(0);
    });

    $('nav a').click(function (e) {
        e.preventDefault();
        $link = $(this);
        $(document).scrollTo($($link.attr('href')), 1000, { easing: 'easeInOutCirc' });
    });



    // $('.whiteblock').click(function () {
    //     $(this).animate({
    //         width: $('.page h2').width()-30
    //     }, 1000);

    //     $(this).parent().parent().animate({
    //         height: '+=50px'
    //     }, 1000);
    // })
       


    $('.contact-form').submit( function (e) {

        e.preventDefault();

        $form = $('form', this);
        $overlay = $('.form-overlay');

        $overlay
            .css('width', $form.width())
            .fadeIn(400);


        $.ajax({
            type: 'POST',
            url: 'send.php',
            dataType: 'json',
            data: $form.serialize(),
            success: function (data) {

                console.log(data);

                if ( data.error ) {
                    if (data.error == 'blank') {
                        $('p', $overlay).text('You must fill-in all the fields');
                    } else if (data.error == 'email') {
                        $('p', $overlay).text('You must enter a valid e-mail address');
                    } else {
                        $('p', $overlay).text('Sorry, something went wrong :(');
                    }

                    $('p', $overlay).css('color', '#c0392b');
                    
                } else {
                    $('p', $overlay).text('Thank you !');
                    $('p', $overlay).css('color', '#1abc9c');
                    $('input[type=text], textarea', $form).val('');
                }

                setTimeout(function () { $overlay.fadeOut(400); }, 2000);
                
            }
        })
    });

})(jQuery);