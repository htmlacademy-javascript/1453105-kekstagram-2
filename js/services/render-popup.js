import {clearCommentList, renderComments} from './render-comment';
import {renderBigPhoto} from './render-photo';
import {onDocumentKeydown} from '../functions';

const photoModalElement = document.querySelector('.big-picture');
const photoList = document.querySelector('.pictures');
const body = document.querySelector('body');
const closeButton = document.querySelector('#picture-cancel');

const renderBigPhotoContext = ({description, likes}) => {
  const contextWrapper = photoModalElement.querySelector('.big-picture__social');
  contextWrapper.querySelector('.social__caption').textContent = description;
  contextWrapper.querySelector('.likes-count').textContent = likes;
};

const closePopup = () => {
  photoModalElement.classList.add('hidden');
  body.classList.remove('modal-open');
  clearCommentList();
  clearListeners();
};

const showPhoto = (item) => {
  renderBigPhoto(item, photoModalElement);
  renderBigPhotoContext(item);
  renderComments(item.comments);
};

const openPopup = (photo) => {
  photoModalElement.classList.remove('hidden');
  body.classList.add('modal-open');
  showPhoto(photo);
  document.addEventListener('keydown',(evt)=> onDocumentKeydown(evt, closePopup));
  closeButton.addEventListener('click', closePopup);
};

const onPhotoClick = (evt, list) => {
  const choosenPhoto = evt.target.closest('.picture');
  if (choosenPhoto){
    evt.preventDefault();
    const photoData = list.find((i) => String(i.id) === String(choosenPhoto.dataset.photoId));
    openPopup(photoData);
  }
};

function clearListeners(){
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', closePopup);
  photoList.removeEventListener('click', onPhotoClick);
}

export const setPhotoPopupListener = (list) => {
  photoList.addEventListener('click', (evt) => onPhotoClick(evt, list));
};


