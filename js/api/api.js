const url = 'https://31.javascript.htmlacademy.pro/kekstagram';

export const getPhotoList = () => fetch(`${url}/data`).then((response) => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
});

export const postPhoto = async (photoData) => {
  const response = await fetch(url, {
    method: 'POST',
    body: photoData
  });
  return await response.json();
};

