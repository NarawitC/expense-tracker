function formatThaiCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
    currencyDisplay: 'narrowSymbol',
  }).format(value);
}
export { formatThaiCurrency };
