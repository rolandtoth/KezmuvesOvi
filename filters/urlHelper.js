import cfg from "../input/_data/cfg.json" assert { type: "json" };

export default function(path, type = false) {
    const { urls } = cfg;
    if (type) {
        path = urls.images + "/" + path;
    }

    return path | url | buildTimestamp;
};
