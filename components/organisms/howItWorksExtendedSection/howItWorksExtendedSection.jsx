// Utils & Config
import React from "react";
import { useRouter } from "next/router";

// Internal components
import HowItWorksExtended from "../../molecules/howItWorksExtended/howItWorksExtended";
import { useLang } from "@hooks";

const HowItWorksExtendedSection = () => {
    const router = useRouter();
    const [lang] = useLang("comoFunciona");

    {
        /*
    No creo que esto sea la solución más elegante
    Pero es lo unico que se me ocurrió sin saber cómo van a venir los datos!
    Cualquier cosa me chiflan y vemos como lo acomodamos! -Lionel
  */
    }
    return (
        <>
            <HowItWorksExtended
                title={lang.step1.title}
                subtitle={lang.step1.content}
                image={lang.step1.image}
                direction="row-reverse"
                style={{ marginLeft: "auto" }}
            />
            <HowItWorksExtended title={lang.step2.title} subtitle={lang.step2.content} image={lang.step2.image} direction="row" />
            <HowItWorksExtended
                title={lang.step3.title}
                subtitle={lang.step3.content}
                image={lang.step3.image}
                direction="row-reverse"
                style={{ marginLeft: "auto" }}
            />
            <HowItWorksExtended title={lang.step4.title} subtitle={lang.step4.content} image={lang.step4.image} direction="row" />
        </>
    );
};

export default HowItWorksExtendedSection;
