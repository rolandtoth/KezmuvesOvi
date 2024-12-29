export default function initials(name) {
  if (!name) {
    return '';
  }

  if (name.includes(' ')) {
    return name
      .split(' ')
      ?.map((x) => x[0])
      ?.join('')
      ?.toUpperCase();
  }

  return name[0]?.toUpperCase();
}
