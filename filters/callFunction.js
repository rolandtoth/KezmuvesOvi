module.exports = function (data, funcName) {

    if (typeof global[funcName] === "function") {
        return global[funcName](data);
    }

    return data;
};