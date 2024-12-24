import cfg from './input/_data/cfg.json' assert { type: 'json' };
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import htmlnano from "htmlnano";
import buildTimestampFilter from "./filters/buildTimestamp.js";
import callFunctionFilter from "./filters/callFunction.js";
import cssMinFilter from "./filters/cssMin.js";
import dateDisplayFilter from "./filters/dateDisplay.js";
import getPageByPathFilter from "./filters/getPageByPath.js";
import getSiblingPageFilter from "./filters/getSiblingPage.js";
import httpUrlFilter from "./filters/httpUrl.js";
import jsMinFilter from "./filters/jsMin.js";
import modulusFilter from "./filters/modulus.js";
import pageTitleFilter from "./filters/pageTitle.js";
import postImageFilter from "./filters/postImage.js";
import removeIndexHtmlFilter from "./filters/removeIndexHtml.js";
import renderGalleryFilter from "./filters/renderGallery.js";
import renderPerfundoGalleryFilter from "./filters/renderPerfundoGallery.js";
import renderPerfundoGalleryLazySizesFilter from "./filters/renderPerfundoGalleryLazySizes.js";
import sectionFilter from "./filters/section.js";
import splitFilter from "./filters/split.js";
import squashFilter from "./filters/squash.js";
import timestampFilter from "./filters/timestamp.js";
import urlHelperFilter from "./filters/urlHelper.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
    const { pathPrefix } = cfg;

    eleventyConfig.addFilter("buildTimestamp", buildTimestampFilter);
    eleventyConfig.addFilter("callFunction", callFunctionFilter);
    eleventyConfig.addFilter("cssMin", cssMinFilter);
    eleventyConfig.addFilter("dateDisplay", dateDisplayFilter);
    eleventyConfig.addFilter("getPageByPath", getPageByPathFilter);
    eleventyConfig.addFilter("getSiblingPage", getSiblingPageFilter);
    eleventyConfig.addFilter("httpUrl", httpUrlFilter);
    eleventyConfig.addFilter("jsMin", jsMinFilter);
    eleventyConfig.addFilter("modulus", modulusFilter);
    eleventyConfig.addFilter("pageTitle", pageTitleFilter);
    eleventyConfig.addFilter("postImage", postImageFilter);
    eleventyConfig.addFilter("removeIndexHtml", removeIndexHtmlFilter);
    eleventyConfig.addFilter("renderGallery", renderGalleryFilter);
    eleventyConfig.addFilter("renderPerfundoGallery", renderPerfundoGalleryFilter);
    eleventyConfig.addFilter("renderPerfundoGalleryLazySizes", renderPerfundoGalleryLazySizesFilter);
    eleventyConfig.addFilter("section", sectionFilter);
    eleventyConfig.addFilter("split", splitFilter);
    eleventyConfig.addFilter("squash", squashFilter);
    eleventyConfig.addFilter("timestamp", timestampFilter);
    eleventyConfig.addFilter("urlHelper", urlHelperFilter);

    eleventyConfig.addShortcode("youtube", (youtubeId, width, aspectRatio, centered) => {
        let ratioValues = aspectRatio.split("/");
        let styles = [];

        let height = width / parseInt(ratioValues[0], 10) * parseInt(ratioValues[1], 10);

        if (centered) {
            styles.push("margin: 0 auto");
        }

        return `<div class="aspect-ratio" style="--aspect-ratio: ${aspectRatio}"><iframe class="youtube-player video video--youtube" style="width:${width}px;height:${height}px;${styles.join(';')}" src="https://www.youtube.com/embed/${youtubeId}/" width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    });

    eleventyConfig.addPassthroughCopy('assets/');
    eleventyConfig.addPassthroughCopy('_headers');
    eleventyConfig.addPassthroughCopy('favicon.png');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('static/img');

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPlugin(feedPlugin, {
        type: "atom",
        outputPath: "/feed.xml",
        collection: {
            name: "news", // iterate over `collections.posts`
            limit: 0,      // 0 means no limit
        },
        metadata: {
            language: "hu",
            title: "Kézművesovi",
            subtitle: "Kézműves Óvoda hírek",
            base: "https://kezmuvesovi.hu/",
            author: {
                name: "Roland Toth",
                email: "contact@rolandtoth.hu",
            }
        }
    });

    eleventyConfig.addCollection('menu', function (collection) {
        return collection.getFilteredByTag('menu').sort(function (a, b) {
            return a.data.menuOrder - b.data.menuOrder;
        });
    });

    eleventyConfig.addCollection('news', function (collection) {
        return collection
            .getFilteredByTag('news')
            .filter(function (item) {
                return (
                    item.data.date.getFullYear() >= new Date().getFullYear() - 1
                );
            })
            .sort(function (a, b) {
                return(b.data.date - a.data.date);
            });
    });

    eleventyConfig.addCollection('galleries', function (collection) {
        return collection
            .getFilteredByTag('gallery')
            .filter(function (item) {
                return item.data.active;
            })
            .reverse();
    });

    eleventyConfig.addTransform("htmlnano", async function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            return await htmlnano.process(content)
                .then(function (result) {
                    return result.html;
                })
        }
        return content;
    });

    let out = {
        dir: {
            input: 'input',
            data: '_data',
            output: 'dist',
            includes: 'includes',
        },
        templateFormats: ['njk', 'md'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: false,
        passthroughFileCopy: true,
    };

    if (pathPrefix) {
        out.pathPrefix = pathPrefix;
    }

    return out;
};
