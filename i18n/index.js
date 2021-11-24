let en = require('./translations.en.json');
let lt = require('./translations.lt.json');

const i18n = {
	defaultLang: 'en',
	translations: {
		en: en.i18n,
		lt: lt.i18n,
	},
}

module.exports = i18n;