import {descriptionInput, hashTagInput} from './services/validate-form';

export const isValidLengthString = (inputString, lengthString) => inputString.length <= lengthString;

export const isPalindrome = (inputString) => {
  const tempString = inputString.toLowerCase().trim().replace(/\s+/g, '');
  const reverseString = tempString.split('').reverse().join('');
  return reverseString === tempString;
};

export const turnToInteger = (inputValue) => {
  if (inputValue.length < 1) {
    return NaN;
  }
  const tempValue = inputValue.toString().replace(/\s+/g, '').split('');
  const tempResult = tempValue.filter((i) => !Number.isNaN(+i)).join('');
  return tempResult.length < 1 ? NaN : +tempResult;
};

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

const timeToMilliseconds = (time) => {
  const hours = time.split(':').map((i) => +i);
  return new Date(2025, 1,1, hours[0], hours[1], 0).getTime();
};

export const isMeetingWillBe = (startDay, endDay, meetingTime, meetingDuration) => {
  const startWorkDay = timeToMilliseconds(startDay);
  const endWorkDay = timeToMilliseconds(endDay);
  const startMeeting = timeToMilliseconds(meetingTime);
  const durationInHours = toHoursAndMinutes(meetingDuration);
  const tempMeetingStartTime = meetingTime.split(':').map((i) => +i);
  const endMeetingHours = durationInHours.hours + tempMeetingStartTime[0];
  const endMeetingMinutes = durationInHours.minutes + tempMeetingStartTime[1];
  const endMeeting = timeToMilliseconds(`${endMeetingHours}:${endMeetingMinutes}`);
  return startWorkDay <= startMeeting && endMeeting <= endWorkDay;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const onDocumentKeydown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashTagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      cb();
    }
  }
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
