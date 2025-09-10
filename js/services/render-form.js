import {onDocumentKeydown} from '../functions';
import {validateForm} from './validate-form';
import {addPhotoEditor} from './edit-photo';
import {removeScaleListener} from './scale-photo';
import {removeFilterListener} from './filter-photo';

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
  removeScaleListener();
  removeFilterListener();
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
    addPhotoEditor();
  };
  photoInput.addEventListener('change', loadPhoto);
};
