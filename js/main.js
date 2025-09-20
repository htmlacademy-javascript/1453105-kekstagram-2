import {addFormListener} from './services/render-form';
import {getPhotoList} from './api/api';
import {showErrorLoadPhotoMessage} from './services/show-message';
import {getFilteredPhotoList, showFilter} from './services/filter-photo';

const startApp = async() => {
  try {
    await getPhotoList()
      .then((list) => {
        showFilter();
        getFilteredPhotoList(list);
        addFormListener();
      }).catch(() => {
        showErrorLoadPhotoMessage();
      });
  } catch {
    throw new Error('Ошибка загрузки данных');
  }
};

startApp();
