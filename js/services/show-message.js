import {onDocumentKeydown} from '../functions';
const REMOVE_MESSAGE_TIME = 5000;
const errorTemplate = document.querySelector('#data-error').content;
let currentElement = '';

export const showErrorLoadPhotoMessage = () => {
  const content = errorTemplate.cloneNode(true);
  document.body.append(content);
  const errorTemple = document.querySelector('.data-error');
  setTimeout(() => {
    errorTemple.remove();
  }, REMOVE_MESSAGE_TIME);
};

const closeMessage = () => {
  if (currentElement) {
    currentElement.remove();
    currentElement = null;
  }
  document.removeEventListener('keydown', (evt) => onDocumentKeydown(evt));
  document.removeEventListener('click', closeOverlay);
};

function closeOverlay (evt) {
  if (currentElement && (!currentElement.querySelector('.success__inner, .error__inner').contains(evt.target))){
    closeMessage();
  }
}

export const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  if (successElement.classList.contains('hidden')){
    successElement.classList.remove('hidden');
  }
  currentElement = successElement;
  const successButton = successElement.querySelector('.success__button');
  if (successButton) {
    successButton.addEventListener('click', closeMessage);
  }
  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, closeMessage));
  document.addEventListener('click', (evt) => closeOverlay(evt));
};

export const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);
  if (errorElement.classList.contains('hidden')){
    errorElement.classList.remove('hidden');
  }
  currentElement = errorElement;
  const errorButton = errorElement.querySelector('.error__button');
  if (errorButton) {
    errorButton.addEventListener('click', closeMessage);
  }
  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, closeMessage));
  document.addEventListener('click', (evt) => closeOverlay(evt));
};

