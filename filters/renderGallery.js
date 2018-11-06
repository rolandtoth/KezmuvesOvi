const cfg = require("../input/data/cfg.json");
const glob = require("glob");

module.exports = function (dirname) {
    var thumbs = glob.sync(`assets/images/gallery/${dirname}/*-thumb.*`),
        pathPrefix = cfg.pathPrefix || "/",
        markup = "";

    if (thumbs) {
        thumbs.forEach(thumb => {
            var _thumb = pathPrefix + thumb;
            let largeImage = _thumb.replace("-thumb.", ".");
            markup += `<a href="${largeImage}" target="_blank"><img src="${
                cfg.transparentPlaceholder
            }" data-src="${_thumb}" width="${
                cfg.gallery.thumb.width
            }" height="${
                cfg.gallery.thumb.height
            }" alt="" class="lazyload"/></a>`;
        });
    }

    return markup;
};