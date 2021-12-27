//TODO clean code https://codesandbox.io/s/gc4v2?file=/src/locales/index.ts
import { createI18n } from 'vue-i18n';
import camelCase from 'camelcase';

const LANGUAGES = ['en', 'fr'];

const messages = {};
const globalLocales = Object.fromEntries(
  Object.entries(import.meta.globEager('./*.yaml')).map(([key, value]) => {
    return [key.slice(9, -5), value.default];
  }),
);

const domainLocaleFiles = import.meta.globEager('../modules/**/locale.ts');
const domainLocales = {};

for (const path in domainLocaleFiles) {
  for (const key in domainLocaleFiles[path]) {
    // @ts-ignore
    domainLocales[key] = domainLocaleFiles[path][key];
  }
}

LANGUAGES.forEach((language) => {
  // @ts-ignore
  messages[language] = {
    ...globalLocales[language],
  };

  for (const key in domainLocales) {
    const regLanguage = new RegExp(`${camelCase(language, { pascalCase: true })}$`, 'g');
    const module = key.replace(camelCase(language, { pascalCase: true }), '');

    if (regLanguage.test(key)) {
      // @ts-ignore
      messages[language][module] = domainLocales[key];
    }
  }
});

const locales = createI18n({
  legacy: false,
  locale: 'fr',
  globalInjection: true,
  messages,
});

export default locales;
