// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").avisoLegal;

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import LegalTextSection from "../../components/atoms/LegalTextSection/LegalTextSection";
import { Layout } from "../../components/layout/index";
import { localeRoutes, Routes } from "lang/routes/routes";

const AvisoLegal = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout
            seoTitle="Aviso legal - LetsCook: Productos frescos y recetas"
            page="aviso legal"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}${localeRoutes[router.locale][Routes["aviso-legal"]]}`}
        >
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <LegalTextSection />
            </InnerSectionLayout>
        </Layout>
    );
};

export default AvisoLegal;
