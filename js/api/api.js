export const getPhotoList = () => {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
  return fetch(url).then((response) =>{
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  });
};

export const postPhoto = async (photoData) => {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram';
  const response = await fetch(url, {
    method: 'POST',
    body: photoData
  });
  return await response.json();
};

