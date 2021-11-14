import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Layout } from "@layouts";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import BackButtonTitle from "components/atoms/backButtonTitle/backButtonTitle";
import RecipeChoiceScreen from "components/organisms/recipeChoiceScreen/recipeChoiceScreen";
import { useSnackbar } from "notistack";
import { getRecipesForOrder } from "@helpers";

// External components

// Internal components

// export async function getServerSideProps(context) {
//     const orderId = context.params.orderId;
//     const locale = context.locale;
//     const res = await getRecipesForOrder(orderId as string, locale);

//     return {
//         props: {
//             error: res.status !== 200,
//             recipes: res.data.recipes || null,
//             nextDeliveryLabel: res.data.nextDeliveryLabel || null,
//             maxRecipesQty: res.data.maxRecipesQty || null,
//             subscriptionId: res.data.subscriptionId,
//             actualChosenRecipes: res.data.actualChosenRecipes,
//         },
//     };
// }

const ChooseRecipes = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [hasError, sethasError] = useState(false);
    const [recipes, setrecipes] = useState([]);
    const [nextDeliveryLabel, setnextDeliveryLabel] = useState("");
    const [maxRecipesQty, setmaxRecipesQty] = useState(0);
    const [subscriptionId, setsubscriptionId] = useState("");
    const [actualChosenRecipes, setactualChosenRecipes] = useState([]);
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
                    />
                )}
            </InnerSectionLayout>
        </Layout>
    );
};

ChooseRecipes.propTypes = {};

export default ChooseRecipes;
