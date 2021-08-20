// Utils & Config
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { cancelSubscription, swapPlan } from "../../../helpers/serverRequests/subscription";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Hidden from "@material-ui/core/Hidden";

// Internal components
import RecipeModal from "../../molecules/recipeModal/recipeModal";
import SwapPlanModal from "../../molecules/managePlanModals/swapPlanModal";
import CancelPlanModal from "../../molecules/managePlanModals/cancelPlanModal";
import SkipPlanModal from "../../molecules/managePlanModals/skipPlanModal";
import PlanDetailsDesktop from "./planDetailsDesktop/index";
import PlanDetailsMobile from "./planDetailsMobile/index";
import { useSnackbar } from "notistack";
import { PlanDetailsProps, SkippableOrder } from "./interfaces";
import { skipOrders } from "helpers/serverRequests/order";

const PlanDetails = (props: PlanDetailsProps) => {
    const cancelPlanData = {
        reasons: [
            { id: 1, value: "created_by_error", text: "Se ha creado por error" },
            { id: 2, value: "cant_get_kits_next_week", text: "No puedo recibir los kits la próxima semana" },
            { id: 3, value: "special_diet", text: "Tengo una dieta especial" },
            { id: 4, value: "move_abroad", text: "Me voy a vivir fuera por tiempo indeterminado" },
            { id: 5, value: "dont_like_meal_kits", text: "No me gustan los kits para cocinar (meal kits)" },
            { id: 6, value: "had_problems_with_letscook", text: "He tenido problemas con Let’s Cook" },
            { id: 7, value: "price_too_high", text: "El precio es muy alto" },
            { id: 8, value: "other_reason", text: "Otra razón" },
        ],
    };

    const theme = useTheme();
    // const router = useRouter();
    // const lang = langs[router.locale];
    const { enqueueSnackbar } = useSnackbar();
    const [recipeSelectedIndex, setRecipeSelectedIndex] = useState({ index: -1, period: "" });
    const [selectedRecipe, setselectedRecipe] = useState({});
    const [openRecipeModal, setOpenRecipeModal] = useState(false);
    const [openChangePlanModal, setOpenChangePlanModal] = useState(false);
    const [openCancelPlanModal, setOpenCancelPlanModal] = useState(false);
    const [openSkipPlanModal, setOpenSkipPlanModal] = useState(false);

    // Change Plan Modal Functions

    const handleClickOpenChangePlanModal = () => {
        setOpenChangePlanModal(true);
    };

    const handleCloseChangePlanModal = () => {
        setOpenChangePlanModal(false);
    };

    const handlePrimaryButtonClickChangePlanModal = async (newPlan: { planId: string; planVariantId: string }) => {
        const res = await swapPlan(props.subscription.subscriptionId, newPlan.planId, newPlan.planVariantId);

        if (res.status === 200) {
            enqueueSnackbar("Plan cambiado con éxito", { variant: "success" });
            setOpenChangePlanModal(false);
        } else {
            enqueueSnackbar(res.data, { variant: "error" });
        }
    };

    // Cancel Plan Modal Functions

    const handleClickOpenCancelPlanModal = () => {
        setOpenCancelPlanModal(true);
    };

    const handleCloseCancelPlanModal = () => {
        setOpenCancelPlanModal(false);
    };

    const handlePrimaryButtonClickCancelPlanModal = async (reason, comment) => {
        const res = await cancelSubscription(props.subscription.subscriptionId, reason, comment);

        if (res.status === 200) {
            enqueueSnackbar("El plan se canceló correctamente", { variant: "success" });
        } else {
            enqueueSnackbar("Error al cancelar el plan", { variant: "error" });
        }
        setOpenCancelPlanModal(false);
    };

    // Skip Plan Modal Functions

    const handleClickOpenSkipPlanModal = () => {
        setOpenSkipPlanModal(true);
    };

    const handleCloseSkipPlanModal = () => {
        setOpenSkipPlanModal(false);
    };

    const handlePrimaryButtonClickSkipPlanModal = async (orders: SkippableOrder[]) => {
        const res = await skipOrders(orders);

        if (res.status === 200) {
            enqueueSnackbar("Semanas salteadas correctamente", { variant: "success" });
        } else {
            enqueueSnackbar("Error al saltear las semanas", { variant: "error" });
        }
        setOpenSkipPlanModal(false);
    };

    // Recipes Modal Functions

    const handleClickOpenRecipeModal = (recipeId, period) => {
        let recipe;
        if (period === "actualWeek") {
            recipe = props.subscription.actualWeekOrder.recipes.find((recipe) => recipe.id === recipeId);
        } else {
            recipe = props.subscription.nextWeekOrder.recipes.find((recipe) => recipe.id === recipeId);
        }

        setselectedRecipe(recipe);
        // setRecipeSelectedIndex({
        //     ...recipeSelectedIndex,
        //     index: recipeIndex,
        //     period: period,
        // });
        setOpenRecipeModal(true);
    };

    const handleCloseRecipeModal = () => {
        setOpenRecipeModal(false);
    };

    const descriptionElementRefRecipeModal = useRef(null);

    useEffect(() => {
        if (openRecipeModal) {
            const { current: descriptionElement } = descriptionElementRefRecipeModal;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openRecipeModal]);

    return (
        <>
            <Hidden smDown>
                <PlanDetailsDesktop
                    subscription={props.subscription}
                    handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                    handleClickOpenCancelPlanModal={handleClickOpenCancelPlanModal}
                    handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                    handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                />
            </Hidden>
            <Hidden mdUp>
                <PlanDetailsMobile
                    data={props.subscription}
                    handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                    handleClickOpenCancelPlanModal={handleClickOpenCancelPlanModal}
                    handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                    handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                />
            </Hidden>
            <RecipeModal
                open={openRecipeModal}
                handleClose={handleCloseRecipeModal}
                descriptionElementRef={descriptionElementRefRecipeModal}
                recipe={selectedRecipe}
                // data={recipeSelectedIndex.period === 'actualWeek' ? data.actualWeekOrder[recipeSelectedIndex.index] : data.nextWeekOrder[recipeSelectedIndex.index]}
            />
            <SwapPlanModal
                open={openChangePlanModal}
                handleClose={handleCloseChangePlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickChangePlanModal}
                data={props.swapPlanData}
            />
            <CancelPlanModal
                open={openCancelPlanModal}
                handleClose={handleCloseCancelPlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickCancelPlanModal}
                data={cancelPlanData}
                orders={props.subscription.nextTwelveOrders}
                restrictions={props.restrictions}
                subscriptionId={props.subscription.subscriptionId}
            />
            <SkipPlanModal
                open={openSkipPlanModal}
                handleClose={handleCloseSkipPlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickSkipPlanModal}
                data={props.subscription.nextTwelveOrders}
            />
        </>
    );
};

export default PlanDetails;
