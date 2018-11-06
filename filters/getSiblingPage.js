module.exports = function (path, collection, sibling = "next") {
  var index, siblingPage;

  for (var i = 0; i < collection.length; i++) {
    var p = collection[i];
    if (path.indexOf(p.template.fileSlug.inputPath) !== -1) {
      index = i;
      break;
    }
  }

  if (sibling === "next") {
    siblingPage = collection[index === collection.length - 1 ? 0 : index + 1];
    // console.log("NEXT " + siblingPage.inputPath);
  } else {
    siblingPage = collection[index === 0 ? collection.length - 1 : index - 1];
    // console.log("PREV " + siblingPage.inputPath);
  }

  // console.log(siblingPage.url);
  // console.log(siblingPage.data.title);

  return siblingPage;
};