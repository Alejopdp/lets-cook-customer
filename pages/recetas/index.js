// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import { getRecipes } from "../../helpers/serverRequests/recipe";
const langs = require("../../lang").recetas;

// Internal Components
import InnerSectionLayout from "../../components/layout/publicLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import RecipesGrid from "../../components/organisms/recipesGrid/recipesGrid";
import Layout from "../../components/layout/index";

const Recetas = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <RecipesGrid recipesPage recipes={props.recipes} />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getStaticProps(context) {
    const res = await getRecipes(context.locale);

    return {
        props: {
            recipes: res.status === 200 ? res.data : [],
        },
    };
}

export default Recetas;
