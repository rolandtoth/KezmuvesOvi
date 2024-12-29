import { createRequire } from "module";

const require = createRequire(import.meta.url);
const cfg = require("../input/_data/cfg.json");

export default function (title) {
    const { siteName, slogan } = cfg;
    let pageTitle;

    if (title) {
        pageTitle = title + " - " + siteName;
    } else if (slogan) {
        pageTitle = siteName + " - " + slogan;
    } else {
        pageTitle = siteName;
    }

    return pageTitle;
};