const isValidLengthString = (inputString, lengthString) => inputString.length <= lengthString;

const isPalindrome = (inputString) => {
  const tempString = inputString.toLowerCase().trim().replace(/\s+/g, '');
  const reverseString = tempString.split('').reverse().join('');
  return reverseString === tempString;
};

const turnToInteger = (inputValue) => {
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

const isMeetingWillBe = (startDay, endDay, meetingTime, meetingDuration) => {
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

isValidLengthString('проверяемая строка', 20);
isPalindrome('Гни комсомол лом о смокинг');
turnToInteger('1 кефир, 0.5 батона');
isMeetingWillBe('08:00', '17:00', '14:00', 90);
