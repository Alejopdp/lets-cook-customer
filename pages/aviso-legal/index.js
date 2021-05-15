// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").avisoLegal;

// Internal components
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import LegalTextSection from "../../components/atoms/LegalTextSection/LegalTextSection";
import Footer from "../../components/molecules/footer/footer";

const AvisoLegal = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />

            <LegalTextSection />

            <Footer />
        </>
    );
};

export default AvisoLegal;
