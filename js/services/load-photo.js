const uploadImgForm = document.querySelector('.img-upload__form');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const preImageList = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const loadImage = (evt) => {
  if (!evt.target.files) {
    return;
  }
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((img) => fileName.endsWith(img));
  if (!matches) {
    return;
  }
  if (matches) {
    const url = URL.createObjectURL(file);
    imagePreview.src = url;
    preImageList.forEach((el) => {
      el.style.backgroundImage = `url(${url})`;
    });
  }
};


export const fileInputListener = () => {
  uploadImgForm.addEventListener('change', (evt) => loadImage(evt));
};
export const removeFileInputListener = () => {
  uploadImgForm.removeEventListener('change', loadImage);
};

