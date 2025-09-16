export const getPhotoList = () => {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
  return fetch(url).then((response) => response.ok ? response.json() : Promise.reject());
};

export const postPhoto = async (photoData) => {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram1';
  const response = await fetch(url, {
    method: 'POST',
    body: photoData
  });
  return await response.json();
};

