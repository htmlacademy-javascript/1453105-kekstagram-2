import {MESSAGE_LIST} from './const';
import {getRandomInteger} from './service';

export const generateMessage = () => {
  let message = '';
  let numberOfMessages = 0;
  numberOfMessages = getRandomInteger(1, 2);
  for (let i = 0; i < numberOfMessages; i++) {
    message += MESSAGE_LIST[getRandomInteger(0, MESSAGE_LIST.length - 1)];
  }
  return message;
};
