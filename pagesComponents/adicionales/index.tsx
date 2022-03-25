import React, { useEffect, useMemo, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Layout } from "@layouts";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import BackButtonTitle from "components/atoms/backButtonTitle/backButtonTitle";
import { Box, Grid, useTheme } from "@material-ui/core";
import AdditionalPlansGrid from "components/organisms/additionalPlansGrid/additionalPlansGrid";
import { SimpleAccordion } from "@atoms";
import AdditionalPlansBuyButtons from "components/molecules/additionalPlansBuyButtons/additionalPlansBuyButtons";
import { getAdditionalPlans, PlanVariant } from "@helpers";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { createManySubscriptions, handle3dSecureFailureForManySubscriptions } from "helpers/serverRequests/subscription";
import { useUserInfoStore } from "@stores";
import { updatePaymentOrderState } from "helpers/serverRequests/paymentOrder";
import { PaymentOrderState } from "types/paymentOrderState";
import SectionTitleBuyFlow from "components/molecules/sectionTitleBuyFlow/sectionTitleBuyFlow";
import { localeRoutes, Routes } from "lang/routes/routes";
import { useLang } from "@hooks";
const langs = require("../../lang").crossSellingStep;

const NuevoAcompañamientoPage = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const lang = langs[router.locale];
    const [faqsLang] = useLang("faqsSection");
    const [additionalPlans, setadditionalPlans] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedVariants, setselectedVariants] = useState<PlanVariant[]>([]);
    const [variantsToPay, setvariantsToPay] = useState<PlanVariant[]>([]);
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const stripe = useStripe();

    useEffect(() => {
        const getAdditionalPlanList = async () => {
            const res = await getAdditionalPlans(router.locale, router.query.planId as string);

            if (res.status === 200) {
                setadditionalPlans(res.data.filter((plan) => plan.isActive));
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
        setIsSubmitting(true);
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
                    await router.push(localeRoutes[router.locale][Routes.perfil]);
                } else {
                    await handle3dSecureFailureForManySubscriptions(res.data.subscriptionsIds);
                    enqueueSnackbar(
                        confirmationResponse.error ? confirmationResponse.error.message : "Error al autenticar el método de pago",
                        { variant: "error" }
                    );
                }
            } else if (res.data.payment_status === "succeeded") {
                enqueueSnackbar("Suscripción creada con éxito", { variant: "success" });
                await router.push(localeRoutes[router.locale][Routes.perfil]);
            } else {
                enqueueSnackbar("Error al completar el pago", { variant: "error" });
            }
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }

        setIsSubmitting(false);
    };

    return (
        <Layout disableCallToActionSection disableFooterSection>
            <InnerSectionLayout containerMaxWidth="lg">
                <BackButtonTitle url={localeRoutes[router.locale][Routes.perfil]} title={"Adicionales"} />
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
                        primaryButtonLabel={lang.purchaseBtnText}
                        isLoadingPayment={isSubmitting}
                        // handleSecondaryButtonClick={() => router.replace("/perfil")}
                        // secondaryButtonLabel="POR EL MOMENTO NO QUIERO UN NUEVO ACOMPAÑAMIENTO"
                    />
                </Grid>
                <Grid container spacing={2} style={{ paddingBottom: theme.spacing(8), paddingTop: theme.spacing(8) }}>
                    <Grid item xs={12}>
                        <SectionTitleBuyFlow title={lang.faqs.title} subtitle={lang.faqs.subtitle} />
                        <Grid item xs={12} sm={8} style={{ margin: `0px auto 0px auto` }}>
                            <Grid container spacing={2}>
                                {faqsLang.sections[1].accordions.map((faq, index) => (
                                    <Grid item xs={12}>
                                        <SimpleAccordion question={faq.question} answer={faq.answer} key={index} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </InnerSectionLayout>
        </Layout>
    );
};

NuevoAcompañamientoPage.propTypes = {};

export default NuevoAcompañamientoPage;
