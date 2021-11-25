// Utils & config
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { getAdditionalPlans } from "@helpers";
import { useSnackbar } from "notistack";
import { useStripe } from "@stripe/react-stripe-js";
import * as ga from "../../../helpers/ga";
const langs = require("../../../lang").crossSellingStep;

// External components
import { Box, Button, Container, Grid, Icon } from "@material-ui/core";
import TitleBuyFlow from "components/molecules/titleBuyFlow/titleBuyFlow";
import AdditionalPlansGrid from "../additionalPlansGrid/additionalPlansGrid";
import { useBuyFlow, useCrossSellingStore, useUserInfoStore } from "@stores";
import { Plan } from "types/plan";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core";

// Internal components
import SectionTitleBuyFlow from "../../molecules/sectionTitleBuyFlow/sectionTitleBuyFlow";

// Images & icons
import Payment from "@material-ui/icons/Payment";
import { CustomButton, RoundedButton, SimpleAccordion } from "@atoms";
import { PlanVariant } from "types/planVariant";
import {
    createManySubscriptions,
    handle3dSecureFailure,
    handle3dSecureFailureForManySubscriptions,
} from "helpers/serverRequests/subscription";
import AdditionalPlansBuyButtons from "components/molecules/additionalPlansBuyButtons/additionalPlansBuyButtons";
import { updatePaymentOrderState } from "helpers/serverRequests/paymentOrder";
import { PaymentOrderState } from "types/paymentOrderState";
import { localeRoutes, Routes } from "lang/routes/routes";
import { useLang } from "@hooks";

const CrossSellingStep = (props) => {
    const theme = useTheme();
    const { form, resetBuyFlowState } = useBuyFlow((state) => ({ form: state.form, resetBuyFlowState: state.resetBuyFlowState }));
    const router = useRouter();
    const lang = langs[router.locale];
    const [faqsLang] = useLang("faqsSection");
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();
    const [additionalPlans, setadditionalPlans] = useState<Plan[]>([]);
    const [selectedVariants, setselectedVariants] = useState<PlanVariant[]>([]);
    const [variantsToPay, setvariantsToPay] = useState<PlanVariant[]>([]);
    // const selectedPlans = useCrossSellingStore((state) => state.selectedPlans);
    const [isLoadingPayment, setisLoadingPayment] = useState(false);
    const stripe = useStripe();

    useEffect(() => {
        window.scrollTo(0, 0);
        const getAdditionalPlansByPlanId = async () => {
            const res = await getAdditionalPlans(router.locale, form.planCode);

            if (res.status === 200) {
                setadditionalPlans(res.data.filter((plan) => plan.isActive));
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };
        getAdditionalPlansByPlanId();
    }, []);

    const totalValue = useMemo(() => {
        return variantsToPay.reduce((acc, variant) => (variant.priceWithOffer ? acc + variant.priceWithOffer : acc + variant.price), 0);
    }, [variantsToPay]);

    const handleSubmitPayment = async () => {
        ga.event({
            action: "clic en pagar productos adicionales",
            params: {
                event_category: "cross-selling",
                event_label: "agregar productos adicionales",
            },
        });

        setisLoadingPayment(true);

        const variants = variantsToPay.map((variant) => ({
            planId: variant.planId,
            variant: { id: variant.id },
            frequency: variant.frequency,
        }));

        // ga.purchase({
        //     transaction_id: res.data.subscriptionId,
        //     affiliation: "Let's cook website",
        //     value: 0,
        //     currency: "EUR",
        //     tax: 0,
        //     shipping: 0,
        //     items: [
        //         {
        //             id: "",
        //             name: "",
        //             category: "",
        //             quantity: 0,
        //             price: 0
        //         }
        //     ]
        // })

        const res = await createManySubscriptions(userInfo.id, variants);

        if (res.status === 200) {
            if (res.data.payment_status === "requires_action") {
                const confirmationResponse = await stripe.confirmCardPayment(res.data.client_secret, {
                    payment_method: form.paymentMethod?.stripeId,
                });

                if (confirmationResponse.paymentIntent && confirmationResponse.paymentIntent.status === "succeeded") {
                    // TO DO: Confirm payments in DB

                    await updatePaymentOrderState(res.data.paymentOrderId, PaymentOrderState.PAYMENT_ORDER_BILLED);
                    await router.push(localeRoutes[router.locale][Routes.perfil]);
                    resetBuyFlowState();
                } else {
                    await handle3dSecureFailureForManySubscriptions(res.data.subscriptionsIds);
                    enqueueSnackbar(
                        confirmationResponse.error ? confirmationResponse.error.message : "Error al autenticar el método de pago",
                        { variant: "error" }
                    );
                }
            } else if (res.data.payment_status === "succeeded") {
                await router.push(localeRoutes[router.locale][Routes.perfil]);
                resetBuyFlowState();
            } else {
                enqueueSnackbar("Error al completar el pago", { variant: "error" });
            }
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisLoadingPayment(false);
    };

    const handleNotAddingAdditionalPlans = async () => {
        ga.event({
            action: "clic en no quiero añadir ningun adicional",
            params: {
                event_category: "cross-selling",
                event_label: "no quiero añadir ningun adicional",
            },
        });
        await router.push(localeRoutes[router.locale][Routes.perfil]);
        resetBuyFlowState();
    };

    return (
        <Container maxWidth="lg" style={{ paddingTop: theme.spacing(8) }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleBuyFlow
                        title={form.recipes.length > 0 ? lang.title.recipesChosen : lang.title.withoutRecipes}
                        subtitle={lang.subtitle}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                    <AdditionalPlansGrid
                        selectedVariants={selectedVariants}
                        setselectedVariants={setselectedVariants}
                        additionalPlans={additionalPlans}
                        variantsToPay={variantsToPay}
                        setvariantsToPay={setvariantsToPay}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AdditionalPlansBuyButtons
                        handleSecondaryButtonClick={handleNotAddingAdditionalPlans}
                        handleSubmitPayment={handleSubmitPayment}
                        primaryButtonLabel={lang.purchaseBtnText}
                        secondaryButtonLabel={lang.goToProfileBtnText}
                        totalValue={totalValue}
                        isLoadingPayment={isLoadingPayment}
                    />
                </Grid>
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
        </Container>
    );
};

CrossSellingStep.propTypes = {};
export default CrossSellingStep;
