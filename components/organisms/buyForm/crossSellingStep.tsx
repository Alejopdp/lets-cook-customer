// Utils & config
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { getAdditionalPlans } from "@helpers";
import { useSnackbar } from "notistack";
import { useStripe } from "@stripe/react-stripe-js";

// External components
import { Box, Button, Container, Grid, Icon } from "@material-ui/core";
import TitleBuyFlow from "components/molecules/titleBuyFlow/titleBuyFlow";
import AdditionalPlansGrid from "../additionalPlansGrid/additionalPlansGrid";
import { useBuyFlow, useCrossSellingStore, useUserInfoStore } from "@stores";
import { Plan } from "types/plan";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core";
// Internal components

// Images & icons
import Payment from "@material-ui/icons/Payment";
import { CustomButton, RoundedButton } from "@atoms";
import { PlanVariant } from "types/planVariant";
import {
    createManySubscriptions,
    handle3dSecureFailure,
    handle3dSecureFailureForManySubscriptions,
} from "helpers/serverRequests/subscription";
import AdditionalPlansBuyButtons from "components/molecules/additionalPlansBuyButtons/additionalPlansBuyButtons";
import { updatePaymentOrderState } from "helpers/serverRequests/paymentOrder";
import { PaymentOrderState } from "types/paymentOrderState";

const CrossSellingStep = (props) => {
    const theme = useTheme();
    const { form, resetBuyFlowState } = useBuyFlow((state) => ({ form: state.form, resetBuyFlowState: state.resetBuyFlowState }));
    const router = useRouter();
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();
    const [additionalPlans, setadditionalPlans] = useState<Plan[]>([]);
    const [selectedVariants, setselectedVariants] = useState<PlanVariant[]>([]);
    // const selectedPlans = useCrossSellingStore((state) => state.selectedPlans);
    const stripe = useStripe();

    useEffect(() => {
        const getAdditionalPlansByPlanId = async () => {
            const res = await getAdditionalPlans(router.locale, form.planCode);

            if (res.status === 200) {
                setadditionalPlans(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getAdditionalPlansByPlanId();
    }, []);

    const totalValue = useMemo(() => {
        // if (selectedPlans) {
        //     const entries = Object.entries(selectedPlans);

        //     return entries.reduce((acc, entry) => entry[1].variant.price + acc, 0);
        // } else {
        //     return undefined;
        // }

        return selectedVariants.reduce((acc, variant) => acc + variant.priceWithOffer || variant.price, 0);
    }, [selectedVariants]);

    const handleSubmitPayment = async () => {
        const variants = selectedVariants.map((variant) => ({
            planId: variant.planId,
            variant: { id: variant.id },
            frequency: variant.frequency,
        }));

        console.log("SELECTED VARIANTS: ", selectedVariants);
        const res = await createManySubscriptions(userInfo.id, variants);

        if (res.status === 200) {
            if (res.data.payment_status === "requires_action") {
                const confirmationResponse = await stripe.confirmCardPayment(res.data.client_secret, {
                    payment_method: form.paymentMethod?.stripeId,
                });

                if (confirmationResponse.paymentIntent && confirmationResponse.paymentIntent.status === "succeeded") {
                    // TO DO: Confirm payments in DB
                    await updatePaymentOrderState(res.data.paymentOrderId, PaymentOrderState.PAYMENT_ORDER_BILLED);
                    await router.push("/perfil");
                    resetBuyFlowState();
                } else {
                    console.log("A VER : ", res.data);
                    await handle3dSecureFailureForManySubscriptions(res.data.subscriptionsIds);
                    enqueueSnackbar(
                        confirmationResponse.error ? confirmationResponse.error.message : "Error al autenticar el método de pago",
                        { variant: "error" }
                    );
                }
            } else if (res.data.payment_status === "succeeded") {
                enqueueSnackbar("Suscripción creada con éxito", { variant: "success" });
                await router.push("/perfil");
                resetBuyFlowState();
            } else {
                enqueueSnackbar("Error al completar el pago", { variant: "error" });
            }
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleNotAddingAdditionalPlans = async () => {
        await router.push("/perfil");
        resetBuyFlowState();
    };

    return (
        <Container maxWidth="lg" style={{ paddingTop: theme.spacing(6) }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleBuyFlow
                        title={form.recipes.length > 0 ? "Ya has seleccionado las recetas correctamente" : "¡Gracias por suscribirte!"}
                        subtitle="¿Quieres agregar algún producto adicional?"
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                    <AdditionalPlansGrid
                        selectedVariants={selectedVariants}
                        setselectedVariants={setselectedVariants}
                        additionalPlans={additionalPlans}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AdditionalPlansBuyButtons
                        handleSecondaryButtonClick={handleNotAddingAdditionalPlans}
                        handleSubmitPayment={handleSubmitPayment}
                        secondaryButtonLabel="No quiero agregar ningún producto adicional"
                        totalValue={totalValue}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

CrossSellingStep.propTypes = {};
export default CrossSellingStep;
