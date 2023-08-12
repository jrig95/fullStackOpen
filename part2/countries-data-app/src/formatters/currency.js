function formatNumber(amount = 0) {
  return new Intl.NumberFormat("en-US").format(amount);
}

module.exports = { formatNumber };
