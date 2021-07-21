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
import { PlanDetailsProps } from "../interfaces";

const PlanDetailsDesktop = ({
    subscription,
    handleClickOpenChangePlanModal,
    handleClickOpenCancelPlanModal,
    handleClickOpenSkipPlanModal,
    handleClickOpenRecipeModal,
}: PlanDetailsProps) => {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PlanCard plan={subscription.plan} handleClick={handleClickOpenChangePlanModal} />
                    </Grid>
                    <Grid item xs={12}>
                        <ShippingAddressCard shippingAddress={subscription.shippingAddress} />
                    </Grid>
                    <Grid item xs={12}>
                        <PaymentMethodCard paymentMethod={subscription.paymentMethod} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextButton
                            handleClick={handleClickOpenCancelPlanModal}
                            btnText="cancelar plan"
                            style={{ color: "#FC1919", marginTop: theme.spacing(2) }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <CalendarCard
                            schedule={subscription.schedule}
                            skippedOrders={subscription.skippedOrders}
                            handleClick={handleClickOpenSkipPlanModal}
                        />
                    </Grid>
                    {subscription.hasRecipes && (
                        <>
                            {subscription.actualWeekOrder !== null && (
                                <Grid item xs={12}>
                                    <RecipesActualWeekCard
                                        actualWeekOrder={subscription.actualWeekOrder}
                                        hasChosenRecipesForActualWeek={subscription.hasChosenRecipesForActualWeek}
                                        canChooseRecipes={subscription.canChooseRecipes}
                                        handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                    />
                                </Grid>
                            )}
                            {subscription.nextWeekOrder !== null && subscription.canChooseRecipes && (
                                <Grid item xs={12}>
                                    <RecipesNextWeekCard
                                        nextWeekOrder={subscription.nextWeekOrder}
                                        hasChosenRecipesForNextWeek={subscription.hasChosenRecipesForNextWeek}
                                        handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                    />
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
