// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").comoFunciona;

// Internal components
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import HowItWorksExtendedSection from "../../components/organisms/howItWorksExtendedSection/howItWorksExtendedSection";

const ComoFunciona = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />

            <HowItWorksExtendedSection />
        </>
    );
};

export default ComoFunciona;
