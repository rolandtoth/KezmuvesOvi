module.exports = function (path, collection) {
  var resultPage;

  for (var i = 0; i < collection.length; i++) {
    var p = collection[i],
      filename = p.template.fileSlug.filename;

    if (filename.indexOf(path) !== -1) {
      resultPage = collection[i];
      break;
    }
  }

  return resultPage;
};