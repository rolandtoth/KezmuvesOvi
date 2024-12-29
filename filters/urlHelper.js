import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cfg = require("../input/_data/cfg.json");

export default function(path, type = false) {
    const { urls } = cfg;
    if (type) {
        path = urls.images + "/" + path;
    }

    return path | url | buildTimestamp;
};
