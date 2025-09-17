import {addFilterListener} from './set-effect-photo';
import {addScaleListener} from './scale-photo';
import {fileInputListener} from './load-photo';

export const addPhotoEditor = () => {
  addScaleListener();
  addFilterListener();
  fileInputListener();
};
