// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import { getRecipes } from "../../helpers/serverRequests/recipes";
const langs = require("../../lang").recetas;

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import RecipesGrid from "../../components/organisms/recipesGrid/recipesGrid";
import { Layout } from "../../components/layout/";

const Recetas = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout seoTitle="Recetas - Let's cook: Productos frescos y recetas" seoOgUrlSlug='recetas'>
            <InnerSectionLayout containerMaxWidth="lg">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <RecipesGrid recipesPage recipes={props.recipes} />
            </InnerSectionLayout>
        </Layout>
    );
};
export default Recetas;

export async function getServerSideProps(context) {
    const res = await getRecipes(context.locale);

    return {
        props: {
            recipes: res.status === 200 ? res.data : [],
        },
    };
}
