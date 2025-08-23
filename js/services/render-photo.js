const renderPhoto = ({url, description, likes, comments}, photoTemplate) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  return photoElement;
};

export const renderPhotoList = (photoList) => {
  const photoWrapper = document.querySelector('.pictures');
  const photoTemplate = document.querySelector('#picture').content;
  const photoListFragment = document.createDocumentFragment();
  photoList.forEach((photo)=> {
    const photoItem = renderPhoto(photo, photoTemplate);
    photoListFragment.appendChild(photoItem);
  });
  photoWrapper.appendChild(photoListFragment);
};

