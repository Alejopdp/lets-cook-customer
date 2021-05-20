// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").comoFunciona;

// Internal components
import InnerSectionLayout from "../../components/layout/publicLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import HowItWorksExtendedSection from "../../components/organisms/howItWorksExtendedSection/howItWorksExtendedSection";
import Layout from '../../components/layout/index';

const ComoFunciona = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <HowItWorksExtendedSection />
            </InnerSectionLayout>
        </Layout>
    );
};

export default ComoFunciona;
