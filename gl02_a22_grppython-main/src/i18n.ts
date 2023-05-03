import fr from "./locales/fr";
import en from "./locales/en";
import config from "./config";

const locales = {
  fr,
  en,
};

const fallbackLocale = "fr";
export const avaiableLocales = ["fr", "en"];

type MainSchema = typeof locales.fr;

type BreakDownObject<O, R = void> = {
  [K in keyof O as string]: K extends string ? (R extends string ? ObjectDotNotation<O[K], `${R}.${K}`> : ObjectDotNotation<O[K], K>) : never;
};

type ObjectDotNotation<O, R = void> = O extends string | number | Function ? (R extends string ? R : never) : BreakDownObject<O, R>[keyof BreakDownObject<O, R>];

export function i(ref: ObjectDotNotation<MainSchema>, ...args) {
  const translation = objectNotationToText(ref) ?? objectNotationToText(ref, fallbackLocale) ?? fallbackText();

  return typeof translation === "function" ? translation(...args) : translation;
}

function fallbackText() {
  return locales[config.locale].$fallback ?? locales[fallbackLocale].$fallback ?? "Error";
}

function objectNotationToText(ref: string, locale: string = config.locale) {
  if (ref) {
    const translation = ref.split(".").reduce((o, i) => o[i] ?? {}, locales[config.locale]);

    return !isEmptyObject(translation) ? translation : null;
  }
  return null;
}

function isEmptyObject(object: object) {
  return typeof object === "object" && Object.keys(object).length === 0;
}
