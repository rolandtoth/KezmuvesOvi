/*
 * Remove index.html from an url
 */
module.exports = function (url) {
  return url.replace('index.html', '');
};