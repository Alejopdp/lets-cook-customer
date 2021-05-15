// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").preguntasFrecuentes;

// Internal components
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import SearchBar from "../../components/atoms/searchBar/searchBar";
import FaqsSection from "../../components/organisms/faqsSection/faqsSection";

const preguntasFrecuentes = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />

            <SearchBar />

            <FaqsSection />
        </>
    );
};

export default preguntasFrecuentes;
