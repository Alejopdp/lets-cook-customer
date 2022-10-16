import { useRouter } from "next/router";
import * as Langs from "@lang";

export const useLang = (componentName: keyof typeof Langs) => {
    const router = useRouter();
    const lang = Langs[componentName][router.locale];
    return [lang, Langs];
};

export const getLang = (componentName: string, locale: string) => {
    const lang = Langs[componentName][locale];
    return [lang, Langs];
};

export default useLang;
