'use strict';

const burger = document.querySelector('.header__burger');
const navigation = document.querySelector('.header__nav');
const logo = document.querySelector('.logo');
const loginButton = document.querySelector('.header__login');
const loginModalWindow = document.querySelector('.modal');
const scrollButtons = document.querySelectorAll('.button');
const freeTrialInput = document.querySelector('.free-trial__input');

//бургер меню
burger.addEventListener('click', () => {
    burger.classList.toggle('header__burger--active');
    navigation.classList.toggle('header__nav--active');
    logo.classList.toggle('logo--active');
});

//модальное окно с логином открыть
loginButton.addEventListener('click', () => {
    loginModalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

//модальное окно с логином закрыть по нажатию на пустое пространство
loginModalWindow.addEventListener('click', (event) => {
    if (event.target === loginModalWindow) {
        loginModalWindow.style.display = 'none';
        document.body.style.overflow = '';
    }
}); 

//плавный скролл для кнопок
let V = 1; //скорость прокрутки
scrollButtons.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        let w = window.pageYOffset,
            hash = item.href.replace(/[^#]*(.*)/, '$1');
        let t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
            requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
        freeTrialInput.focus();
    });
});