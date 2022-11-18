const formatDash = (duffsAmount: number, decimalPlaces = 8): number => {
  return duffsAmount / 10 ** decimalPlaces;
};

const formatMoneyToString = (
  amount: number,
  len = 0,
  decimalSeparator = ','
): string => {
  if (len) {
    return amount.toFixed(2).replace('.', decimalSeparator);
  }
  return amount.toString().replace('.', decimalSeparator);
};

const formatSatoshis = (amount: number, decimalPlaces = 8): number => {
  const satoshiAmount = amount * 10 ** decimalPlaces;
  return Math.round(satoshiAmount);
};

const moneyFormatter = {
  formatSatoshis,
  formatDash,
  formatMoneyToString,
};
export default moneyFormatter;
