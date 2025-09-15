import {onDocumentKeydown} from '../functions';
import {addPhotoEditor} from './edit-photo';
import {removeImageScale, removeScaleListener} from './scale-photo';
import {clearSliderEffects, removeFilterListener} from './filter-photo';

const photoUploadSection = document.querySelector('.img-upload');
const photoInput = photoUploadSection.querySelector('.img-upload__input');
const overlay = photoUploadSection.querySelector('.img-upload__overlay');
const closeButton = photoUploadSection.querySelector('.img-upload__cancel');

export const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', (evt) => onDocumentKeydown(evt, closeForm));
  closeButton.removeEventListener('click', closeForm);
  removeScaleListener();
  removeFilterListener();
  removeImageScale();
  clearSliderEffects();
  photoInput.value = '';
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, closeForm));
  closeButton.addEventListener('click', closeForm);
};

export const addFormListener = () => {
  const loadPhoto = () => {
    openForm();
    addPhotoEditor();
  };
  photoInput.addEventListener('change', loadPhoto);
};
