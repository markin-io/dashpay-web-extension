const formatDuffs = (
  duffsAmount: number,
  decimalPlaces = 8,
  decimalSeparator = ','
): string => {
  const dashAmount = duffsAmount / 10 ** decimalPlaces;
  return dashAmount.toString().replace('.', decimalSeparator);
};

const formatSatoshis = (amount: number, decimalPlaces = 8): number => {
  const satoshiAmount = amount * 10 ** decimalPlaces;
  return Math.round(satoshiAmount);
};

const moneyFormatter = {
  formatDuffs,
  formatSatoshis,
};
export default moneyFormatter;
