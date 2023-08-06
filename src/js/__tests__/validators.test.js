import { isValidCard } from '../validators';
import cardData from './fakeCardsNumbrs.json';

test('should be false if card numbre is null', () => {
  const result = isValidCard('');

  expect(result).toBe(false);
});

test('should be false if card numbre not Number', () => {
  const result = isValidCard('fdfasdfsadadfasdfasdfasdfadfa');

  expect(result).toBe(false);
});

test('should be false if card numbre invalid', () => {
  const result = isValidCard('411111111111111');

  expect(result).toBe(false);
});

describe('Card Number Validation', () => {
  Object.entries(cardData).forEach(([paymentSystem, cardInfoArray]) => {
    test(`should be true if ${paymentSystem} card numbers are valid`, () => {
      cardInfoArray.forEach(([cardNumber, expected]) => {
        const result = isValidCard(cardNumber.toString()); // Convert card number to string
        expect(result).toBe(expected);
      });
    });
  });
});
