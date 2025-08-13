import {PHOTO_COUNT,} from './mockData/const';
import {createPhoto} from './mockData/service-photo';

const photoList = Array.from({length: PHOTO_COUNT }, createPhoto);
// eslint-disable-next-line no-console
// console.log(photoList);

