let en = require("./translations.en.json");
let lt = require("./translations.lt.json");
let pt = require("./translations.pt.json");
let fr = require("./translations.fr.json");
let cn = require("./translations.cn.json");
let de = require("./translations.de.json");
let es = require("./translations.es.json");

const i18n = {
  defaultLang: "en",
  translations: {
    en: en.i18n,
    lt: lt.i18n,
    pt: pt.i18n,
    fr: fr.i18n,
    cn: cn.i18n,
    de: de.i18n,
    es: es.i18n,
  },
};

module.exports = i18n;
