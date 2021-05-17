// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").comoFunciona;

// Internal components
import Layout from "../../components/layout/publicLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import HowItWorksExtendedSection from "../../components/organisms/howItWorksExtendedSection/howItWorksExtendedSection";

const ComoFunciona = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
            <HowItWorksExtendedSection />
        </Layout>
    );
};

export default ComoFunciona;
