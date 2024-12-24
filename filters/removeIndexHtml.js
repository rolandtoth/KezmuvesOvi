/*
 * Remove index.html from an url
 */
export default function (url) {
  return url.replace('index.html', '');
};