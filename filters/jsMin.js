import { minify } from "uglify-js";

export default function (code) {
    let minified = minify(code);

    if (minified.error) {
        console.log("UglifyJS error: ", minified.error);
        return code;
    }

    return minified.code;
}