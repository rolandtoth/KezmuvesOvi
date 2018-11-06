module.exports = function (index, modulus) {
  return (index - 1) % modulus + 1;
};