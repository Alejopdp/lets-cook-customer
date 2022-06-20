// Utils & Config
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { cancelSubscription, swapPlan } from "../../../helpers/serverRequests/subscription";

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
import { useRouter } from "next/router";
import { CancellationReason } from "types/cancellation";
import { localeRoutes, Routes } from "lang/routes/routes";
import { useLang } from "@hooks";

const PlanDetails = (props: PlanDetailsProps) => {
    const router = useRouter();
    const [lang] = useLang("planDetails");
    const cancelPlanData = {
        reasons: [
            { id: 1, value: CancellationReason.CREATED_BY_ERROR, text: lang.cancelPlanReasonsText.created_by_error },
            { id: 2, value: CancellationReason.CANT_GET_KITS_NEXT_WEEK, text: lang.cancelPlanReasonsText.cant_get_kits_next_week },
            { id: 3, value: CancellationReason.SPECIAL_DIET, text: lang.cancelPlanReasonsText.special_diet },
            { id: 4, value: CancellationReason.MOVE_ABROAD, text: lang.cancelPlanReasonsText.move_abroad },
            { id: 5, value: CancellationReason.DONT_LIKE_MEAL_KITS, text: lang.cancelPlanReasonsText.dont_like_meal_kits },
            { id: 6, value: CancellationReason.HAD_PROBLEMS_WITH_LETSCOOK, text: lang.cancelPlanReasonsText.had_problems_with_letscook },
            { id: 7, value: CancellationReason.PRICE_TOO_HIGH, text: lang.cancelPlanReasonsText.price_too_high },
            { id: 8, value: CancellationReason.OTHER_REASONS, text: lang.cancelPlanReasonsText.other_reason },
        ],
    };

    const theme = useTheme();
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
            props.reload();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
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
        const res = await cancelSubscription(props.subscription.subscriptionId, reason.value, comment);

        if (res.status === 200) {
            enqueueSnackbar(lang.cancelPlanSnackbarSuccessText, { variant: "success" });
            router.replace(localeRoutes[router.locale][Routes.perfil]);
        } else {
            enqueueSnackbar(lang.cancelPlanSnackbarFailureText, { variant: "error" });
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
            enqueueSnackbar(lang.skipPlanSnackbarSuccessText, { variant: "success" });
            router.replace(`${localeRoutes[router.locale][Routes["detalle-del-plan"]]}/${router.query.subscriptionId}`);
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : lang.skipPlanSnackbarFailureText, { variant: "error" });
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
                    lang={lang}
                />
            </Hidden>
            <Hidden mdUp>
                <PlanDetailsMobile
                    subscription={props.subscription}
                    handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                    handleClickOpenCancelPlanModal={handleClickOpenCancelPlanModal}
                    handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                    handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                    lang={lang}
                />
            </Hidden>
            {openRecipeModal && (
                <RecipeModal
                    open={openRecipeModal}
                    handleClose={handleCloseRecipeModal}
                    descriptionElementRef={descriptionElementRefRecipeModal}
                    recipe={selectedRecipe}
                    // data={recipeSelectedIndex.period === 'actualWeek' ? data.actualWeekOrder[recipeSelectedIndex.index] : data.nextWeekOrder[recipeSelectedIndex.index]}
                />
            )}
            <SwapPlanModal
                open={openChangePlanModal}
                handleClose={handleCloseChangePlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickChangePlanModal}
                data={props.swapPlanData}
                lang={lang.swapPlanModal}
            />
            <CancelPlanModal
                open={openCancelPlanModal}
                handleClose={handleCloseCancelPlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickCancelPlanModal}
                data={cancelPlanData}
                orders={props.subscription.nextTwelveOrders}
                restrictions={props.restrictions}
                subscriptionId={props.subscription.subscriptionId}
                actualPlan={props.subscription.plan}
                actualPlanVariant={props.subscription.actualPlanVariant}
                lang={lang.cancelPlanModal}
            />
            <SkipPlanModal
                open={openSkipPlanModal}
                handleClose={handleCloseSkipPlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickSkipPlanModal}
                data={props.subscription.nextTwelveOrders}
                lang={lang.skipPlanModal}
            />
        </>
    );
};

export default PlanDetails;
