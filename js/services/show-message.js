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

const onNotificationCloseClick = (evt) => {
  evt.stopPropagation();
  const currentElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = currentElement.querySelector('button');
  if (evt.target === currentElement || evt.target === closeButton) {
    currentElement.remove();
    body.removeEventListener('click', onNotificationCloseClick);
  }
};

const onNotificationCloseKeydown = (evt) => {
  evt.stopPropagation();
  const currentElement = document.querySelector('.success') || document.querySelector('.error');
  if(isEscapeKey(evt)) {
    currentElement.remove();
    body.removeEventListener('keydown', onNotificationCloseKeydown);
  }
};

export const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onNotificationCloseClick);
  body.addEventListener('keydown', onNotificationCloseKeydown);
};

