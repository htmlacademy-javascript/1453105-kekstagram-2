import {renderPhotoList} from './render-photo';
import {createRandomIdFromRangeGenerator} from '../mockData/service';
import {debounce} from '../functions';
import {setPhotoPopupListener} from './render-popup';

const COUNT_RANDOM_PHOTO = 10;
const filterWrapper = document.querySelector('.img-filters');
const buttonList = document.querySelectorAll('.img-filters__button');
let tempPhotoList = [];

export const showFilter = () => {
  filterWrapper.classList.remove('img-filters--inactive');
};

const debounceFilters = debounce((list) => {
  renderPhotoList(list);
}, 500);

const filter = {
  'filter-default': () => {
    debounceFilters(tempPhotoList);
  },
  'filter-random': () => {
    const randomList = Array.from({length: COUNT_RANDOM_PHOTO }, createRandomIdFromRangeGenerator(0, 24));
    const randomPhotoList = tempPhotoList.filter((el, index) => randomList.includes(index));
    debounceFilters(randomPhotoList);
  },
  'filter-discussed': () => {
    const popularList = tempPhotoList.slice().sort((item1, item2) => item2.comments.length - item1.comments.length);
    debounceFilters(popularList);
  },
};

const changeFilter = (evt) => {
  if (evt.target.id in filter) {
    const activeButton = document.querySelector('.img-filters__button--active');
    if (evt.target === activeButton) {
      return;
    }
    activeButton.classList.toggle('img-filters__button--active');
    evt.target.classList.toggle('img-filters__button--active');
    filter[evt.target.id]();
  }
};

const setPhotoFilterListener = () => {
  buttonList.forEach((btn) => {
    btn.addEventListener('click', (evt) => changeFilter(evt));
  });
};

export const getFilteredPhotoList = (list) => {
  setPhotoFilterListener();
  tempPhotoList = [...list];
  debounceFilters(tempPhotoList);
  setPhotoPopupListener(tempPhotoList);
};
