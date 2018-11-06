var scriptsDir = document.body.getAttribute("data-root") + "/assets/scripts/";

document.addEventListener("DOMContentLoaded", function () {

    loadAsset(scriptsDir + 'baguetteBox/baguetteBox.min.css?selector=".gallery"&async=true', function () {

        var selector = this.selector;

        loadAsset(scriptsDir + 'baguetteBox/baguetteBox.min.js?async=true', function () {
            baguetteBox.run(selector, {
                'animation': 'slideIn',
                'async': true,
                'fullScreen': false,
                'noScrollbars': false
            });
        });
    });

});

function loadAsset(path, callback, o) {
    var selector = getUrlParameter('selector', path).replace(/['"]+/g, '').trim(),
        async = getUrlParameter('async', path) === 'true',
            assetType = 'js',
            assetTag = 'script',
            assetSrc = 'src',
            needAsset = true;

    if (selector.length > 0 && !document.querySelector(selector)) return false;

    function getUrlParameter(name, url) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        url = url ? url : window.location.search;

        // var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        var regex = new RegExp('[\\?&]' + name + '=([^&]*)'),
            results = regex.exec(url);

        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    path = path.split(/\?(.+)/)[0]; // remove url parameters (settings)

    if (path.slice(-3) === 'css') {
        assetType = 'css';
        assetTag = 'link';
        assetSrc = 'href';
    }

    if (document.querySelector(assetTag + '[' + assetSrc + '="' + path + '"]')) needAsset = false;

    function callCallback() {
        if (callback) {
            var obj = {};
            if (selector) obj.selector = selector;
            if (o) obj.o = o;
            callback.call(obj);
        }
    }

    if (needAsset) {

        var asset = document.createElement(assetTag);
        asset[assetSrc] = path;

        if (assetType === 'js') {
            asset.type = "text/javascript";
            asset.async = async;

            if (asset.readyState) { // IE
                asset.onreadystatechange = function () {
                    if (asset.readyState === "loaded" || asset.readyState === "complete") {
                        asset.onreadystatechange = null;
                        callCallback();
                    }
                };
            } else { // others
                asset.onload = callCallback;
            }

        } else { // CSS
            asset.rel = "stylesheet";
            callCallback();
        }
        document.getElementsByTagName("head")[0].appendChild(asset);

    } else { // always run callback
        callCallback();
    }
}