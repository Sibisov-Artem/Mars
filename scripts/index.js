const root = document.querySelector('.root');
const header = root.querySelector('.header');
const buyTicketHeaderBtn = root.querySelector('.header__buy-btn');
const buyTicketPopup = root.querySelector('.popup');
const formBuyTicket = buyTicketPopup.querySelector('.popup__form');
const inputNumberOfPeople = formBuyTicket.querySelector('.form__input_number-of-people');
const popupCloseBtn = buyTicketPopup.querySelector('.popup__close-btn');
const burgerBtn = header.querySelector('.header__burger-btn');
const burgerBtnCentralLine = burgerBtn.querySelector('.burger-btn__central-line');
const burgerMenu = header.querySelector('.navigation');
const burgerMenuItems = burgerMenu.querySelector('.navigation__menu');
const burgerMenuItem = burgerMenu.querySelectorAll('.navigation__item__link');
const burgerMenuItemArr = Array.from(burgerMenuItem);  // создаем массив от burgerMenuItem

// условие для изменения размера бэкграунда 
// при определенном превышении высоты экрана над шириной.
// По умолчанию задана определенная ширина бэкграунда
// и при снижении ширины по отношению к высоте ниже отношения 1280/965
// начинается вертикальный repeat
if ((window.innerWidth / window.innerHeight) < (1280 / 965)) {
    root.style.backgroundSize = 'cover';
}

// функция открытия попапа покупки билета
function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closePopupEsc); // вешаем слушатель при открытии попапа на его закрытие по Escape
}

// функция закрытия попапа покупки билета
function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closePopupEsc); //удаляем  слушатель событий, из-за не актуальности при закрытом попапе
}

// функция для закрытия попапа по нажатию на Escape
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_active');
        closePopup(popupOpened);
    }
}

// функция открытия бургер меню
function openBurgerMenu() {
    burgerMenu.classList.add('navigation_active');
    burgerBtn.classList.add('burger-btn_active');
    burgerBtnCentralLine.classList.add('burger-btn__central-line_disable');
    document.addEventListener('mouseup', closeBurgerMenuOnClickOutside); // слушатель закрытия бургер меню при нажатии вне меню
    document.addEventListener('keydown', closeBurgerMenuEsc); // вешаем слушатель на закрытие бургер меню по нажатию на Escape
}

// функция закрытия бургер меню
function closeBurgerMenu() {
    burgerMenu.classList.remove('navigation_active');
    burgerBtn.classList.remove('burger-btn_active');
    burgerBtnCentralLine.classList.remove('burger-btn__central-line_disable');
    document.removeEventListener('mouseup', closeBurgerMenuOnClickOutside);
    document.removeEventListener('keydown', closeBurgerMenuEsc);
}

// функция переключения бургер меню
function toggleBurgerMenu() {
    const menuIsActive = burgerMenu.classList.contains('navigation_active');
    if (!menuIsActive) {
        openBurgerMenu();
    } else {
        closeBurgerMenu();
    }
}

// функция закрытия бургер меню при клике вне этого меню
function closeBurgerMenuOnClickOutside(evt) {
    const itsMenu = evt.target === burgerMenu;
    const itsMenuItems = evt.target === burgerMenuItems;
    const itsHamburger = evt.target === burgerBtn;
    // its_menuItem = evt.target.matches('.navigation__item__link');
    const itsMenuItem = burgerMenuItemArr.some(item => {
        return item === evt.target;
    });
    const menuIsActive = burgerMenu.classList.contains('navigation_active');
    if (!itsMenu && !itsMenuItems && !itsHamburger && !itsMenuItem && menuIsActive) {
        closeBurgerMenu();
    }
}

// функция закрытия бургер меню по нажатию на Escape
function closeBurgerMenuEsc(evt) {
    if (evt.key === "Escape") {
        closeBurgerMenu();
    }
}

// слушатель для смещения бэкграунда 
// при пересечении указателем определенных границ ширины экрана
root.addEventListener('mousemove', (e) => {
    let leftLimit = window.innerWidth * 0.35;
    let rightLimit = window.innerWidth * 0.65;
    if (e.clientX < leftLimit) {
        root.style.backgroundPositionX = '-5vw';
    } else if (e.clientX > rightLimit) {
        root.style.backgroundPositionX = '-25vw';
    } else {
        root.style.backgroundPositionX = '-15vw';
    }
});

// слушатель открытия попапа покупки билета
buyTicketHeaderBtn.addEventListener('click', () => {
    openPopup(buyTicketPopup);
});

// слушатель закрытия попапа покупки билета
popupCloseBtn.addEventListener('click', () => {
    closePopup(buyTicketPopup);
});

// слушатель открытия бургер меню 
burgerBtn.addEventListener('click', toggleBurgerMenu);

// слушатель введения в инпут только чисел
formBuyTicket.addEventListener('input', function (evt) {
    let inputValueNumber = evt.target.value.replace(/[^0-9.]/g, '');
    inputNumberOfPeople.value = inputValueNumber;
});

// слушатель дописания слова человек/человека в инпут при его покидании
formBuyTicket.addEventListener('change', function () {
    let inputValueNumber = inputNumberOfPeople.value;
    if (inputValueNumber == 0) { inputNumberOfPeople.value = '' }
    else if (inputValueNumber % 10 === 2 || inputValueNumber % 10 === 3 || inputValueNumber % 10 === 4) {
        inputNumberOfPeople.value = `${inputValueNumber} человека`
    }
    else { inputNumberOfPeople.value = `${inputValueNumber} человек` }
});