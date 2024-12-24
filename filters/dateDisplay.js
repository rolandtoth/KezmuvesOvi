/*
A date formatter filter for Nunjucks
*/
export default function (date, part) {
  if (!(date instanceof Date)) {
    date = (date === "now") ? new Date() : new Date(date)
  }

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
    return date.getUTCFullYear()
  } else if (part === 'timestamp') {
    return Date.parse(date)
  } else if (part === 'toISOString') {
    return new Date(date).toISOString()
  } else if (part === 'dateAndDay') {
    return `${date.getUTCFullYear()}. ${months[date.getMonth()]} ${date.getDate()}. (${days[date.getDay()]})`
  } else {
    return `${date.getUTCFullYear()}. ${months[date.getMonth()]} ${date.getDate()}.`
  }
}