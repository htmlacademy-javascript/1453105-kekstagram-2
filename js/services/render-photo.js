const renderPhoto = ({id, url, description, likes, comments}, photoTemplate) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture').dataset.photoId = id;
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  return photoElement;
};

export const renderPhotoList = (photoList) => {
  const photoWrapper = document.querySelector('.pictures');
  photoWrapper.querySelectorAll('.picture').forEach((block) => block.remove());
  const photoTemplate = document.querySelector('#picture').content;
  const photoListFragment = document.createDocumentFragment();
  photoList.forEach((photo)=> {
    const photoItem = renderPhoto(photo, photoTemplate);
    photoListFragment.appendChild(photoItem);
  });
  photoWrapper.appendChild(photoListFragment);
};

export const renderBigPhoto = ({ url, description}, photoModalElement) => {
  const photo = photoModalElement.querySelector('.big-picture__img').querySelector('img');
  photo.src = url;
  photo.alt = description;
};
