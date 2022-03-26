// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").comoFunciona;
import { useTheme } from "@material-ui/core";

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import HowItWorksExtendedSection from "../../components/organisms/howItWorksExtendedSection/howItWorksExtendedSection";
import BenefitsSection from "../../components/organisms/sections/BenefitsSection";
import { Layout } from "../../components/layout/index";
import { useLang } from "@hooks";
import { localeRoutes, Routes } from "lang/routes/routes";

const ComoFunciona = () => {
    const router = useRouter();
    const theme = useTheme();
    const [lang] = useLang("comoFunciona");

    return (
        <Layout
            seoTitle="Cómo funciona - Let's cook: Productos frescos y recetas"
            seoOgUrlSlug="como-funciona"
            page="como funciona"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}${localeRoutes[router.locale][Routes["como-funciona"]]}`}
        >
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <HowItWorksExtendedSection />
            </InnerSectionLayout>
            <BenefitsSection
                backgroundColor={theme.palette.background.default}
                removeCallToAction
                enableTitleSection
                lang={lang.benefitsSection}
            />
        </Layout>
    );
};

export default ComoFunciona;
