const getVideoId = require('get-video-id');
const videoThumbnailUrl = require('video-thumbnail-url');
const download = require('image-downloader');
const fs = require('fs');

module.exports = function (url) {

    var id, service, imgFile, thumb = "",
        videoData = {};

    if (url.constructor === Array) {
        videoData.service = url[0];
        videoData.id = url[1];
        thumb = getFacebookVideoId(url[1]);
    } else {
        videoData = getVideoId(url);
    }

    if (videoData && videoData.id && videoData.service) {
        id = videoData.id;
        service = videoData.service;
    } else {
        return "";
    }

    imgFile = 'assets/images/video-thumbs/' + service + '-' + (thumb ? thumb : id) + '.jpg';

    if (!fs.existsSync(imgFile)) {
        videoThumbnailUrl(url).then(thumb_url => { // thumb_url is  url or null

            if (thumb_url) {
                var options = {
                    url: thumb_url,
                    dest: imgFile // Save to /path/to/dest/photo.jpg
                }

                download.image(options)
                    .then(({
                        filename,
                        image
                    }) => {
                        console.log('Video thumb saved to', filename)
                    })
                    .catch((err) => {
                        console.error(err)
                    });
            }
        });
    }

    if (thumb) {
        thumb = ` data-video-thumb="${thumb}"`;
    }

    return `<div class="video-player-wrap"><div class="video-player" data-video-id="${id}" data-video-service="${service}"${thumb}></div></div>`;
};

function getFacebookVideoId(path) {
    path = unescape(path);

    if (path.substr(-1) === '/') {
        path = path.substr(0, path.length - 1);
    }

    return unescape(path).split("/").pop();
}