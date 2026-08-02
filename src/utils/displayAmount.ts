import currency from 'currency.js';

const displayAmount = (amount: number) =>
  currency(amount, {
    symbol: '₽',
    pattern: '# !',
    separator: ' ',
    decimal: ',',
  }).format();

export default displayAmount;
