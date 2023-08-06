export function isValidInn(value) {
  return value.length >= 10 && value.length <= 12;
}

export function isValidCard(cardNumber) {
  const number = cardNumber.trim();
  if (!number) {
    return false;
  }

  // let sum = 0;
  // const parity = cardNumber.length % 2;

  // for (let i = 0; i < cardNumber.length; i += 1) {
  //   const number = parseInt(cardNumber[i], 10)
  //   if (i % 2 !== parity) {
  //     sum += number;
  //   } else if (number > 4) {
  //     sum += 2 * number - 9;
  //   } else {
  //     sum += 2 * number;
  //   }
  //   console.log(i, 'sum=',sum)
  // }

  // console.log(parseInt(cardNumber[cardNumber.length - 1], 10));
  // console.log((10 - (sum % 10)));

  // return parseInt(cardNumber[cardNumber.length - 1], 10) === (10 - (sum % 10));

  // Алгоритм Луна
  const digits = cardNumber.trim().split('').map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i += 1) {
    let digit = digits[i];
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
