import {turnToInteger} from '../functions';

const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleWrapper = document.querySelector('.img-upload__scale');
const decreaseButton = scaleWrapper.querySelector('.scale__control--smaller');
const increaseButton = scaleWrapper.querySelector('.scale__control--bigger');
const imageSize = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

export const removeImageScale = () => {
  imagePreview.style.transform = 'none';
  imageSize.value = `${MAX_SCALE}%`;
  imageSize.setAttribute('value', `${MAX_SCALE}%`);
};

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value * 0.01})`;
};

const onDecreaseButtonClick = () => {
  let currentValue = turnToInteger(imageSize.value);
  if (currentValue <= MIN_SCALE) {
    currentValue = MIN_SCALE;
  } else {
    currentValue -= STEP;
  }
  imageSize.value = `${currentValue}%`;
  imageSize.setAttribute('value', `${currentValue}%`);
  scaleImage(currentValue);
};

const onIncreaseButtonClick = () => {
  let currentValue = turnToInteger(imageSize.value);
  if (currentValue >= MAX_SCALE) {
    currentValue = MAX_SCALE;
  } else {
    currentValue += STEP;
  }
  imageSize.value = `${currentValue}%`;
  imageSize.setAttribute('value', `${currentValue}%`);
  scaleImage(currentValue);
};

export const removeScaleListener = () => {
  decreaseButton.removeEventListener('click', onDecreaseButtonClick);
  increaseButton.removeEventListener('click', onIncreaseButtonClick);
};

export const addScaleListener = () => {
  decreaseButton.addEventListener('click', onDecreaseButtonClick);
  increaseButton.addEventListener('click', onIncreaseButtonClick);
};
