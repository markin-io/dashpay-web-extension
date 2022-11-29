const duffsToDash = (duffsAmount: number, decimalPlaces = 8): number => {
  return duffsAmount / 10 ** decimalPlaces;
};

const formatMoney = (
  amount: number,
  decimalPlaces = 0,
  decimalSeparator = ','
): string => {
  if (decimalPlaces) {
    return amount.toFixed(decimalPlaces).replace('.', decimalSeparator);
  }
  return amount.toString().replace('.', decimalSeparator);
};

const formatSatoshis = (amount: number, decimalPlaces = 8): number => {
  const satoshiAmount = amount * 10 ** decimalPlaces;
  return Math.round(satoshiAmount);
};

const moneyFormatter = {
  formatSatoshis,
  duffsToDash,
  formatMoney,
};
export default moneyFormatter;
