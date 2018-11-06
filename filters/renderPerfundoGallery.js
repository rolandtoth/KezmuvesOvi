const cfg = require("../input/data/cfg.json");
const glob = require("glob");
const sizeOf = require("image-size");

module.exports = function (dirname) {

    var thumbs = glob.sync(`assets/images/gallery/${dirname}/*-thumb.*`),
        pathPrefix = cfg.pathPrefix || "/",
        markup = "",
        counter = 1,
        // batchSize = 6,
        imgPrefix = "kep",
        texts = {
            close: "Bezárás",
            prev: "Előző",
            next: "Következő"
        };

    if (thumbs) {
        thumbs.forEach((thumb, index) => {

            var _thumb = pathPrefix + thumb,
                largeImage = _thumb.replace('-thumb.', '.'),
                // showBatchSeparator = index > 0 && (index % batchSize === 0),
                // dimensions = getImageDimensions(largeImage.replace(cfg.pathPrefix, "")),
                // ratio = (dimensions.height / dimensions.width * 100).toFixed(2),
                alt = "";

            // if (showBatchSeparator) {
            //     if (index > batchSize) {
            //         markup += '</div>';
            //     }
            //     markup += '<div class="lazybatch">';
            // }

            markup += `<div class="perfundo">
    <a class="perfundo__link" href="#${imgPrefix}${counter}">
        <img src="${_thumb}" alt="${alt}">
    </a>
    <div id="${imgPrefix}${counter}" class="perfundo__overlay">
        <figure class="perfundo__content perfundo__figure">
            <div class="perfundo__image" style="background-image:url(${largeImage})"></div>
        </figure>
        <a class="perfundo__close perfundo__control" href="###">${texts.close}</a>
        <a class="perfundo__next perfundo__control" href="#${imgPrefix}${counter+1}">${texts.next}</a>
        <a class="perfundo__prev perfundo__control" href="#${imgPrefix}${counter-1}">${texts.prev}</a>
    </div>
</div>`;

            counter++;
        });
    }

    // if (thumbs.count > batchSize) {
    //     markup += '</div>';
    // }

    return markup;
};

function getImageDimensions(path) {
    if (path.charAt(0) === '/') {
        path = path.substr(1);
    }

    return sizeOf(path);
};