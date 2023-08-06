import { isValidCard } from '../validators';

test('should be false if card numbre is null', () => {
  const result = isValidCard('');

  expect(result).toBe(false);
});

test('should be false if card numbre not Number', () => {
  const result = isValidCard('fdfasdfsadadfasdfasdfasdfadfa');

  expect(result).toBe(false);
});

test('should be true if card numbre valid', () => {
  const result = isValidCard('4111111111111111');

  expect(result).toBe(true);
});

test('should be false if card numbre invalid', () => {
  const result = isValidCard('411111111111111');

  expect(result).toBe(false);
});
