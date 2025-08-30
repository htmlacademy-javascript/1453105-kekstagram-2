import {getPhotoList} from './mockData/service-photo';
import {renderPhotoList} from './services/render-photo';
import {setPhotoPopupListener} from './services/render-popup';

const photoList = getPhotoList();
renderPhotoList(photoList);
setPhotoPopupListener(photoList);

