export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const createRandomIdFromRangeGenerator = (min, max) => {
  const idList = new Set();
  let sequentialId = min - 1;
  return function(){
    let tempId = getRandomInteger(min, max);
    if (idList.size >= (max - min + 1)) {
      sequentialId = (sequentialId + 1) > max ? min : sequentialId + 1;
      return sequentialId;
    }
    while (idList.has(tempId)) {
      tempId = getRandomInteger(min, max);
    }
    idList.add(tempId);
    return tempId;
  };
};

