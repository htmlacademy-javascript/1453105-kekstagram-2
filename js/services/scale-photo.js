import {turnToInteger} from '../functions';

const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleWrapper = document.querySelector('.img-upload__scale');
const decreaseButton = scaleWrapper.querySelector('.scale__control--smaller');
const increaseButton = scaleWrapper.querySelector('.scale__control--bigger');
const imageSize = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value * 0.01})`;
};

const decreaseImage = () => {
  let currentValue = turnToInteger(imageSize.value);
  if (currentValue <= MIN_SCALE) {
    currentValue = MIN_SCALE;
  } else {
    currentValue -= STEP;
  }
  imageSize.value = `${currentValue}%`;
  scaleImage(currentValue);
};

const increaseImage = () => {
  let currentValue = turnToInteger(imageSize.value);
  if (currentValue >= MAX_SCALE) {
    currentValue = MAX_SCALE;
  } else {
    currentValue += STEP;
  }
  imageSize.value = `${currentValue}%`;
  scaleImage(currentValue);
};

export const removeScaleListener = () => {
  decreaseButton.removeEventListener('click', decreaseImage);
  increaseButton.removeEventListener('click', increaseImage);
};

export const addScaleListener = () => {
  decreaseButton.addEventListener('click', decreaseImage);
  increaseButton.addEventListener('click', increaseImage);
};
