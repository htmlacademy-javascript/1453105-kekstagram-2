const isValidLengthString = (inputString, lengthString) => inputString.length <= lengthString;

const isPalindrome = (inputString) => {
  const tempString = inputString.toLowerCase().trim().replace(/\s+/g, '');
  const reverseString = tempString.split('').reverse().join('');
  return reverseString === tempString;
};

const turnToInteger = (inputValue) => {
  if (inputValue.length < 1) {
    return NaN;
  }
  const tempValue = inputValue.toString().replace(/\s+/g, '').split('');
  const tempResult = tempValue.filter((i) => !Number.isNaN(+i)).join('');
  return tempResult.length < 1 ? NaN : +tempResult;
};

isValidLengthString('проверяемая строка', 20);
isPalindrome('Гни комсомол лом о смокинг');
turnToInteger('1 кефир, 0.5 батона');

