import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useStripe } from "@stripe/react-stripe-js";
import { Layout } from "@layouts";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import BackButtonTitle from "components/atoms/backButtonTitle/backButtonTitle";
import { Box, Grid, useTheme } from "@material-ui/core";
import AdditionalPlansGrid from "components/organisms/additionalPlansGrid/additionalPlansGrid";
import { RoundedButton } from "@atoms";
import AdditionalPlansBuyButtons from "components/molecules/additionalPlansBuyButtons/additionalPlansBuyButtons";
import { getAdditionalPlans, PlanVariant } from "@helpers";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { createManySubscriptions, handle3dSecureFailureForManySubscriptions } from "helpers/serverRequests/subscription";
import { useUserInfoStore } from "@stores";
import { updatePaymentOrderState } from "helpers/serverRequests/paymentOrder";
import { PaymentOrderState } from "types/paymentOrderState";

const NuevoAcompañamientoPage = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const [additionalPlans, setadditionalPlans] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedVariants, setselectedVariants] = useState<PlanVariant[]>([]);
    const [variantsToPay, setvariantsToPay] = useState<PlanVariant[]>([]);
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const stripe = useStripe();

    useEffect(() => {
        const getAdditionalPlanList = async () => {
            const res = await getAdditionalPlans(router.locale);

            if (res.status === 200) {
                setadditionalPlans(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getAdditionalPlanList();
    }, []);

    const totalValue = useMemo(() => {
        return variantsToPay.reduce((acc, variant) => (variant.priceWithOffer ? acc + variant.priceWithOffer : acc + variant.price), 0);
    }, [variantsToPay]);

    const handleSubmitPayment = async () => {
        const variants = variantsToPay.map((variant) => ({
            planId: variant.planId,
            variant: { id: variant.id },
            frequency: variant.frequency,
        }));
        const res = await createManySubscriptions(userInfo.id, variants);

        if (res.status === 200) {
            if (res.data.payment_status === "requires_action") {
                const confirmationResponse = await stripe.confirmCardPayment(res.data.client_secret, {
                    payment_method: res.data.paymentMethodId,
                });

                if (confirmationResponse.paymentIntent && confirmationResponse.paymentIntent.status === "succeeded") {
                    await updatePaymentOrderState(res.data.paymentOrderId, PaymentOrderState.PAYMENT_ORDER_BILLED);
                    await router.push("/perfil");
                } else {
                    await handle3dSecureFailureForManySubscriptions(res.data.subscriptionsIds);
                    enqueueSnackbar(
                        confirmationResponse.error ? confirmationResponse.error.message : "Error al autenticar el método de pago",
                        { variant: "error" }
                    );
                }
            } else if (res.data.payment_status === "succeeded") {
                enqueueSnackbar("Suscripción creada con éxito", { variant: "success" });
                await router.push("/perfil");
            } else {
                enqueueSnackbar("Error al completar el pago", { variant: "error" });
            }
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    return (
        <Layout disableCallToActionSection disableFooterSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url="/perfil" title={"Acompañamientos"} />
                <Grid item xs={12} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                    <AdditionalPlansGrid
                        selectedVariants={selectedVariants}
                        setselectedVariants={setselectedVariants}
                        variantsToPay={variantsToPay}
                        setvariantsToPay={setvariantsToPay}
                        additionalPlans={additionalPlans}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AdditionalPlansBuyButtons
                        totalValue={totalValue}
                        handleSubmitPayment={handleSubmitPayment}
                        handleSecondaryButtonClick={() => router.replace("/perfil")}
                        secondaryButtonLabel="POR EL MOMENTO NO QUIERO UN NUEVO ACOMPAÑAMIENTO"
                    />
                </Grid>
            </InnerSectionLayout>
        </Layout>
    );
};

NuevoAcompañamientoPage.propTypes = {};

export default NuevoAcompañamientoPage;
