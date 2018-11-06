const cfg = require("../input/data/cfg.json");

module.exports = function(path, type = false) {
    if (type) {
        path = cfg.urls.images + "/" + path;
    }

    return path | url | buildTimestamp;
};
