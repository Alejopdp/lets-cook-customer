// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { createSubscription, handle3dSecureFailure, sendNewSubscriptionWelcomeEmail } from "../../../helpers/serverRequests/subscription";
import { useSnackbar } from "notistack";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import * as ga from "../../../helpers/ga";

// External components
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Image from "next/image";

// Internal components
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";
import PaymentMethodForm from "../paymentMethodForm/paymentMethodForm";
import { useBuyFlow, useUserInfoStore } from "@stores";
import { Grid, Typography, useTheme } from "@material-ui/core";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@hooks";
import { updatePaymentOrderState } from "helpers/serverRequests/paymentOrder";
import { PaymentOrderState } from "types/paymentOrderState";
import CustomCheckboxWithPopup from "../../atoms/customCheckbox/customCheckboxWithPopup";
import { subscribeToMailingListGroup, updateSubscriber } from "helpers/serverRequests/mailingList";

const useStylesAccordion = makeStyles((theme: Theme) =>
    createStyles({
        accordionContainer: {
            padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
            borderRadius: "8px !important",
            boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
            webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
            mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        },
        title: {
            display: "flex",
            alignItems: "center",
        },
        titleMargin: {
            marginLeft: theme.spacing(1.5),
        },
        alignIcons: {
            display: "flex",
            alignItems: "center",
        },
    })
);

export const PaymentForm = (props) => {
    const lang = props.lang;
    const classes = useStylesAccordion();
    const { getFromLocalStorage, saveInLocalStorage } = useLocalStorage();
    const theme = useTheme();
    const router = useRouter();
    const { userInfo, setuserInfo } = useUserInfoStore(({ userInfo, setuserInfo }) => ({ userInfo, setuserInfo }));
    const stripe = useStripe();
    const [isLoadingPayment, setisLoadingPayment] = useState(false);
    const elements = useElements();
    const { enqueueSnackbar } = useSnackbar();
    const {
        setPaymentMethod,
        form,
        setFirstOrderId,
        setSubscriptionId,
        setFirstOrderShippingDate,
        setDeliveryInfo,
        forward: goToNextView,
        moveNSteps,
        setCoupon,
    } = useBuyFlow(
        ({
            setPaymentMethod,
            form,
            setFirstOrderId,
            setSubscriptionId,
            setFirstOrderShippingDate,
            setDeliveryInfo,
            forward,
            moveNSteps,
            setCoupon,
        }) => ({
            setPaymentMethod,
            form,
            setFirstOrderId,
            setSubscriptionId,
            setFirstOrderShippingDate,
            setDeliveryInfo,
            forward,
            moveNSteps,
            setCoupon,
        })
    );
    const [areTermsAccepted, setareTermsAccepted] = useState(false);

    const handlePaymentMethodTypeChange = (e) => {
        const value = e.target.value;
        setPaymentMethod({
            id: "",
            stripeId: "",
            type: value,
        });
    };

    const handleSelectedCardChange = (e) => {
        const value = e.target.value;

        setPaymentMethod({
            ...form.paymentMethod,
            id: value,
            stripeId: "",
        });
    };

    const handleStripePaymentMethod = async () => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
        });

        if (!!!error) setPaymentMethod({ ...form.paymentMethod, stripeId: paymentMethod.id });
        else {
            enqueueSnackbar(error.message, { variant: "error" });
        }

        return { error, paymentMethod };
    };

    const handleSubmitPayment = async () => {
        ga.event({
            action: "clic en realizar pago",
            params: {
                event_category: "checkout",
                event_label: "métodos de pago",
            },
        });

        setisLoadingPayment(true);
        if (form.paymentMethod.type === "newPaymentMethod" || !!!userInfo.paymentMethods || userInfo.paymentMethods?.length === 0) {
            const stripeRes = await handleStripePaymentMethod();
            if (stripeRes.error) return;
        }

        const data = {
            customerId: userInfo.id || "f031ca8c-647e-4d0b-8afc-28e982068fd5", // Get customer id from zustand
            planId: form.planCode,
            planVariantId: form.variant?.id,
            planFrequency: "weekly",
            restrictionComment: props.deliveryData.restrictions || "", // Add restriction comment
            couponId: form.coupon?.id,
            stripePaymentMethodId: form.paymentMethod?.stripeId, // Add if it is a new payment method
            paymentMethodId: form.paymentMethod?.id, // Add if customer uses an already saved payment method
            addressName: props.deliveryData.addressName,
            addressDetails: props.deliveryData.addressDetails,
            latitude: props.deliveryData.latitude,
            longitude: props.deliveryData.longitude,
            customerFirstName: props.deliveryData.firstName,
            customerLastName: props.deliveryData.lastName,
            phone1: props.deliveryData.phone1,
            shippingCity: props.deliveryData.city,
            shippingProvince: props.deliveryData.province,
            shippingCountry: props.deliveryData.country,
            shippingPostalCode: props.deliveryData.postalCode,
        };

        const res = await createSubscription(data, router.locale);

        if (res.status === 200) {
            if (res.data.payment_status === "requires_action") {
                const confirmationResponse = await stripe.confirmCardPayment(res.data.client_secret, {
                    payment_method: form.paymentMethod?.stripeId,
                });

                if (confirmationResponse.paymentIntent && confirmationResponse.paymentIntent.status === "succeeded") {
                    const updatePaymentOrderRes = await updatePaymentOrderState(
                        res.data.paymentOrderId,
                        PaymentOrderState.PAYMENT_ORDER_BILLED
                    );
                    setSubscriptionId(res.data.subscriptionId);
                    setFirstOrderId(res.data.firstOrderId);
                    setFirstOrderShippingDate(res.data.firstOrderShippingDate);
                    setDeliveryInfo({
                        ...form.deliveryForm,
                        ...props.deliveryData,
                    });
                    updateUserInfoStoreIfNecessary(res.data.customerPaymentMethods);
                    setCoupon({
                        id: "",
                        code: "",
                        discount_type: {
                            type: "",
                            value: null,
                        },
                        minimum_requirement: {
                            type: "none",
                            value: null,
                        },
                        apply_to: {
                            type: "all",
                            value: [],
                        },
                        limites: [],
                        coupons_by_subscription: {
                            type: "only_fee",
                            value: 0,
                        },
                        date_rage: {
                            start: "2021-07-16T12:47:00.000Z",
                            expire: "2021-07-24T12:51:00.000Z",
                        },
                    });
                    form.canChooseRecipes && Array.isArray(form.planRecipes) && form.planRecipes.length > 0
                        ? goToNextView()
                        : skipRecipeChoiceStep(res.data.subscriptionId, true);

                    router.push({ pathname: router.pathname, query: { checkout: true, ...router.query } }, undefined, { shallow: true });
                    subscribeToMailingListGroup("109309613", userInfo.email, {
                        planName: form.planName,
                        planVariantLabel: form.planDescription,
                    }).then((res) =>
                        updateSubscriber(userInfo.email, {
                            shopify_last_order_id: updatePaymentOrderRes.data.billedPaymentOrderHumanId,
                            shopify_tags: "Active subscriber",
                            shopify_last_order_name: `${form.planName} / ${form.variant.label}`,
                        })
                    );

                    //@ts-ignore
                    window.gtag("event", "conversion", {
                        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_2}/mpJaCLTs6aUBEKLy6twC`,
                        value: 1.0,
                        currency: "EUR",
                        transaction_id: "",
                    });

                    ga.purchase({
                        transaction_id: res.data.subscriptionId,
                        affiliation: "Let's cook website",
                        value: res.data.amountBilled,
                        currency: "EUR",
                        tax: res.data.tax,
                        shipping: res.data.shippingCost,
                        items: [
                            {
                                id: form.planCode,
                                name: form.planName,
                                category: "",
                                quantity: 1,
                                // price: form.plan,
                            },
                        ],
                    });
                } else {
                    // TO DO: Reject payment in DB
                    await handle3dSecureFailure(res.data.subscriptionId);
                    enqueueSnackbar(
                        confirmationResponse.error ? confirmationResponse.error.message : props.lang.snackbars.error.paymentAuthentication,
                        { variant: "error" }
                    );
                }
            } else if (res.data.payment_status === "succeeded") {
                setSubscriptionId(res.data.subscriptionId);
                setFirstOrderId(res.data.firstOrderId);
                setFirstOrderShippingDate(res.data.firstOrderShippingDate);
                setDeliveryInfo({
                    ...form.deliveryForm,
                    ...props.deliveryData,
                });
                updateUserInfoStoreIfNecessary(res.data.customerPaymentMethods);
                setCoupon({
                    id: "",
                    code: "",
                    discount_type: {
                        type: "",
                        value: null,
                    },
                    minimum_requirement: {
                        type: "none",
                        value: null,
                    },
                    apply_to: {
                        type: "all",
                        value: [],
                    },
                    limites: [],
                    coupons_by_subscription: {
                        type: "only_fee",
                        value: 0,
                    },
                    date_rage: {
                        start: "2021-07-16T12:47:00.000Z",
                        expire: "2021-07-24T12:51:00.000Z",
                    },
                });
                form.canChooseRecipes && Array.isArray(form.planRecipes) && form.planRecipes.length > 0
                    ? goToNextView()
                    : skipRecipeChoiceStep(res.data.subscriptionId, false);

                router.push({ pathname: router.pathname, query: { checkout: true, ...router.query } }, undefined, { shallow: true });

                subscribeToMailingListGroup("109309613", userInfo.email, {
                    planName: form.planName,
                    planVariantLabel: form.planDescription,
                });
                updateSubscriber(userInfo.email, {
                    shopify_last_order_id: res.data.billedPaymentOrderHumanId,
                    shopify_tags: "Active subscriber",
                    shopify_last_order_name: `${form.planName} / ${form.variant.label}`,
                });
                ga.purchase({
                    transaction_id: res.data.subscriptionId,
                    affiliation: "Let's cook website",
                    value: res.data.amountBilled,
                    currency: "EUR",
                    tax: res.data.tax,
                    shipping: res.data.shippingCost,
                    items: [
                        {
                            id: form.planCode,
                            name: form.planName,
                            category: "",
                            quantity: 1,
                            // price: form.plan,
                        },
                    ],
                });
            } else {
                enqueueSnackbar(props.lang.snackbars.error.completePayment, { variant: "error" });
            }
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisLoadingPayment(false);
    };

    const sendWelcomeEmail = async (subscriptionId) => {
        const res = await sendNewSubscriptionWelcomeEmail(subscriptionId);

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(props.lang.snackbars.error.completePayment.welcomeEmail, { variant: "error" });
        }
    };

    const skipRecipeChoiceStep = (subscriptionId, sendEmail) => {
        moveNSteps(2);
        if (sendEmail) sendWelcomeEmail(subscriptionId);
    };

    const updateUserInfoStoreIfNecessary = (paymentMethods) => {
        if (
            !!!userInfo.shippingAddress ||
            !!!userInfo.paymentMethods ||
            userInfo.paymentMethods.length === 0 ||
            userInfo.paymentMethods.length !== paymentMethods.length
        ) {
            setuserInfo({
                ...userInfo,
                firstName: props.deliveryData.firstName,
                lastName: props.deliveryData.lastName,
                phone1: props.deliveryData.phone1,
                shippingAddress: !!userInfo.shippingAddress
                    ? { ...userInfo.shippingAddress }
                    : {
                          addressDetails: props.deliveryData.addressDetails,
                          addressName: props.deliveryData.addressName,
                          latitude: props.deliveryData.latitude,
                          longitude: props.deliveryData.longitude,
                      },
                paymentMethods,
            });

            const oldUserInfo = getFromLocalStorage(LOCAL_STORAGE_KEYS.userInfo);
            const newUserInfo = {
                ...oldUserInfo,
                firstName: props.deliveryData.firstName,
                lastName: props.deliveryData.lastName,
                phone1: props.deliveryData.phone1,
                shippingAddress: { ...props.deliveryData },
                paymentMethods,
            };
            saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, newUserInfo);
        }
    };

    const isPayButtonDisabled = () => {
        // return isDeliveryFormIncomplete() || isPaymentFormIncomplete() || !!!areTermsAccepted;
        return isPaymentFormIncomplete() || !!!areTermsAccepted;
    };

    const isPaymentFormIncomplete = () => {
        return !!!form.paymentMethod;
    };

    return (
        <>
            <Accordion
                className={classes.accordionContainer}
                expanded={props.expanded === props.panelNumber}
                onChange={props.handleChangeAccordion(props.panelNumber)}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{ cursor: "default", pointerEvents: "none" }}
                >
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid item className={classes.title}>
                            <Image unoptimized src="/icons/checkout/métodos-de-pago.svg" height={32} width={32} />
                            <Typography variant="h6" color="textSecondary" className={classes.titleMargin}>
                                {lang.title}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <HttpsOutlinedIcon fontSize="small" />
                                <Typography
                                    variant="body2"
                                    style={{ fontSize: "14px", marginLeft: theme.spacing(1), marginRight: theme.spacing(2) }}
                                >
                                    {lang.securePaymentLabel}
                                </Typography>
                                <img src="/icons/checkout/powered-by-stripe.png" alt="stripe" style={{ height: "24px" }} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <PaymentMethodForm
                                lang={lang.paymentMethodForm}
                                paymentMethods={userInfo.paymentMethods || []}
                                selectedOption={form.paymentMethod?.type}
                                setselectedOption={(e) => handlePaymentMethodTypeChange(e)}
                                selectedSavedCard={form.paymentMethod?.id}
                                setselectedSavedCard={(e) => handleSelectedCardChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomCheckboxWithPopup
                                color="primary"
                                name="acceptTerms"
                                checked={areTermsAccepted}
                                onChange={() => setareTermsAccepted(!areTermsAccepted)}
                                label={lang.acceptTermsInputLabel.text}
                                boldText={lang.acceptTermsInputLabel.boldText}
                                handleOpenModal={props.handleOpenPurchaseConditionsModal}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                            <RoundedButton
                                label={lang.btnText}
                                disabled={isPayButtonDisabled() || isLoadingPayment}
                                isLoading={isLoadingPayment}
                                onClick={handleSubmitPayment}
                                style={{ width: "100%" }}
                            />
                            <Typography style={{ paddingTop: theme.spacing(1), textAlign: "center" }} variant="caption">
                                {lang.btnCaption}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default PaymentForm;
