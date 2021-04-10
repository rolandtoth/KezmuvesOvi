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
