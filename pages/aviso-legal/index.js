// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").avisoLegal;

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import LegalTextSection from "../../components/atoms/LegalTextSection/LegalTextSection";
import Footer from "../../components/molecules/footer/footer";
import { Layout } from "../../components/layout/index";

const AvisoLegal = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout seoTitle="Aviso legal - Let's cook: Productos frescos y recetas">
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <LegalTextSection />
            </InnerSectionLayout>
        </Layout>
    );
};

export default AvisoLegal;
