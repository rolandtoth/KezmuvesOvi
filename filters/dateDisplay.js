/*
A date formatter filter for Nunjucks
*/
module.exports = function (date, part) {

  const d = (date === "now") ? new Date() : new Date(date)

  const months = [
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
  ]

  const days = [
    "vasárnap",
    "hétfő",
    "kedd",
    "szerda",
    "csütörtök",
    "péntek",
    "szombat"
  ]

  if (part === 'year') {
    return d.getUTCFullYear()
  } else if (part === 'timestamp') {
    return Date.parse(date)
  } else if (part === 'toISOString') {
    return new Date(date).toISOString()
  } else if (part === 'dateAndDay') {
    return `${d.getUTCFullYear()}. ${months[d.getMonth()]} ${d.getDate()}. (${days[d.getDay()]})`
  } else {
    return `${d.getUTCFullYear()}. ${months[d.getMonth()]} ${d.getDate()}.`
  }
}