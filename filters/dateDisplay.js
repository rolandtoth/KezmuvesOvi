/*
A date formatter filter for Nunjucks
*/
module.exports = function (date, part) {

  var d = (date === "now") ? new Date() : new Date(date);

  if (part === 'year') {
    return d.getUTCFullYear();
  } else if (part === 'timestamp') {
    return Date.parse(date);
  } else if (part === 'toISOString') {
    return new Date(date).toISOString();
  } else {
    var month = [
      "január",
      "február",
      "március",
      "április",
      "május",
      "június",
      "július",
      "augusztus",
      "szeptember",
      "október",
      "november",
      "december"
    ];
    return `${d.getUTCFullYear()}. ${month[d.getMonth()]} ${d.getDate()}.`;
  }
};