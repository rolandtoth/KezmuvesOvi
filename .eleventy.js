/*
TODO
- image dimensions?
- add images to Miért hozzánk? page
*/
const htmlmin = require('html-minifier');
const glob = require('glob');
const cfg = require('./input/data/cfg.json');
const path = require('path');

module.exports = function (eleventyConfig) {
    let out = {};

    glob.sync('./filters/*.js').forEach((filePath) => {
        let pathInfo = path.parse(filePath);
        eleventyConfig.addFilter(
            pathInfo.base.replace(pathInfo.ext, ''),
            require(filePath)
        );
    });

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

    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (outputPath.endsWith('.html')) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false,
            });
            return minified;
        }
        return content;
    });

    out = {
        dir: {
            input: 'input',
            data: 'data',
            output: 'dist',
            includes: 'includes',
        },
        templateFormats: ['njk', 'md'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: false,
        passthroughFileCopy: true,
    };

    if (cfg.pathPrefix) {
        out.pathPrefix = cfg.pathPrefix;
    }

    return out;
};
