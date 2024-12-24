import cfg from "../input/_data/cfg.json" assert { type: "json" };
import { sync } from "glob";

export default function (dirname) {
    let { pathPrefix, transparentPlaceholder, gallery } = cfg;
    let thumbs = sync(`assets/images/gallery/${dirname}/*-thumb.*`),
        markup = "";

    pathPrefix = pathPrefix || "/";

    if (thumbs) {
        thumbs.forEach(thumb => {
            let _thumb = pathPrefix + thumb;
            let largeImage = _thumb.replace("-thumb.", ".");
            markup += `<a href="${largeImage}" target="_blank"><img src="${
                transparentPlaceholder
            }" data-src="${_thumb}" width="${
                gallery.thumb.width
            }" height="${
                gallery.thumb.height
            }" alt="" class="lazyload"/></a>`;
        });
    }

    return markup;
};