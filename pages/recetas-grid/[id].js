import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Recipes from "../../components/organisms/recipes/recipes";
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import { getRecipesByCustomer } from "../../helpers/serverRequests/user-recipes";
import { useLang } from "@hooks";
export const getServerSideProps = async (context) => {
    const test = context.params.id;
    const res = await getRecipesByCustomer(test, context.locale);

    return {
        props: {
            recipes: res.data || null,
            error: res.status !== 200 ? "ERROR" : "",
        },
    };
};

const RecetasLayout = ({ recipes }) => {
    const [lang] = useLang('recetasLayout')
    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title={lang.recipeScore} />
                <Recipes recipes={recipes} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default RecetasLayout;
