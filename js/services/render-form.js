import {onDocumentKeydown} from '../functions';
import {addPhotoEditor} from './edit-photo';
import {removeImageScale, removeScaleListener} from './scale-photo';
import {clearSliderEffects, removeFilterListener} from './set-effect-photo';
import {removeFileInputListener} from './load-photo';
import {descriptionInput, hashTagInput} from './validate-form';

const photoUploadSection = document.querySelector('.img-upload');
const photoInput = photoUploadSection.querySelector('.img-upload__input');
const overlay = photoUploadSection.querySelector('.img-upload__overlay');
const closeButton = photoUploadSection.querySelector('.img-upload__cancel');

export const onFormClose = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', (evt) => onDocumentKeydown(evt, onFormClose));
  closeButton.removeEventListener('click', onFormClose);
  removeScaleListener();
  removeFilterListener();
  removeImageScale();
  clearSliderEffects();
  removeFileInputListener();
  photoInput.value = '';
  hashTagInput.value = '';
  descriptionInput.value = '';
};

const openForm = () => {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', (evt) => onDocumentKeydown(evt, onFormClose));
  closeButton.addEventListener('click', onFormClose);
};

const onPhotoLoad = () => {
  openForm();
  addPhotoEditor();
};

export const addFormListener = () => {
  photoInput.addEventListener('change', onPhotoLoad);
};
