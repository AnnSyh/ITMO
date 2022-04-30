class EducationSwitch {
    constructor() {
        this._mastersButton = document.getElementById('masters-buttons');
        this._postgraduateButton = document.getElementById('post-graduate-button');
        this._cardPostgraduate = document.getElementById('postgraduate');
        this.cardMaster = document.getElementById('master');

    }

    _changeCard() {
        this._cardPostgraduate.classList.toggle('education__card_visible');
        this.cardMaster.classList.toggle('education__card_visible');

        this._mastersButton.classList.toggle('education__button_active');
        this._postgraduateButton.classList.toggle('education__button_active');
    }

    setEventListeners() {
        this._mastersButton.addEventListener('click', () => {
            this._changeCard();
        });
        this._postgraduateButton.addEventListener('click', () => {
            this._changeCard();
        });
    }
}

export default EducationSwitch;