export function isValidInn(value) {
  return value.length >= 10 && value.length <= 12;
}

export function isValidCard(cardNumber) {
  let sum = 0;
  const parity = cardNumber.length % 2;

  for (let i = 0; i < cardNumber.length; i += 1) {
    if (i % 2 !== parity) {
      sum += parseInt(cardNumber[i], 10);
    } else if (parseInt(cardNumber[i], 10) > 4) {
      sum += 2 * parseInt(cardNumber[i], 10) - 9;
    } else {
      sum += 2 * parseInt(cardNumber[i], 10);
    }
  }

  return parseInt(cardNumber[cardNumber.length - 1], 10) === (10 - (sum % 10));
}
