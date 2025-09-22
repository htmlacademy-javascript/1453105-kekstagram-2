import {isValidLengthString} from '../functions';
import {postPhoto} from '../api/api';
import {appendNotification} from './show-message';
import {onFormClose} from './render-form';
const HASHTAG_LENGTH = 20;
const HASHTAG_COUNT = 5;
let errorMessage = '';
const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
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
  const tags = inputValue.split(/\s+/);
  const rules = [
    {
      rule: tags.some((i) => i === '#'),
      error: 'Хеш-тег не может состоять только из одной решётки'
    },
    {
      rule: tags.some((i) => i.slice(1).includes('#')),
      error: 'Хеш-теги разделяются пробелами'
    },
    {
      rule: tags.some((i) => i[0] !== '#'),
      error: 'Хеш-тег  должен начинаться с символа "#"'
    },
    {
      rule: tags.some((i, index, array) => array.includes(i, index + 1)),
      error: 'Хеш-теги не должны повторяться'
    },
    {
      rule: tags.some((i) => !isValidLengthString(i, HASHTAG_LENGTH)),
      error: 'Достигнута максимальная длина хеш-тега'
    },
    {
      rule: tags.length > HASHTAG_COUNT,
      error: 'Достигнуто максимальное количество хеш-тегов'
    },
    {
      rule: tags.some((i) => !/^#[a-zа-яё0-9]{1,19}$/i.test(i)),
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

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Опубликовать';
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashTagInput, validateHashTag, error, 2, false);
pristine.addValidator(descriptionInput, validateComment, 'Достигнута максимальная длина комментария');

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    hashTagInput.value = hashTagInput.value.trim().replaceAll(/\s+/g, ' ');
    blockSubmitButton();
    try {
      await postPhoto(new FormData(evt.target));
      appendNotification(successTemplate, () => onFormClose());
    } catch {
      appendNotification(errorTemplate);
    } finally {
      unblockSubmitButton();
    }
  }
};

form.addEventListener('submit', onFormSubmit);

