import cfg from "../input/_data/cfg.json" assert { type: "json" };

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