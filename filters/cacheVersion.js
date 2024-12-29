import cfgDynamic from "../input/_data/cfgDynamic.js";

export default (url) => `${url}?v=${cfgDynamic().version}`;