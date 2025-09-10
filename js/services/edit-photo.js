import {addFilterListener} from './filter-photo';
import {addScaleListener} from './scale-photo';

export const addPhotoEditor = () => {
  addScaleListener();
  addFilterListener();
};
