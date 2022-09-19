import { useRouter } from "next/router";
import * as Langs from "@lang";
type LangsType = [any, any];

export const useLang = (componentName: string): LangsType => {
    const router = useRouter();
    const lang = Langs[componentName][router.locale];
    return [lang, Langs];
};

export const getLang = (componentName: string, locale: string): LangsType => {
    const lang = Langs[componentName][locale];
    return [lang, Langs];
};

export default useLang;
