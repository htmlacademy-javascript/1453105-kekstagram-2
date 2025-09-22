import {descriptionInput, hashTagInput} from './services/validate-form';

export const isValidLengthString = (inputString, lengthString) => inputString.length <= lengthString;

export const turnToInteger = (inputValue) => {
  if (inputValue.length < 1) {
    return NaN;
  }
  const tempValue = inputValue.toString().replace(/\s+/g, '').split('');
  const tempResult = tempValue.filter((i) => !Number.isNaN(+i)).join('');
  return tempResult.length < 1 ? NaN : +tempResult;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const onDocumentKeydown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashTagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      cb();
    }
  }
};

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const createRandomIdFromRangeGenerator = (min, max) => {
  const idList = new Set();
  let sequentialId = min - 1;
  return function(){
    let tempId = getRandomInteger(min, max);
    if (idList.size >= (max - min + 1)) {
      sequentialId = (sequentialId + 1) > max ? min : sequentialId + 1;
      return sequentialId;
    }
    while (idList.has(tempId)) {
      tempId = getRandomInteger(min, max);
    }
    idList.add(tempId);
    return tempId;
  };
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
