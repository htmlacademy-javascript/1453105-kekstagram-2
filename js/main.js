import {renderPhotoList} from './services/render-photo';
import {setPhotoPopupListener} from './services/render-popup';
import {addFormListener} from './services/render-form';
import {getPhotoList} from './api/api';
import {showErrorMessage} from './services/show-error';

try {
  const photoList = await getPhotoList();
  renderPhotoList(photoList);
  setPhotoPopupListener(photoList);
  addFormListener();
} catch {
  showErrorMessage();
}

