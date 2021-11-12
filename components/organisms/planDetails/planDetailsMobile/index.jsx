// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Grid from "@material-ui/core/Grid";

// Internal components
import PlanCard from "../planCard/index";
import ShippingAddressCard from "../shippingAddressCard/index";
import PaymentMethodCard from "../paymentMethodCard/index";
import CalendarCard from "../calendarCard/index";
import RecipesActualWeekCard from "../recipesActualWeekCard/index";
import RecipesNextWeekCard from "../recipesNextWeekCard/index";
import TextButton from "../../../atoms/textButton/textButton";

const PlanDetailsMobile = ({
    data,
    handleClickOpenChangePlanModal,
    handleClickOpenCancelPlanModal,
    handleClickOpenSkipPlanModal,
    handleClickOpenRecipeModal,
}) => {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PlanCard plan={data.plan} handleClick={handleClickOpenChangePlanModal} />
            </Grid>
            <Grid item xs={12}>
                <CalendarCard schedule={data.schedule} skippedOrders={data.skippedOrders} handleClick={handleClickOpenSkipPlanModal} />
            </Grid>
            {data.hasRecipes && (
                <>
                    {data.actualWeekOrder !== null && (
                        <Grid item xs={12}>
                            <RecipesActualWeekCard
                                actualWeekOrder={data.actualWeekOrder}
                                canChooseRecipes={data.canChooseRecipes}
                                hasChosenRecipesForActualWeek={data.hasChosenRecipesForActualWeek}
                                handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                            />
                        </Grid>
                    )}
                    {data.nextWeekOrder !== null && data.canChooseRecipes && (
                        <Grid item xs={12}>
                            <RecipesNextWeekCard
                                nextWeekOrder={data.nextWeekOrder}
                                handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                hasChosenRecipesForNextWeek={data.hasChosenRecipesForNextWeek}
                                canChooseRecipes={data.canChooseRecipesForNextWeekOrder}
                            />
                        </Grid>
                    )}
                </>
            )}
            <Grid item xs={12}>
                <ShippingAddressCard shippingAddress={data.shippingAddress} shippingCost={data.shippingCost} />
            </Grid>
            <Grid item xs={12}>
                <PaymentMethodCard paymentMethod={data.paymentMethod} />
            </Grid>
            <Grid item xs={12}>
                <TextButton
                    handleClick={handleClickOpenCancelPlanModal}
                    btnText="cancelar plan"
                    style={{ color: "#FC1919", marginTop: theme.spacing(2) }}
                />
            </Grid>
        </Grid>
    );
};

export default PlanDetailsMobile;
