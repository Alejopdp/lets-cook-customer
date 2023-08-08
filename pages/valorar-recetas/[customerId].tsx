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
import SearchInput from "components/atoms/searchInput";
import { Box, Grid, useTheme } from "@material-ui/core";

const RateRecipesPage = () => {
    const router = useRouter();
    const theme = useTheme();
    const [lang] = useLang("valorarRecetas");
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
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
                <Grid container style={{ marginBottom: theme.spacing(3) }}>
                    <Grid item xs={12} md={4}>
                        <SearchInput searchValue={searchText} setsearchValue={setSearchText } placeholder={lang.searchBarPlaceholder}/>    
                    </Grid>

                </Grid>
                {!isLoading && <Recipes searchText={searchText} ratings={ratings || []} lang={lang} reload={() => setReloadCounter(reloadCounter + 1)} />}
            </InnerSectionLayout>
        </Layout>
    );
};

export default RateRecipesPage;
