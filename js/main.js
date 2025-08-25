import {getPhotoList} from './mockData/service-photo';
import {renderPhotoList} from './services/render-photo';

const photoList = getPhotoList();
renderPhotoList(photoList);


