const root = document.querySelector('.root');
const header = root.querySelector('.header');
const buyTicketHeaderBtn = root.querySelector('.header__buy-btn');
const buyTicketPopup = root.querySelector('.popup');
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

// функция открытия/закрытия бургер меню
function openAndCloseBurgerMenu() {
    burgerMenu.classList.toggle('navigation_active');
    burgerBtn.classList.toggle('burger-btn_active');
    burgerBtnCentralLine.classList.toggle('burger-btn__central-line_disable');
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
burgerBtn.addEventListener('click', openAndCloseBurgerMenu);

// Закрытие бургер меню при нажатии вне меню
document.addEventListener('mousedown', (evt) => {
    its_menu = evt.target == burgerMenu;
    its_menuItems = evt.target == burgerMenuItems;
    // its_menuItem = evt.target.matches('.navigation__item__link');
    its_menuItem = burgerMenuItemArr.some(item => {
        return item == evt.target;
    });
    menu_is_active = burgerMenu.classList.contains('navigation_active');

    if (!its_menu && !its_menuItems && !its_menuItem && menu_is_active) {
        openAndCloseBurgerMenu();
    }
});
