import {getPhotoList} from './mockData/service-photo';
import {renderPhotoList} from './services/render-photo';
import {setPhotoPopupListener} from './services/render-popup';
import {addFormListener} from './services/render-form';

const photoList = getPhotoList();
renderPhotoList(photoList);
setPhotoPopupListener(photoList);
addFormListener();

