import projectsCards from "../utils/projectsCards.js";

const containerForCards = document.querySelector('.projects__cards');

const cardTemplate = document.querySelector('.projects__template').content.querySelector('.projects__card');

const currentPageElement = document.querySelector('.projects__text-accent');

const leftArrowButton = document.getElementById('projects__arrow-button_left');
const rightArrowButton = document.getElementById('projects__arrow-button_right');
const totalNumberOfPagesElement = document.getElementById('projects__total-number-of-pages');

const allProjectsButton = document.getElementById('projects-all');
const governmentProjectsButton = document.getElementById('projects-gos');
const specialProjectsButton = document.getElementById('projects-special');
const currentProjectsButton = document.getElementById('projects-current');

let currentPageNumber = 1;

const numberOfCardsPerPage = 8;

const arrayOfGovernmentProjects = projectsCards.filter(function (card) {
        if (card.type === 'гос. проект') {
            return card;
        }
});

const arrayOfSpecialProjects = projectsCards.filter(function (card) {
    if (card.type === 'спец. проект') {
        return card;
    }
});

const arrayOfCurrentProjects = projectsCards.filter(function (card) {
    if (card.type === 'в разработке') {
        return card;
    }
});

function makeProjectButtonInactive(button) {
    const buttonContainer = button.closest('.projects__item');

    button.classList.remove('projects__subtitle_active');
    buttonContainer.classList.remove('projects__item_active');
}

function makeAllProjectButtonsInactive(arrayOfButtons) {
    arrayOfButtons.forEach((button) => {
        makeProjectButtonInactive(button);
    })
}
function makeProjectButtonActive(button) {
    const buttonContainer = button.closest('.projects__item');

    button.classList.add('projects__subtitle_active');
    buttonContainer.classList.add('projects__item_active');
}

function setEventListenersToProjectButtons(button, arrayOfProjects) {
    button.addEventListener('click', () => {
        makeAllProjectButtonsInactive([allProjectsButton, governmentProjectsButton,
            specialProjectsButton, currentProjectsButton]);

        makeProjectButtonActive(button);

        currentPageNumber = 1;

        displayCards(arrayOfProjects, containerForCards, numberOfCardsPerPage, currentPageNumber);
    })
}

function removePreviousCards(containerForCards) {
    let cardsPerPage = containerForCards.querySelectorAll('.projects__card');

    if (!(cardsPerPage.length === 0)) {
        for (let i = 0; i < cardsPerPage.length; i++) {
            cardsPerPage[i].remove();
        }
    }
}

function setTotalPageNumber(arrayOfCards) {
    totalNumberOfPagesElement.textContent = Math.ceil(arrayOfCards.length / numberOfCardsPerPage);
}

function setCurrentPageNumber() {
    currentPageElement.textContent = currentPageNumber;
}

function displayCards(arrayOfCards, containerForCards, numberOfCardsPerPage, currentPageNumber) {

    setTotalPageNumber(arrayOfCards);

    removePreviousCards(containerForCards);

    const start = (currentPageNumber - 1) * numberOfCardsPerPage;
    const end = currentPageNumber * numberOfCardsPerPage - 1;
    const newCardsPerPage = arrayOfCards.slice(start, (end + 1));

    for (let i = 0; i < newCardsPerPage.length; i++) {
        const dataForNewCard = newCardsPerPage[i];

        const newCardElement = cardTemplate.cloneNode(true);

        const cardLogo = newCardElement.querySelector('.projects__logo');
        const cardDescription = newCardElement.querySelector('.projects__description');

        cardLogo.src = dataForNewCard.imageLink;
        cardLogo.alt = dataForNewCard.name;

        cardDescription.textContent = dataForNewCard.projectDescription;

        containerForCards.prepend(newCardElement);
    }
}

function increasePageNumber() {
    if (currentPageNumber < 30) {
        currentPageNumber++;
        currentPageElement.textContent = currentPageNumber;
    }
}

function decreasePageNumber() {
    if (currentPageNumber > 1) {
        currentPageNumber--;
        currentPageElement.textContent = currentPageNumber;
    }
}

setCurrentPageNumber();

displayCards(projectsCards, containerForCards, numberOfCardsPerPage, currentPageNumber);

leftArrowButton.addEventListener('click', () => {
    decreasePageNumber();
    displayCards(projectsCards, containerForCards, numberOfCardsPerPage, currentPageNumber);
});

rightArrowButton.addEventListener('click', () => {
    increasePageNumber();
    displayCards(projectsCards, containerForCards, numberOfCardsPerPage, currentPageNumber);
});

setEventListenersToProjectButtons(allProjectsButton, projectsCards);
setEventListenersToProjectButtons(governmentProjectsButton, arrayOfGovernmentProjects);
setEventListenersToProjectButtons(specialProjectsButton, arrayOfSpecialProjects);
setEventListenersToProjectButtons(currentProjectsButton, arrayOfCurrentProjects);
