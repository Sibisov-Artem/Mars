const root = document.querySelector('.root');
const header = root.querySelector('.header');
const buyTicketHeaderBtn = root.querySelector('.header__buy-btn');
const buyTicketPopup = root.querySelector('.popup');
const buyTicketTitle = buyTicketPopup.querySelector('.popup__title');
const formBuyTicket = buyTicketPopup.querySelector('.popup__form');
const inputCheckInDate = formBuyTicket.querySelector('.form__input_check-in-date');
const inputCheckOutDate = formBuyTicket.querySelector('.form__input_check-out-date');
const inputNumberOfPeople = formBuyTicket.querySelector('.form__input_number-of-people');
const buyTicketBtn = buyTicketPopup.querySelector('.form__buy-btn');
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

//функция отключения сабмита в форме покупки билета
function disabledSubmitBtn() {
    buyTicketBtn.classList.add('form__buy-btn_disabled');
    buyTicketBtn.classList.remove('btn-hover');
    buyTicketBtn.setAttribute('disabled', 'true');
}

//функция активации сабмита в форме покупки билета
function enabledSubmitBtn() {
    buyTicketBtn.classList.remove('form__buy-btn_disabled');
    buyTicketBtn.classList.add('btn-hover');
    buyTicketBtn.removeAttribute('disabled');
}

// функция валидации инпутов заезда и выезда (InDate и OutDate)
function checkInOutDatesValidation(checkInDate, checkOutDate) {

    if (checkInDate && checkOutDate) {
        enabledSubmitBtn();
        // для короректного сравнения дат в формате dd.mm.yyyy
        // преобразуем их в формат yyyy.mm.dd
        function converterOfDate(date) {
            var parts = date.split(".");
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        let inDate = converterOfDate(checkInDate);
        let outDate = converterOfDate(checkOutDate);

        // если дата выезда меньше даты заезда - обменяем их значения
        if (outDate < inDate) {
            inputCheckInDate.value = checkOutDate;
            inputCheckOutDate.value = checkInDate;
        }

        // проверяем что дата выезда больше чем через 365 дней от даты заезда
        if (+outDate <= +inDate + 365 * 24 * 60 * 60 * 1000) {
            buyTicketTitle.textContent = 'Выезжаем не ранее чем через год';
            buyTicketTitle.classList.add('popup__title_message');
            disabledSubmitBtn();
        } else {
            buyTicketTitle.innerHTML = 'Бронирование<br>билетов';
            buyTicketTitle.classList.remove('popup__title_message');
            enabledSubmitBtn();
        };
    } else {
        disabledSubmitBtn();
    }
}

// функция покупки билета
function buyTicket(evt) {
    evt.preventDefault();
    buyTicketTitle.classList.add('popup__title_disable-opacity');

    setTimeout(() => {
        buyTicketTitle.textContent = 'Поздравляем с покупкой!';
        buyTicketTitle.classList.remove('popup__title_disable-opacity');
        buyTicketTitle.classList.add('popup__title_message');
    }, 1000);
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
inputNumberOfPeople.addEventListener('input', function (evt) {
    let inputValueNumber = evt.target.value.replace(/[^0-9.]/g, '');
    inputNumberOfPeople.value = inputValueNumber;
    if (inputValueNumber == 0) {
        disabledSubmitBtn();
    } else {
        enabledSubmitBtn();
    }
});

// слушатель дописания слова человек/человека в инпут при его покидании
inputNumberOfPeople.addEventListener('change', function () {
    let inputValueNumber = inputNumberOfPeople.value;
    if (inputValueNumber == 0) {
        inputNumberOfPeople.value = '';
    } else if (inputValueNumber >= 12 && inputValueNumber <= 14) {
        inputNumberOfPeople.value = `${inputValueNumber} человек`
    } else if (inputValueNumber % 10 === 2 || inputValueNumber % 10 === 3 || inputValueNumber % 10 === 4) {
        inputNumberOfPeople.value = `${inputValueNumber} человека`
    } else { inputNumberOfPeople.value = `${inputValueNumber} человек` }
});

// слушатель инпута заезда
inputCheckInDate.addEventListener('change', function (evt) {
    checkInOutDatesValidation(evt.target.value, inputCheckOutDate.value);
});

// слушатель инпута выезда
inputCheckOutDate.addEventListener('change', function (evt) {
    checkInOutDatesValidation(inputCheckInDate.value, evt.target.value);
});

// слушатель сабмита формы покупки билета
formBuyTicket.addEventListener('submit', buyTicket);