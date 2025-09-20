import {isEscapeKey} from '../functions';
const REMOVE_MESSAGE_TIME = 5000;
const errorTemplate = document.querySelector('#data-error').content;
const body = document.body;

export const showErrorLoadPhotoMessage = () => {
  const content = errorTemplate.cloneNode(true);
  document.body.append(content);
  const errorTemple = document.querySelector('.data-error');
  setTimeout(() => {
    errorTemple.remove();
  }, REMOVE_MESSAGE_TIME);
};


export const closeNotification = (evt) => {
  evt.stopPropagation();
  const currentElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = currentElement.querySelector('button');
  if(evt.target === currentElement || evt.target === closeButton || isEscapeKey(evt)) {
    currentElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
};

export const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', closeNotification);
  body.addEventListener('keydown', closeNotification);
};

