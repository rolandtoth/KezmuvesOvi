/*
  A timestamp for Nunjucks
*/
export default function(date) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const ordinal = {
    1 : "st",
    2 : "nd",
    3 : "rd",
    21 : "st",
    22 : "nd",
    23 : "rd",
    31 : "st"
  };

  const d = new Date();

  return `${month[d.getMonth()]} ${d.getDate()}${(ordinal[d.getDate()] || "th")} ${d.getUTCFullYear()}, at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}
