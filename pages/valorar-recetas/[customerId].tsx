import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Recipes from "../../components/organisms/recipes/recipes";
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";
import { getRecipesByCustomer } from "../../helpers/serverRequests/user-recipes";
import { useLang } from "@hooks";
import { useSnackbar } from "notistack";
import { localeRoutes, Routes } from "lang/routes/routes";

const RateRecipesPage = () => {
    const router = useRouter();
    const [lang] = useLang("valorarRecetas");
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reloadCounter, setReloadCounter] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getRatings = async () => {
            const res = await getRecipesByCustomer(router.query.customerId, router.locale);

            if (res && res.status === 200) {
                setRatings(res.data.filter((recipeRating) => recipeRating.isRateable));
            } else {
                enqueueSnackbar("Ocurrió un error inesperado", { variant: "error" });
            }

            setIsLoading(false);
        };

        if (router.query.customerId) getRatings();
    }, [reloadCounter, router.query]);

    return (
        <Layout disableCallToActionSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url={localeRoutes[router.locale][Routes.perfil]} title={lang.title} />
                {!isLoading && <Recipes ratings={ratings || []} lang={lang} reload={() => setReloadCounter(reloadCounter + 1)} />}
            </InnerSectionLayout>
        </Layout>
    );
};

export default RateRecipesPage;
