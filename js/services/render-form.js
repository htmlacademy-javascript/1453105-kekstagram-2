import {onDocumentKeydown} from '../functions';
import {validateForm} from './validate-form';

const photoUploadSection = document.querySelector('.img-upload');
const photoInput = photoUploadSection.querySelector('.img-upload__input');
const overlay = photoUploadSection.querySelector('.img-upload__overlay');
const closeButton = photoUploadSection.querySelector('.img-upload__cancel');
const submitButton = photoUploadSection.querySelector('.img-upload__submit');

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', (evt) => onDocumentKeydown(evt, closeForm));
  closeButton.removeEventListener('click', closeForm);
  photoInput.value = '';
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, closeForm));
  closeButton.addEventListener('click', closeForm);
  submitButton.addEventListener('click', (evt) => validateForm(evt));
};

export const addFormListener = () => {
  const loadPhoto = () => {
    openForm();
  };
  photoInput.addEventListener('change', loadPhoto);
};
