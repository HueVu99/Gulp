export const isValidABN = (abn = '') => {
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let weightedSum = 0;
  const value = abn.trim().replace(/\s/g, '');
  if (!value) {
    return true;
  }
  if (!value.match(/^\d{11}/)) {
    return false;
  }
  weights.forEach((weight, index) => {
    weightedSum += (+value[index] - (index === 0 ? 1 : 0)) * weight;
  });

  return weightedSum % 89 === 0;
};
