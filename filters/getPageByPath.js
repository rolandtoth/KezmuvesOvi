export default function (path, collection) {
  let resultPage;

  for (var i = 0; i < collection.length; i++) {
    let p = collection[i],
      filename = p.template.fileSlug.filename;

    if (filename.indexOf(path) !== -1) {
      resultPage = collection[i];
      break;
    }
  }

  return resultPage;
};