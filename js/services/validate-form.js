import {isValidLengthString} from '../functions';
import {postPhoto} from '../api/api';
import {closeForm} from './render-form';
import {showErrorMessage, showSuccessMessage} from './show-message';
const HASHTAG_LENGTH = 20;
const HASHTAG_COUNT = 5;
let errorMessage = '';
const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
export const hashTagInput = form.querySelector('.text__hashtags');
export const descriptionInput = form.querySelector('.text__description');
const error = () => errorMessage;

const validateComment = (value) => value.length < 140;
const validateHashTag = (value) => {
  errorMessage = '';
  const inputValue = value.toLowerCase().trim();
  if (!inputValue) {
    return true;
  }
  const tempArray = inputValue.split(/\s+/);
  const rules = [
    {
      rule: tempArray.some((i) => i === '#'),
      error: 'Хеш-тег не может состоять только из одной решётки'
    },
    {
      rule: tempArray.some((i) => i.slice(1).includes('#')),
      error: 'Хеш-теги разделяются пробелами'
    },
    {
      rule: tempArray.some((i) => i[0] !== '#'),
      error: 'Хеш-тег  должен начинаться с символа "#"'
    },
    {
      rule: tempArray.some((i, index, array) => array.includes(i, index + 1)),
      error: 'Хеш-теги не должны повторяться'
    },
    {
      rule: tempArray.some((i) => !isValidLengthString(i, HASHTAG_LENGTH)),
      error: 'Достигнута максимальная длина хеш-тега'
    },
    {
      rule: tempArray.length > HASHTAG_COUNT,
      error: 'Достигнуто максимальное количество хеш-тегов'
    },
    {
      rule: tempArray.some((i) => !/^#[a-zа-яё0-9]{1,19}$/i.test(i)),
      error: 'Хеш-тег содержит недопустимые символы'
    }
  ];
  return rules.every((i) => {
    const isValid = i.rule;
    if (isValid) {
      errorMessage = i.error;
    }
    return !isValid;
  });
};

const onSuccess = () => {
  closeForm();
  hashTagInput.value = '';
  descriptionInput.value = '';
  showSuccessMessage();
};

const onError = () => {
  showErrorMessage();
};

const blockSubmitButton = () => {
  submitButton.disable = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disable = false;
  submitButton.textContent = 'Опубликовать';
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashTagInput, validateHashTag, error, 2, false);
pristine.addValidator(descriptionInput, validateComment, 'Достигнута максимальная длина комментария');

const submitData = async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    hashTagInput.value = hashTagInput.value.trim().replaceAll(/\s+/g, ' ');
    blockSubmitButton();
    try {
      await postPhoto(new FormData(evt.target));
      onSuccess();
    } catch {
      onError();
    } finally {
      unblockSubmitButton();
    }
  }
};

form.addEventListener('submit', submitData);

