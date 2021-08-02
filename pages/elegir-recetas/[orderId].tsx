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

export async function getServerSideProps(context) {
    const orderId = context.params.orderId;
    const locale = context.locale;
    const res = await getRecipesForOrder(orderId as string, locale);

    return {
        props: {
            error: res.status !== 200,
            recipes: res.data.recipes || null,
            nextDeliveryLabel: res.data.nextDeliveryLabel || null,
            maxRecipesQty: res.data.maxRecipesQty || null,
            subscriptionId: res.data.subscriptionId,
        },
    };
}

const ChooseRecipes = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    // useEffect(() => {
    //     const getData = async () => {
    //         console.log("ROUTER QUERY: ", router);
    //         const res = await getRecipesForOrder(router.query.orderId as string, router.locale);

    //         if (res.status === 200) {
    //             setrecipes(res.data.recipes);
    //             setrecipes(res.data.nextDeliveryLabel);
    //             setrecipes(res.data.maxRecipesQty);
    //         } else {
    //             enqueueSnackbar(res.data, { variant: "error" });
    //         }
    //     };
    //     getData();
    // }, []);

    return (
        <Layout disableCallToActionSection disableFooterSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <RecipeChoiceScreen
                    nextDeliveryLabel={props.nextDeliveryLabel}
                    recipes={props.recipes}
                    maxRecipesQty={props.maxRecipesQty}
                    subscriptionId={props.subscriptionId}
                />
            </InnerSectionLayout>
        </Layout>
    );
};

ChooseRecipes.propTypes = {};

export default ChooseRecipes;
