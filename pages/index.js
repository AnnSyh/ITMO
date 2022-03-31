"use strict";

// import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";

// import "../pages/index.css";

const curentPopupConfirmation = document.querySelector(".confirmation__popup");
const menuBtn = document.querySelector(".hamburger");
const subMenu = document.querySelector(".sub-menu");
const subMenus = document.querySelectorAll(".sub-menu");

subMenus.forEach(element => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();                // запрещаем переход по ссылке
    const sub = evt.target.parentElement.querySelector('.sub') // ищем li именно этой ссылки
    // debugger
    sub.classList.toggle("active");
  });
});


// -------------------- задаем попап------------------------
// 1) попап с предупреждением
const popupConfirmation = new Popup(
  curentPopupConfirmation,
  openConfirm,
  closeConfirm
); // <==  создаем эл-т класса Popup
popupConfirmation.setEventListeners(); //установка поведения при клике на X и на overlay
function openConfirm(evt) {
  popupConfirmation.openPopup(); // <==  открываем попап ==
}
function closeConfirm(evt) {
  popupConfirmation.closePopup(); // <==  закрываем попап ==
}

// -------------------- /попап------------------------

//подтверждение удаления
function handleConfirmDelete() {
  popupConfirmation.openPopup(); //открываем окно подтверждения
    console.log('handleConfirmDelete!!!!');
    
}
function handelMenu() {
    console.log('handelMenu!!!!');
    
}

//вешаем событие на кнопки(открывющие попапы с формами)
menuBtn.addEventListener("click", handleConfirmDelete);

// menuBtn.addEventListener("click", handelMenu);
