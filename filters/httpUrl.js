import cfg from "../input/_data/cfg.json" assert { type: "json" };

export default function (path, encode = false) {
    const { domain } = cfg;
    if (encode) {
        path = encodeURIComponent(path);
    }

    return `${domain}${path}`;
};