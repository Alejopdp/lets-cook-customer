// Utils & Config
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

const PlanDetails = ({ data }) => {
    const changePlanData = {
        plans: [
            { planId: "1", name: "Plan Familiar", active: true },
            { planId: "2", name: "Plan Gourmet", active: false },
            { planId: "3", name: "Plan Ahorro", active: false },
            { planId: "4", name: "Plan Vegetariano", active: false },
            { planId: "5", name: "Plan Vegano", active: false },
        ],
        variants: [
            { planId: "1", planVariantId: "6", variantDescription: "4 recetas para 3 personas - 36 €/semana", active: true },
            { planId: "1", planVariantId: "7", variantDescription: "3 recetas para 3 personas - 30 €/semana", active: false },
            { planId: "1", planVariantId: "8", variantDescription: "2 recetas para 3 personas - 24 €/semana", active: false },
            { planId: "2", planVariantId: "9", variantDescription: "4 recetas para 2 personas - 30 €/semana", active: false },
            { planId: "2", planVariantId: "10", variantDescription: "3 recetas para 2 personas - 24 €/semana", active: false },
            { planId: "2", planVariantId: "11", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
            { planId: "3", planVariantId: "12", variantDescription: "3 recetas para 2 personas - 24 €/semana", active: false },
            { planId: "3", planVariantId: "13", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
            { planId: "4", planVariantId: "14", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
            { planId: "5", planVariantId: "15", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
        ],
    };

    const skipWeekData = {
        weeks: [
            { weekId: "1", text: "1 al 7 de marzo", skipped: false },
            { weekId: "2", text: "8 al 15 de marzo", skipped: false },
            { weekId: "3", text: "16 al 23 de marzo", skipped: false },
            { weekId: "4", text: "24 al 31 de marzo", skipped: false },
            { weekId: "5", text: "1 al 7 de abril", skipped: false },
            { weekId: "6", text: "8 al 15 de abril", skipped: false },
            { weekId: "7", text: "16 al 23 de abril", skipped: false },
            { weekId: "8", text: "24 al 1 de mayo", skipped: false },
            { weekId: "9", text: "2 al 8 de mayo", skipped: false },
            { weekId: "10", text: "9 al 16 de mayo", skipped: true },
            { weekId: "11", text: "17 al 24 de mayo", skipped: true },
            { weekId: "12", text: "25 al 2 de junio", skipped: false },
        ],
    };

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

    const [recipeSelectedIndex, setRecipeSelectedIndex] = useState({ index: -1, period: "" });
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

    const handlePrimaryButtonClickChangePlanModal = (newPlan) => {
        alert(JSON.stringify(newPlan));
        setOpenChangePlanModal(false);
    };

    // Cancel Plan Modal Functions

    const handleClickOpenCancelPlanModal = () => {
        setOpenCancelPlanModal(true);
    };

    const handleCloseCancelPlanModal = () => {
        setOpenCancelPlanModal(false);
    };

    const handlePrimaryButtonClickCancelPlanModal = () => {
        alert("primary click cancel plan modal");
        setOpenCancelPlanModal(false);
    };

    // Skip Plan Modal Functions

    const handleClickOpenSkipPlanModal = () => {
        setOpenSkipPlanModal(true);
    };

    const handleCloseSkipPlanModal = () => {
        setOpenSkipPlanModal(false);
    };

    const handlePrimaryButtonClickSkipPlanModal = (weeksModified) => {
        alert(JSON.stringify(weeksModified));
        setOpenSkipPlanModal(false);
    };

    // Recipes Modal Functions

    const handleClickOpenRecipeModal = (recipeId, period) => {
        let recipeIndex;
        if (period === "actualWeek") {
            recipeIndex = data.actualWeekOrder.findIndex((recipe) => recipe.id === recipeId);
        } else {
            recipeIndex = data.nextWeekOrder.findIndex((recipe) => recipe.id === recipeId);
        }
        setRecipeSelectedIndex({
            ...recipeSelectedIndex,
            index: recipeIndex,
            period: period,
        });
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
                    data={data}
                    handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                    handleClickOpenCancelPlanModal={handleClickOpenCancelPlanModal}
                    handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                    handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                />
            </Hidden>
            <Hidden mdUp>
                <PlanDetailsMobile
                    data={data}
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
                // data={recipeSelectedIndex.period === 'actualWeek' ? data.actualWeekOrder[recipeSelectedIndex.index] : data.nextWeekOrder[recipeSelectedIndex.index]}
            />
            <SwapPlanModal
                open={openChangePlanModal}
                handleClose={handleCloseChangePlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickChangePlanModal}
                data={changePlanData}
            />
            <CancelPlanModal
                open={openCancelPlanModal}
                handleClose={handleCloseCancelPlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickCancelPlanModal}
                data={cancelPlanData}
            />
            <SkipPlanModal
                open={openSkipPlanModal}
                handleClose={handleCloseSkipPlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickSkipPlanModal}
                data={skipWeekData}
            />
        </>
    );
};

export default PlanDetails;
