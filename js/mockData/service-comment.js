import {NAME_LIST} from './const';
import {createRandomIdFromRangeGenerator, getRandomInteger} from './service';
import {generateMessage} from './service-message';

const generateCommentId = createRandomIdFromRangeGenerator(1, 30);

export const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: NAME_LIST[getRandomInteger(0, NAME_LIST.length - 1)]
});


