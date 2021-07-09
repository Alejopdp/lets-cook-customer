// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../../lang").howItWorksExtendedSection;

// Internal components
import HowItWorksExtended from "../../molecules/howItWorksExtended/howItWorksExtended";

const HowItWorksExtendedSection = () => {
    const router = useRouter();
    const lang = langs[router.locale];

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
                title={lang.step1.howTitle}
                subtitle={lang.step1.howSubtitle}
                direction="row-reverse"
            />

            <HowItWorksExtended
                title={lang.step1.howTitle}
                subtitle={lang.step1.howSubtitle}
                direction="row"
            />

            <HowItWorksExtended
                title={lang.step3.howTitle}
                subtitle={lang.step1.howSubtitle}
                direction="row-reverse"
            />

            <HowItWorksExtended
                title={lang.step4.howTitle}
                subtitle={lang.step1.howSubtitle}
                direction="row"
            />
</>
    );
};

export default HowItWorksExtendedSection;
