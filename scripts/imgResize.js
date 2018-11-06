const cfg = require("../input/data/cfg.json");
const glob = require("glob");
const mkdirp = require('mkdirp');
const sharp = require("sharp");
const path = require("path");
const sizeOf = require("image-size");

console.log(`
+-----------------------+
| Starting imgResize... |
+-----------------------+
`);

// glob("src/images/gallery/*/*.*(jpg|png)", null, function (er, files) {
//     resizeImages(files, cfg.gallery.large);
//     resizeImages(files, cfg.gallery.thumb);
// });

var args = process.argv.slice(2),
    dir = args.length ? args[0] : "*",
    files = glob.sync("src/images/gallery/" + dir + "/*.*(jpg|png)");

resizeImages(files, cfg.gallery.large);
resizeImages(files, cfg.gallery.thumb);

function resizeImages(files, dimensions) {

    var width = dimensions.width,
        height = dimensions.height,
        suffix = dimensions.suffix ? "-" + dimensions.suffix : "";

    files.forEach(function (file, index) {
        (async () => {
            var extension = path.extname(file),
                outFile,
                dir;

            outFile = file
                .replace(extension, suffix + extension)
                .replace('src/', 'assets/');

            dir = path.dirname(outFile);

            // delete dir to cleanup
            // del.sync([dir + "*.*"], {
            // force: true
            // });

            mkdirp.sync(dir, function (err) {
                if (err) {
                    console.error(err);
                }
            });

            await sharp(file)
                .resize(width, height, {
                    kernel: sharp.kernel.lanczos3
                })
                .withoutEnlargement()
                .crop("northeast")
                .toFile(outFile)
                .then(() => {
                    let dimensions = sizeOf(outFile);
                    console.log(`Success ${dimensions.width}x${dimensions.height}: ${file} -> ${outFile}`);
                });

        })();
    });
}