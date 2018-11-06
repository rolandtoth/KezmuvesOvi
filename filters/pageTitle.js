const cfg = require("../input/data/cfg.json");

module.exports = function (title) {
    let pageTitle;

    if (title) {
        pageTitle = title + " - " + cfg.siteName;
    } else if (cfg.slogan) {
        pageTitle = cfg.siteName + " - " + cfg.slogan;
    } else {
        pageTitle = cfg.siteName;
    }

    return pageTitle;
};