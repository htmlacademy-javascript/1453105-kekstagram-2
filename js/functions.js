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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
