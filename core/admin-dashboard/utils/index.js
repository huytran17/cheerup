const financialAverage = (array) => {
  const average =
    array.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
    array.length;

  return Number.parseFloat(average || 0).toFixed(2);
};

const kFormatter = (number) => {
  return Math.abs(number) > 999
    ? Math.sign(number) * (Math.abs(number) / 1000).toFixed(1) + "k"
    : Math.sign(number) * Math.abs(number);
};

export default Object.freeze({
  financialAverage,
  kFormatter,
});

export { financialAverage, kFormatter };
