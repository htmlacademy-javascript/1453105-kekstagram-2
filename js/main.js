import {addFormListener} from './services/render-form';
import {getPhotoList} from './api/api';
import {showErrorLoadPhotoMessage} from './services/show-message';
import {getFilteredPhotoList, showFilter} from './services/filter-photo';


const startApp = async() => {
  try {
    const photoList = await getPhotoList();
    showFilter();
    getFilteredPhotoList(photoList);
    addFormListener();
  } catch {
    showErrorLoadPhotoMessage();
  }
};

startApp();
