import {DESCRIPTION_LIST} from './const';
import {createRandomIdFromRangeGenerator, getRandomInteger} from './service';
import {generateComment} from './service-comment';

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoPath = createRandomIdFromRangeGenerator(1, 25);
const generateDescription = createRandomIdFromRangeGenerator(0, 24);

export const createPhoto = () => {
  const numberOfComments = getRandomInteger(0, 30);
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoPath()}.jpg`,
    description: DESCRIPTION_LIST[generateDescription()],
    likes: getRandomInteger(15, 200),
    comments: () => Array.from({length: numberOfComments }, generateComment),
  };
};
