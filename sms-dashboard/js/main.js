const burger = document.querySelector('.header__burger');
const navigation = document.querySelector('.header__nav');
const logo = document.querySelector('.logo');

burger.addEventListener('click', () => {
    burger.classList.toggle('header__burger--active');
    navigation.classList.toggle('header__nav--active');
    logo.classList.toggle('logo--active');
});