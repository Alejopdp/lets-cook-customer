// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").comoFunciona;
import { useTheme } from '@material-ui/core';


// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import HowItWorksExtendedSection from "../../components/organisms/howItWorksExtendedSection/howItWorksExtendedSection";
import BenefitsSection from "../../components/organisms/sections/BenefitsSection";
import { Layout } from "../../components/layout/index";

const ComoFunciona = () => {
    const router = useRouter();
    const lang = langs[router.locale];
    const theme = useTheme();

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <HowItWorksExtendedSection />
            </InnerSectionLayout>
            <BenefitsSection backgroundColor={theme.palette.background.default} removeCallToAction />
        </Layout>
    );
};

export default ComoFunciona;
