import cfg from "../input/_data/cfg.json" assert { type: "json" };

export default function (imageList) {
    const { gallery } = cfg;
    let markup = "",
        imgPrefix = "kep",
        thumbSuffix = `=w${gallery.thumb.width}-h${gallery.thumb.height}-c`,
        largeSuffix = `=w${gallery.large.width}-h${gallery.large.height}`,
        texts = {
            close: "Bezárás",
            prev: "Előző",
            next: "Következő"
        };

    if (imageList && imageList.length) {
        imageList.forEach((url, index) => {
            let thumb = url + thumbSuffix,
                largeImage = url + largeSuffix;

            markup += `<div class="perfundo">
        <a class="perfundo__link thumb" href="#${imgPrefix}${index+1}" style="background-image:url('${thumb}')"></a>
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