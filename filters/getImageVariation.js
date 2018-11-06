module.exports = function (name, suffix) {
    return suffix === "" ? name : name.replace('.', `-${suffix}.`);
};