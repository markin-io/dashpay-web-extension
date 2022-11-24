const duffsToDash = (duffsAmount: number): number => {
  const power = 10 ** 8;
  const rounded = Math.round(duffsAmount * power) / power;
  return rounded / power;
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
