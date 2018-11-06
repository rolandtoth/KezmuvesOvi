/**
 *
 */
module.exports = function (name, directory, suffix = "") {
    let filename = suffix === "" ? name : name.replace('.', `-${suffix}.`);

    return `/assets/images/${directory}/${filename}`;
};