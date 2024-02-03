import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const translations = {
    "pt-BR": {
        example: "Exemplo",

        password: "Senha",
        "password-placeholder": "seNha_suPer$ecret@",
        email: "E-Mail",
        "email-placeholder": "exemplo@email.com",
    },
    en: {
        example: "Example",
    },
};

const i18n = new I18n(translations);

i18n.defaultLocale = "pt-BR";
i18n.locale = getLocales()[0].languageCode ?? "pt-BR";
i18n.enableFallback = true;

export const t = (key: keyof (typeof translations)["pt-BR"]): string => {
    return i18n.t(key);
};
