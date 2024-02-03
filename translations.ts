import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";

import ptBR from "./locale/pt-BR";
import en from "./locale/en";

const translations = {
    "pt-BR": ptBR,
    "en": en,
};

const i18n = new I18n(translations);

i18n.defaultLocale = "pt-BR";
i18n.locale = getLocales()[0].languageCode ?? "pt-BR";
i18n.enableFallback = true;

export const t = (key: string): string => {
    return i18n.t(key);
};
