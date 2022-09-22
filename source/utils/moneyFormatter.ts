const formatDuffs = (
  duffsAmount: number,
  decimalPlaces = 8,
  decimalSeparator = ','
): string => {
  const dashAmount = duffsAmount / 10 ** decimalPlaces;
  return dashAmount.toString().replace('.', decimalSeparator);
};

const moneyFormatter = {
  formatDuffs,
};
export default moneyFormatter;
