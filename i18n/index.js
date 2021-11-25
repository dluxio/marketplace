let en = require('./translations.en.json');
let lt = require('./translations.lt.json');
let pt = require('./translations.pt.json');

const i18n = {
	defaultLang: 'en',
	translations: {
		en: en.i18n,
		lt: lt.i18n,
		pt: pt.i18n
	},
}

module.exports = i18n;