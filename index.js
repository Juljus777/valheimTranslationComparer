import {oldTranslations} from "./oldTranslations.js";
import {translations_0_218_15} from "./ashlandsTranslations.js";
import {translations_0_217_46} from "./newTranslations.js";
import {translations_1_0_0} from "./releaseTranslations.js";

/**
 * Translations are extracted from
 * https://valheim-modding.github.io/Jotunn/data/localization/translations/English.html
 * @param {HTMLTableElement[]} tables
 */
const extractTranslationsFromTable = (tables) => {
	let translations = {};

	for (const table of tables) {
		const rows = table.querySelectorAll("tbody tr");
		for (const row of rows) {
			const columns = Array.from(row.querySelectorAll("td"));
			const [key, text] = columns.map(column => column.innerText);
			translations[key] = text;
		}
	}

	console.log(translations);
}


/**
 * Was used to transform traslations from unprefixed to prefixed version.
 * Not necessary anymore.
 * getNewTranslationObject(oldTranslations, translations_0_218_15);
 *
 * @param oldVersion
 * @param newVersion
 */
const getNewTranslationObject = (oldVersion, newVersion) => {
	const objectToTranslate = {};
	const newBaseTranslationKeys = Object.keys(newVersion);
	const oldTranslationKeys = Object.keys(oldVersion);

	const newTranslationKeys = newBaseTranslationKeys.filter(key => {
		key = key.replace(key.charAt(0), "");
		return !oldTranslationKeys.includes(key);
	});

	newTranslationKeys.forEach(key => {
		objectToTranslate[key.replace(key.charAt(0), "")] = newVersion[key];
	});

	console.log("Object to translate: ", objectToTranslate);
}

const getChangedTranslations = (oldVersion, newVersion) => {
	const changedValues = {};
	const removedValues = [];
	
	const oldTranslationKeys = Object.keys(oldVersion);

	oldTranslationKeys.forEach(key => {
		if (oldVersion[key] !== newVersion[key]) {
			if (newVersion[key] === undefined) {
				removedValues.push(key);
			} else {
				changedValues[key] = {
					old: oldVersion[key],
					new: newVersion[key]
				}	
			}
		}
	});

	console.log("Changed descriptions: ", changedValues);
	console.log("Removed descriptions: ", removedValues);
}

const versionNames = ["translations_0_217_46", "translations_0_218_15", "translations_1_0_0"]
const translationObjectsByVersion = [translations_0_217_46, translations_0_218_15, translations_1_0_0]

const getTranslationsByVersions = () => {
	for (let i = 0; i < translationObjectsByVersion.length; i++) {
		if (i === 0) {
			console.log("BASE VERSION: ", versionNames[i]);
		}

		if (!versionNames[i + 1]) break;

		console.log("VERSION: ", versionNames[i + 1]);
		getChangedTranslations(translationObjectsByVersion[i], translationObjectsByVersion[i + 1]);
	}
}

getTranslationsByVersions();
