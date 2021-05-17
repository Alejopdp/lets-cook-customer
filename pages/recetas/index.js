// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import { getRecipes } from "../../helpers/serverRequests/recipe";
const langs = require("../../lang").recetas;

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal Components
import Layout from "../../components/layout/publicLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import RecipesGrid from "../../components/organisms/recipesGrid/recipesGrid";

const Recetas = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Layout>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
            <RecipesGrid recipes={props.recipes} />
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
