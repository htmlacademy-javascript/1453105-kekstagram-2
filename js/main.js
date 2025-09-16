import {renderPhotoList} from './services/render-photo';
import {setPhotoPopupListener} from './services/render-popup';
import {addFormListener} from './services/render-form';
import {getPhotoList} from './api/api';
import {showErrorLoadPhotoMessage} from './services/show-message';

try {
  const photoList = await getPhotoList();
  renderPhotoList(photoList);
  setPhotoPopupListener(photoList);
  addFormListener();
} catch {
  showErrorLoadPhotoMessage();
}

