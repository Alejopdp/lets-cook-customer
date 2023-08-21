// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";

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
    handleClickOpenChangePlanModal,
    handleClickOpenCancelPlanModal,
    handleClickOpenSkipPlanModal,
    handleClickOpenRecipeModal,
    lang,
    subscription,
}) => {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PlanCard
                    plan={subscription.plan}
                    handleClick={handleClickOpenChangePlanModal}
                    portionPrice={subscription.portionPrice}
                    portionsQuantity={subscription.portionsQuantity}
                    isOneTime={subscription.isOneTime}
                />
            </Grid>
            <Grid item xs={12}>
                <CalendarCard
                    schedule={subscription.schedule}
                    skippedOrders={subscription.skippedOrders}
                    handleClick={handleClickOpenSkipPlanModal}
                    lang={lang.calendarCard}
                    isOneTime={subscription.isOneTime}
                />
            </Grid>
            {subscription.hasRecipes && (
                <>
                    {subscription.actualWeekOrder !== null && (
                        <Grid item xs={12}>
                            <RecipesActualWeekCard
                                actualWeekOrder={subscription.actualWeekOrder}
                                canChooseRecipes={subscription.canChooseRecipes}
                                hasChosenRecipesForActualWeek={subscription.hasChosenRecipesForActualWeek}
                                handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                lang={lang.recipesActualWeekCard}
                            />
                        </Grid>
                    )}
                    {subscription.nextWeekOrder !== null && subscription.canChooseRecipes && (
                        <Grid item xs={12}>
                            <RecipesNextWeekCard
                                nextWeekOrder={subscription.nextWeekOrder}
                                handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                hasChosenRecipesForNextWeek={subscription.hasChosenRecipesForNextWeek}
                                canChooseRecipes={subscription.canChooseRecipesForNextWeekOrder}
                                lang={lang.recipesNextWeekCard}
                            />
                        </Grid>
                    )}
                </>
            )}
            <Grid item xs={12}>
                <ShippingAddressCard
                    shippingAddress={subscription.shippingAddress}
                    lang={lang.shippingAddressCard}
                    shippingCost={subscription.shippingCost}
                />
            </Grid>
            <Grid item xs={12}>
                <PaymentMethodCard paymentMethod={subscription.paymentMethod} lang={lang.paymentMethodCard} />
            </Grid>
            {subscription.plan.state.stateTitle === "SUBSCRIPTION_ACTIVE" && <Grid item xs={12}>
                <TextButton
                    handleClick={handleClickOpenCancelPlanModal}
                    btnText={lang.cancelPlanBtnText}
                    style={{ color: "#FC1919", marginTop: theme.spacing(2) }}
                />
            </Grid>}
        </Grid>
    );
};

export default PlanDetailsMobile;
