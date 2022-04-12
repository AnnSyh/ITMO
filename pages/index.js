
"use strict";

// import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import projectsCards from "../utils/projectsCards.js";
import ProjectsSlider from "./ProjectsSlider.js";

const curentPopupConfirmation = document.querySelector(".confirmation__popup");
const curentPopupIndustrialLab = document.querySelector(".industrialLab__popup");
const menuBtn = document.querySelector(".hamburger");
// const labPopup = document.querySelector(".lab-popup");
const labPopups = document.querySelectorAll(".lab-popup");

const dropdownLi = document.querySelectorAll(".dropdown");

dropdownLi.forEach(element => {
    element.addEventListener('click', (evt) => {
      const dropdownContentParent = evt.target.parentElement // ищем li именно этой ссылки
      dropdownContentParent.classList.toggle("active");
    });
  });

// -------------------- задаем попап------------------------
// 1) попап с мобильным меню
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

// 2) попап с мобильным меню
const popupIndustrialLab = new Popup(
  curentPopupIndustrialLab,
  openIndustrialLab,
  closeIndustrialLab
); 
popupIndustrialLab.setEventListeners(); 
function openIndustrialLab(evt) {
  popupIndustrialLab.openPopup(); 
}
function closeIndustrialLab(evt) {
  popupIndustrialLab.closePopup();
}

// -------------------- /попап------------------------

//подтверждение удаления
function handleConfirmDelete() {
  popupConfirmation.openPopup(); //открываем окно подтверждения
}
function handleIndustrialLabDelete() {
  popupIndustrialLab.openPopup();
}

//вешаем событие на кнопки(открывющие попапы)
menuBtn.addEventListener("click", handleConfirmDelete);
// labPopup.addEventListener("click", handleIndustrialLabDelete);

labPopups.forEach((element) => {
  element.addEventListener("click", handleIndustrialLabDelete);
});

const projectSlider = new ProjectsSlider(projectsCards);
projectSlider.setEventListenersToProjectButtons();
projectSlider.displayCards(projectsCards);
projectSlider.setEventListenersToWindowAndDocument();
projectSlider.setEventListenersToSelectProjectButtons();

