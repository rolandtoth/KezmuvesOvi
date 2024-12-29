const COLOR_MAP = [
  '#6A2A28',
  '#542B33',
  '#53372C',
  '#48523A',
  '#225B4A',
  '#336F56',
  '#3B6535',
  '#4F6034',
  '#315288',
  '#4C516F',
  '#314452',
  '#2D4762',
  '#3B2941',
  '#422D3C',
  '#402E3C',
];

export default function (str) {
  return str
      ? COLOR_MAP[
          stringToIndex(str, COLOR_MAP.length)
        ]
      : COLOR_MAP[0];
};

function stringToIndex(str, max = 36) {
  let sum = 0;

  for (var i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum % max;
}
