export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const createRandomIdFromRangeGenerator = (min, max) => {
  const idList = new Set();
  return function(){
    let tempId = getRandomInteger(min, max);
    while (idList.has(tempId)) {
      tempId = getRandomInteger(min, max);
    }
    idList.add(tempId);
    return tempId;
  };
};

