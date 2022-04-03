class ProjectsSlider {
    constructor(allCards) {
        this._containerForCards = document.querySelector('.projects__cards');

        this._cardTemplate = document.querySelector('.projects__template').content.querySelector('.projects__card');

        this._currentPageElement = document.querySelector('.projects__text-accent');

        this._leftArrowButton = document.getElementById('projects__arrow-button_left');
        this._rightArrowButton = document.getElementById('projects__arrow-button_right');
        this._totalNumberOfPagesElement = document.getElementById('projects__total-number-of-pages');

        this._allProjectsButton = document.getElementById('projects-all');
        this._governmentProjectsButton = document.getElementById('projects-gos');
        this._specialProjectsButton = document.getElementById('projects-special');
        this._currentProjectsButton = document.getElementById('projects-current');
        this._arrayOfButtons = [this._allProjectsButton, this._governmentProjectsButton,
            this._specialProjectsButton, this._currentProjectsButton];

        this._currentPageNumber = 1;

        this._numberOfCardsPerPage = 8;

        this._projectCards = allCards;
        this._arrayOfGovernmentProjects = this._projectCards.filter(function (card) {
            if (card.type === 'гос. проект') {
                return card;
            }
        });
        this._arrayOfSpecialProjects = this._projectCards.filter(function (card) {
            if (card.type === 'спец. проект') {
                return card;
            }
        });
        this._arrayOfCurrentProjects = this._projectCards.filter(function (card) {
            if (card.type === 'в разработке') {
                return card;
            }
        });
        this._currentArrayOfCards = this._projectCards;

        this._rightArrowButtonHandle = this._rightArrowButtonHandle.bind(this);
        this._leftArrowButtonHandle = this._leftArrowButtonHandle.bind(this);
    }

    // ФУНКЦИИ, КОТОРЫЕ ДЕЛАЮТ АКТИВНЫМИ И НЕАКТИВНЫМИ КНОПКИ С НАЗВАНИЕМ КАТЕГОРИЙ ПРОЕКТОВ
    _makeProjectButtonInactive(button) {
        const buttonContainer = button.closest('.projects__item');

        button.classList.remove('projects__subtitle_active');
        buttonContainer.classList.remove('projects__item_active');
    }

    _makeAllProjectButtonsInactive() {
        this._arrayOfButtons.forEach((button) => {
            this._makeProjectButtonInactive(button);
        })
    }

    _makeProjectButtonActive(button) {
        const buttonContainer = button.closest('.projects__item');

        button.classList.add('projects__subtitle_active');
        buttonContainer.classList.add('projects__item_active');
    }

    // ФУНКЦИИ, МЕНЯЮЩИЕ ЧИСЛО СТРАНИЦ
    // ФУНКЦИЯ, УСТАНАВЛИВАЮЩАЯ ОБЩЕЕ ЧИСЛО СТРАНИЦ С КАРТОЧКАМИ
    _setTotalPageNumber() {
        this._totalNumberOfPagesElement.textContent = Math.ceil(this._currentArrayOfCards.length / this._numberOfCardsPerPage);
    }

    // ФУНКЦИЯ, УСТАНАВЛИВАЮЩАЯ НОМЕР ТЕКУЩЕЙ СТРАНИЦЫ
    _setCurrentPageNumber() {
        this._currentPageElement.textContent = this._currentPageNumber;
    }

    _increasePageNumber() {
        if (this._currentPageNumber < Math.ceil(this._currentArrayOfCards.length / this._numberOfCardsPerPage)) {
            this._currentPageNumber++;
            this._currentPageElement.textContent = this._currentPageNumber;
        }
    }

    _decreasePageNumber() {
        if (this._currentPageNumber > 1) {
            this._currentPageNumber--;
            this._currentPageElement.textContent = this._currentPageNumber;
        }
    }

    // ОБРАБОТЧИКИ СТРЕЛОК
    _leftArrowButtonHandle() {
        this._decreasePageNumber();
        this.displayCards(this._currentArrayOfCards);
    }

    _rightArrowButtonHandle() {
        this._increasePageNumber();
        this.displayCards(this._currentArrayOfCards);
    }

    // ФУНКЦИЯ, УДАЛЯЮЩАЯ КАРТОЧКИ СО СТРАНИЦЫ
    _removePreviousCards() {
        let cardsPerPage = this._containerForCards.querySelectorAll('.projects__card');

        if (!(cardsPerPage.length === 0)) {
            for (let i = 0; i < cardsPerPage.length; i++) {
                cardsPerPage[i].remove();
            }
        }

        this._leftArrowButton.removeEventListener('click', this._leftArrowButtonHandle);

        this._rightArrowButton.removeEventListener('click', this._rightArrowButtonHandle);
    }

    // ФУНКЦИЯ, КОТОРАЯ ОТОБРАЖАЕТ КАРТОЧКИ НА СТРАНИЦЕ
    displayCards(arrayOfCards) {
        this._setCurrentPageNumber();
        this._setTotalPageNumber();

        this._removePreviousCards();

        const start = (this._currentPageNumber - 1) * this._numberOfCardsPerPage;
        const end = this._currentPageNumber * this._numberOfCardsPerPage - 1;
        const newCardsPerPage = arrayOfCards.slice(start, (end + 1));

        for (let i = 0; i < newCardsPerPage.length; i++) {
            const dataForNewCard = newCardsPerPage[i];

            const newCardElement = this._cardTemplate.cloneNode(true);

            const cardLogo = newCardElement.querySelector('.projects__logo');
            const cardDescription = newCardElement.querySelector('.projects__description');

            cardLogo.src = dataForNewCard.imageLink;
            cardLogo.alt = dataForNewCard.name;

            cardDescription.textContent = dataForNewCard.projectDescription;

            this._containerForCards.prepend(newCardElement);
        }

        this._leftArrowButton.addEventListener('click', this._leftArrowButtonHandle);

        this._rightArrowButton.addEventListener('click', this._rightArrowButtonHandle);
    }

    _setEventListenersToProjectButton(button, arrayOfProjects) {
        button.addEventListener('click', () => {
            this._makeAllProjectButtonsInactive();

            this._makeProjectButtonActive(button);

            this._currentPageNumber = 1;

            this._currentArrayOfCards = arrayOfProjects;

            this.displayCards(arrayOfProjects);
        })
    }

    setEventListenersToProjectButtons() {
        this._setEventListenersToProjectButton(this._allProjectsButton, this._projectCards);
        this._setEventListenersToProjectButton(this._governmentProjectsButton, this._arrayOfGovernmentProjects);
        this._setEventListenersToProjectButton(this._specialProjectsButton, this._arrayOfSpecialProjects);
        this._setEventListenersToProjectButton(this._currentProjectsButton, this._arrayOfCurrentProjects);
    }
}

export default ProjectsSlider;