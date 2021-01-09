$(function() {

    window.addEventListener('scroll', function() {
        let e = document.querySelector('.header__top');
        if (pageYOffset > 100) {
            e.classList.add("header__top--blackout");
        } else {
            e.classList.remove("header__top--blackout");
        }
    });

    $(".menu a, .header__logo, .header__icon").on("click", function(event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        let id = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: top }, 1500);
    });

    $('.slider').slick({
        arrows: false,
        dots: true
    });

    $('.header__burger, .menu a').on('click', function() {
        $('.header__burger').toggleClass('header__burger--active');
        $('.menu__list').toggleClass('menu__list--active');
    });

    let mixer = mixitup('.gallery__content');
});