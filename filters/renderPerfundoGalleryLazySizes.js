const cfg = require("../input/data/cfg.json");

module.exports = function (imageList) {

    var markup = "",
        imgPrefix = "kep",
        thumbSuffix = `=w${cfg.gallery.thumb.width}-h${cfg.gallery.thumb.height}-c`,
        largeSuffix = `=w${cfg.gallery.large.width}-h${cfg.gallery.large.height}`,
        texts = {
            close: "Bezárás",
            prev: "Előző",
            next: "Következő"
        };

    if (imageList && imageList.length) {

        imageList.forEach((url, index) => {

            var thumb = url + thumbSuffix,
                largeImage = url + largeSuffix;

            markup += `<div class="perfundo">
        <a class="perfundo__link" href="#${imgPrefix}${index+1}">
            <img src="${thumb}" loading="lazy" width="`${cfg.gallery.thumb.width}`" height="`${cfg.gallery.thumb.height}`" alt=""/>
        </a>
        <div id="${imgPrefix}${index+1}" class="perfundo__overlay">
            <figure class="perfundo__content perfundo__figure">
                <div class="perfundo__image" style="background-image:url('${largeImage}')"></div>
            </figure>
            <a class="perfundo__close perfundo__control" href="###">${texts.close}</a>
            <a class="perfundo__next perfundo__control" href="#${imgPrefix}${index+2}">${texts.next}</a>
            <a class="perfundo__prev perfundo__control" href="#${imgPrefix}${index}">${texts.prev}</a>
        </div>
    </div>`;
        });
    }

    return markup;
};
