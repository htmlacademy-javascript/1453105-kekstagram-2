import {isValidLengthString} from '../functions';
import {postPhoto} from '../api/api';
import {closeForm} from './render-form';
const HASHTAG_LENGTH = 20;
const HASHTAG_COUNT = 5;
let errorMessage = '';
const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
export const hashTagInput = form.querySelector('.text__hashtags');
export const descriptionInput = form.querySelector('.text__description');
const error = () => errorMessage;

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

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateComment = (value) => value.length < 140;
const onHashtagInput = () => {
  validateHashTag(hashTagInput.value);
};

const onSuccess = (data) => {
  // eslint-disable-next-line no-console
  console.log('sucess', data);
  closeForm();
  hashTagInput.value = '';
  descriptionInput.value = '';
};

const onError = () => {
  // eslint-disable-next-line no-console
  console.log('error');
};

const blockSubmitButton = () => {
  submitButton.disable = true;
};

const unblockSubmitButton = () => {
  submitButton.disable = false;
};


export const validateForm = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    hashTagInput.value = hashTagInput.value.trim().replaceAll(/\s+/g, ' ');
    blockSubmitButton();
    postPhoto(new FormData(evt.target)).then(onSuccess).catch(() => onError()).finally(unblockSubmitButton);
  }
};

pristine.addValidator(hashTagInput, validateHashTag, error, 2, false);
pristine.addValidator(descriptionInput, validateComment, 'Достигнута максимальная длина комментария');
hashTagInput.addEventListener('input', onHashtagInput);

form.addEventListener('submit', validateForm);
