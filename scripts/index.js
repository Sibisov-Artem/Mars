const root = document.querySelector('.root');
const buyTicketHeaderBtn = root.querySelector('.header__buy-btn');
const BuyTicketPopup = root.querySelector('.popup');
const popupCloseBtn = BuyTicketPopup.querySelector('.popup__close-btn');

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
    document.removeEventListener('keydown', closePopupEsc) //удаляем  слушатель событий, из-за не актуальности при закрытом попапе
}

// функция для закрытия попапа по нажатию на Escape
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_active');
        closePopup(popupOpened);
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

//слушатель открытия попапа покупки билета
buyTicketHeaderBtn.addEventListener('click', () => {
    openPopup(BuyTicketPopup);
});

//слушатель закрытия попапа покупки билета
popupCloseBtn.addEventListener('click', () => {
    closePopup(BuyTicketPopup);
})