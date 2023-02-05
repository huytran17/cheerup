const financialAverage = (array) => {
  const average =
    array.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
    array.length;
  console.log("----------average", average);
  return Number.parseFloat(average || 0).toFixed(2);
};

export default Object.freeze({
  financialAverage,
});

export { financialAverage };
