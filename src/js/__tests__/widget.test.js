import CardFormWidget from '../widget';

test('widget should render', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardFormWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(CardFormWidget.markup);
});

test('widget should add valid class', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardFormWidget(container);

  widget.bindToDOM();

  widget.input.value = '4111111111111111';
  widget.submit.click();

  expect(widget.input.classList.contains('valid')).toEqual(true);
  expect(widget.input.classList.contains('invalid')).toEqual(false);
});

test('widget should add invalid class', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardFormWidget(container);

  widget.bindToDOM();

  widget.input.value = '411111111111111';
  widget.submit.click();

  expect(widget.input.classList.contains('invalid')).toEqual(true);
  expect(widget.input.classList.contains('valid')).toEqual(false);
});
