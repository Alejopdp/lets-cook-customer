// Utils & Config
import React, { useState } from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").preguntasFrecuentes;

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import SearchBar from "../../components/atoms/searchBar/searchBar";
import FaqsSection from "../../components/organisms/faqsSection/faqsSection";
import { Layout } from "../../components/layout/index";

const PreguntasFrecuentes = () => {
    const router = useRouter();
    const lang = langs[router.locale];
    const [searchValue, setsearchValue] = useState("");

    return (
        <Layout
            seoTitle="Preguntas frecuentes - LetsCook: Productos frescos y recetas"
            seoOgUrlSlug="preguntas-frecuentes"
            page="preguntas frecuentes"
        >
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <SearchBar searchValue={searchValue} setsearchValue={setsearchValue} />
                <FaqsSection searchValue={searchValue} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default PreguntasFrecuentes;
