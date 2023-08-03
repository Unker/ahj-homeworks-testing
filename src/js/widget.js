import { isValidCard } from './validators';

export default class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static get availableCards() {
    return [
      'visa',
      'master',
      'amex',
      'discover',
      'jcb',
      'diners_club',
      // 'mir',
    ];
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
          ${CardFormWidget.generateCardList(CardFormWidget.availableCards)}
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
    this.element.addEventListener('onkeydown', this.onInput);
  }

  onSubmit(e) {
    e.preventDefault();

    const { value } = this.input;

    if (isValidCard(value)) {
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
    } else {
      this.input.classList.add('invalid');
      this.input.classList.remove('valid');
    }
  }

  onInput(e) {
    e.preventDefault();

    const { value } = this.input;
    console.log(value);
  }
}
