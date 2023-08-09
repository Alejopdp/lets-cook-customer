import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@layouts";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import RecipeChoiceScreen from "components/organisms/recipeChoiceScreen/recipeChoiceScreen";
import { useSnackbar } from "notistack";
import { getRecipesForOrder } from "@helpers";

const ChooseRecipes = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [hasError, sethasError] = useState(false);
    const [recipes, setrecipes] = useState([]);
    const [nextDeliveryLabel, setnextDeliveryLabel] = useState("");
    const [maxRecipesQty, setmaxRecipesQty] = useState(0);
    const [subscriptionId, setsubscriptionId] = useState("");
    const [actualChosenRecipes, setactualChosenRecipes] = useState([]);
    const [planId, setPlanId] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getData = async () => {
            const res = await getRecipesForOrder(router.query.orderId as string, router.locale);

            if (res && res.status === 200) {
                setrecipes(res.data.recipes);
                setnextDeliveryLabel(res.data.nextDeliveryLabel);
                setmaxRecipesQty(res.data.maxRecipesQty);
                setsubscriptionId(res.data.subscriptionId);
                setactualChosenRecipes(res.data.actualChosenRecipes);
                setPlanId(res.data.planId);
            } else {
                enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado", { variant: "error" });
                sethasError(true);
            }
            setisLoading(false);
        };
        getData();
    }, []);

    return (
        <Layout disableCallToActionSection disableFooterSection>
            <InnerSectionLayout containerMaxWidth="lg">
                {!isLoading && !hasError && (
                    <RecipeChoiceScreen
                        nextDeliveryLabel={nextDeliveryLabel}
                        recipes={recipes}
                        maxRecipesQty={maxRecipesQty}
                        subscriptionId={subscriptionId}
                        actualChosenRecipes={actualChosenRecipes}
                        planId={planId}
                    />
                )}
            </InnerSectionLayout>
        </Layout>
    );
};

ChooseRecipes.propTypes = {};

export default ChooseRecipes;
