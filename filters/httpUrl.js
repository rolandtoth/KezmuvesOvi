import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cfg = require("../input/_data/cfg.json");

export default function (path, encode = false) {
    const { domain } = cfg;
    if (encode) {
        path = encodeURIComponent(path);
    }

    return `${domain}${path}`;
};