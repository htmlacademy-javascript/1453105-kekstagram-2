const effectWrapper = document.querySelector('.img-upload__effects');
const effectLevelWrapper = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementValue = document.querySelector('.effect-level__value');
const effectsButtons = effectWrapper.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
let selectedEffectElement = '';

const updateSlider = (min, max, step) => {
  sliderElement.noUiSlider.updateOptions({
    start: max,
    range: {
      min: min,
      max: max
    },
    step: step
  });
};

const hideFilter = () => {
  sliderElement.classList.add('hidden');
  effectLevelWrapper.classList.add('hidden');
};

const showFilter = () => {
  sliderElement.classList.remove('hidden');
  effectLevelWrapper.classList.remove('hidden');
};

const effect = {
  'effect-none': () => {
    imagePreview.style.filter = 'none';
    hideFilter();
  },
  'effect-chrome': () => {
    updateSlider(0,1, 0.1);
    imagePreview.style.filter = 'grayscale(1)';
  },
  'effect-sepia': () => {
    updateSlider(0,1, 0.1);
    imagePreview.style.filter = 'sepia(1)';
  },
  'effect-marvin': () => {
    updateSlider(0,100, 1);
    imagePreview.style.filter = 'invert(100%)';
  },
  'effect-phobos': () => {
    updateSlider(0,3, 0.1);
    imagePreview.style.filter = 'blur(3px)';
  },
  'effect-heat': () => {
    updateSlider(0,3, 0.1);
    imagePreview.style.filter = 'brightness(3)';
  },
};

const setValue = (value) => {
  if (selectedEffectElement.id === 'effect-none') {
    imagePreview.style.filter = 'none';
  }
  if (selectedEffectElement.id === 'effect-chrome') {
    imagePreview.style.filter = `grayscale(${value})`;
  }
  if (selectedEffectElement.id === 'effect-sepia') {
    imagePreview.style.filter = `sepia(${value})`;
  }
  if (selectedEffectElement.id === 'effect-marvin') {
    imagePreview.style.filter = `invert(${value}%)`;
  }
  if (selectedEffectElement.id === 'effect-phobos') {
    imagePreview.style.filter = `blur(${value}px)`;
  }
  if (selectedEffectElement.id === 'effect-heat') {
    imagePreview.style.filter = `brightness(${value})`;
  }
};

const changeEffect = (evt) => {
  if (evt.target.id in effect) {
    showFilter();
    effect[evt.target.id]();
    selectedEffectElement = document.querySelector(`#${evt.target.id}`);
  } else {
  // eslint-disable-next-line no-console
    console.warn('Выбранный эффект отстутствует');
  }
};

noUiSlider.create(sliderElement, {
  start: 0,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  format: {
    to: (value)=> Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

const setSlider = () => {
  sliderElement.noUiSlider.on('update', () => {
    sliderElementValue.value = sliderElement.noUiSlider.get();
    setValue(sliderElementValue.value);
  });
};

export const clearSliderEffects = () => {
  selectedEffectElement = document.querySelector(`#${'effect-none'}`);
  setValue(0);
  updateSlider(0,1, 1);
  imagePreview.style.filter = 'none';
};

export const addFilterListener = () => {
  effectsButtons.forEach((btn) => {
    btn.addEventListener('click', (evt) => changeEffect(evt));
  });
  hideFilter();
  setSlider();
};

export const removeFilterListener = () => {
  effectsButtons.forEach((btn) => {
    btn.removeEventListener('click', (evt) => changeEffect(evt));
  });
};


