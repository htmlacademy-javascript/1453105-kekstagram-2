export const getPhotoList = () => {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
  return fetch(url).then((response) => response.ok ? response.json() : Promise.reject());
};

export const postPhoto = async (photoData) => {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram';
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: photoData
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();

  } catch (error) {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  }
};

