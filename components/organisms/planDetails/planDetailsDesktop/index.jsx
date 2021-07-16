// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Grid from "@material-ui/core/Grid";

// Internal components
import PlanCard from "../planCard/index";
import ShippingAddressCard from "../ShippingAddressCard/index";
import PaymentMethodCard from "../paymentMethodCard/index";
import CalendarCard from "../calendarCard/index";
import RecipesActualWeekCard from "../recipesActualWeekCard/index";
import RecipesNextWeekCard from "../recipesNextWeekCard/index";
import TextButton from "../../../atoms/textButton/textButton";


const PlanDetailsDesktop = ({ data, handleClickOpenChangePlanModal, handleClickOpenCancelPlanModal, handleClickOpenSkipPlanModal, handleClickOpenRecipeModal }) => {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PlanCard plan={data.plan} handleClick={handleClickOpenChangePlanModal} />
                    </Grid>
                    <Grid item xs={12}>
                        <ShippingAddressCard shippingAddress={data.shippingAddress} />
                    </Grid>
                    <Grid item xs={12}>
                        <PaymentMethodCard paymentMethod={data.paymentMethod} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextButton handleClick={handleClickOpenCancelPlanModal} btnText='cancelar plan' style={{ color: '#FC1919', marginTop: theme.spacing(2) }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CalendarCard schedule={data.schedule} skippedOrders={data.skippedOrders} handleClick={handleClickOpenSkipPlanModal} />
                    </Grid>
                    {data.hasRecipes && (
                        <>
                            {data.actualWeekOrder !== null && (
                                <Grid item xs={12}>
                                    <RecipesActualWeekCard actualWeekOrder={data.actualWeekOrder} hasChosenRecipesForActualWeek={data.hasChosenRecipesForActualWeek} canChooseRecipes={data.canChooseRecipes} handleClickOpenRecipeModal={handleClickOpenRecipeModal} />
                                </Grid>
                            )}
                            {(data.nextWeekOrder !== null && data.canChooseRecipes) && (
                                <Grid item xs={12}>
                                    <RecipesNextWeekCard nextWeekOrder={data.nextWeekOrder} hasChosenRecipesForNextWeek={data.hasChosenRecipesForNextWeek} handleClickOpenRecipeModal={handleClickOpenRecipeModal} />
                                </Grid>
                            )}
                        </>
                    )}

                </Grid>
            </Grid>
        </Grid>
    );
};

export default PlanDetailsDesktop;
