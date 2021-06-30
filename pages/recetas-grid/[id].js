import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Recipes from "../../components/organisms/recipes/recipes";
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from '../../components/layout/index';
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";


const RecetasLayout = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/" title="Valorar recetas" />
                <Recipes id={id} />
            </InnerSectionLayout>
        </Layout>

    )
};

export default RecetasLayout;
