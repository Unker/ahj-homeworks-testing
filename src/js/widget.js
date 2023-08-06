import { isValidCard } from './validators';

export default class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static get availableCards() {
    // [наименование, pattern]
    return {
      visa: ['Visa', /^4/],
      master: ['MasterCard', /^5[1-5]/],
      amex: ['American Express', /^3[47]/],
      discover: ['Discover', /^(6011|622(12[6-9]|1[3-9][0-9]|2[0-5][0-9])|64[4-9]|65)/],
      jcb: ['JCB', /^(?:2131|1800|35\d{3})\d{11}$/],
      diners_club: ['Diners Club', /^3(?:0[0-5]|[68]\d)\d{11}$/],
      mir: ['Mir', /^22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d\d|9(?:[01]\d|2[0-5]))\d{10}$/],
    };
  }

  static generateCardList(cards) {
    const listItems = cards.map((card) => `<li><span class="card ${card}">${card}</span></li>`).join('');
    const html = `<ul class="cards list-unstyled">${listItems}</ul>`;
    return html;
  }

  static get markup() {
    return `
      <form class="card-form-widget">
          <label for="card-input">Check your credit card number</label>
          ${CardFormWidget.generateCardList(Object.keys(CardFormWidget.availableCards))}
          <div class="control">
              <input type="text" id="card-input" class="input">
              <button class="submit btn">Click to Validate</button>
          </div>
      </form>
      `;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.input';
  }

  static get selector() {
    return '.card-form-widget';
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardFormWidget.markup;

    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);

    this.element.addEventListener('submit', this.onSubmit);
    this.element.addEventListener('keyup', this.onInput);
  }

  onSubmit(e) {
    e.preventDefault();

    const cardNumber = this.input.value;

    this.displayValidationResult(isValidCard(cardNumber));
  }

  onInput() {
    this.input.classList.remove('invalid');
    this.input.classList.remove('valid');

    const cardNumber = this.input.value;

    const paymentSystem = CardFormWidget.detectPaymentSystem(cardNumber);
    this.displayPaymentSystem(paymentSystem);
  }

  displayValidationResult(isValid) {
    // Logic to display validation result on the DOM
    if (isValid) {
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
    } else {
      this.input.classList.add('invalid');
      this.input.classList.remove('valid');
    }
  }

  displayPaymentSystem(paymentSystem) {
    if (!paymentSystem) {
      const cards = this.element.querySelectorAll('.card');
      cards.forEach((card) => {
        card.classList.remove('cdisabled');
      });
      return;
    }

    if (paymentSystem) {
      const disableCards = this.element.querySelectorAll(`.card:not(.${paymentSystem})`);
      disableCards.forEach((card) => {
        card.classList.add('cdisabled');
      });
    }
  }

  static detectPaymentSystem(cardNumber) {
    for (const [key, value] of Object.entries(CardFormWidget.availableCards)) {
      if (value[1].test(cardNumber)) {
        return key;
      }
    }
    return null;
  }
}
