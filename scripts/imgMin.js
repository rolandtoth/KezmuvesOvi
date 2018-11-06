const glob = require("glob");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

console.log(`
+--------------------+
| Starting imgMin... |
+--------------------+
`);

var args = process.argv.slice(2),
    dir = args.length ? args[0] : "*";

let dirs = [
    ...glob.sync("assets/images/gallery/" + dir + "/")
];

dirs.forEach((dir, index) => {
    (async () => {
        const files = await imagemin([dir + "*.{jpg,png}"], dir, {
            plugins: [
                imageminMozjpeg(),
                imageminJpegtran(),
                imageminPngquant({
                    quality: "65-80"
                })
            ]
        });

        console.log("Success: " + dir);

        if (index === dirs.length) {
            console.log(`
+------------------+
| imgMin complete. |
+------------------+
`);
        }
    })();
});