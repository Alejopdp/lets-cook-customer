// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").avisoLegal;

// Internal components
import Layout from "../../components/layout/publicLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import LegalTextSection from "../../components/atoms/LegalTextSection/LegalTextSection";
import Footer from "../../components/molecules/footer/footer";

const AvisoLegal = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout containerMaxWidth="lg">
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
            <LegalTextSection />
        </Layout>
    );
};

export default AvisoLegal;
