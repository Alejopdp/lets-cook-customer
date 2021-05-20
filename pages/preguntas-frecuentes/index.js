// Utils & Config
import React, { useState } from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").preguntasFrecuentes;

// Internal components
import Layout from "../../components/layout/publicLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import SearchBar from "../../components/atoms/searchBar/searchBar";
import FaqsSection from "../../components/organisms/faqsSection/faqsSection";

const preguntasFrecuentes = () => {
    const router = useRouter();
    const lang = langs[router.locale];
    const [searchValue, setsearchValue] = useState("");

    return (
        <Layout containerMaxWidth="md">
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
            <SearchBar searchValue={searchValue} setsearchValue={setsearchValue} />
            <FaqsSection searchValue={searchValue} />
        </Layout>
    );
};

export default preguntasFrecuentes;
