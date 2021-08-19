// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { createSubscription, handle3dSecureFailure } from "../../../helpers/serverRequests/subscription";
import { useSnackbar } from "notistack";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import * as ga from '../../../helpers/ga'


// External components
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Image from "next/image";
import Checkbox from "@material-ui/core/Checkbox";

// Internal components
import { FormPaperWithIcons } from "@molecules";
import StripeForm from "../../molecules/stripeForm/stripeForm";
import { CustomCheckbox, CustomButton, RoundedButton } from "@atoms";
import { useRouter } from "next/router";
import PaymentMethodForm from "../paymentMethodForm/paymentMethodForm";
import { useBuyFlow, useUserInfoStore } from "@stores";
import { Grid, Typography, useTheme } from "@material-ui/core";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@hooks";
import { updatePaymentOrderState } from "helpers/serverRequests/paymentOrder";
import { PaymentOrderState } from "types/paymentOrderState";

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
    const { chckbox } = useStyles();
    const classes = useStylesAccordion();
    const { getFromLocalStorage, saveInLocalStorage } = useLocalStorage();
    const theme = useTheme();
    const router = useRouter();
    const { userInfo, setuserInfo } = useUserInfoStore(({ userInfo, setuserInfo }) => ({ userInfo, setuserInfo }));
    // const gotToNextView = useBuyFlow(({ forward }) => forward);
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
        }) => ({
            setPaymentMethod,
            form,
            setFirstOrderId,
            setSubscriptionId,
            setFirstOrderShippingDate,
            setDeliveryInfo,
            forward,
            moveNSteps,
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
            action: 'clic en realizar pago',
            params: {
                event_category: 'checkout',
                event_label: 'metodos de pago',
            }
        })

        setisLoadingPayment(true);

        if (form.paymentMethod.type === "newPaymentMethod") {
            const stripeRes = await handleStripePaymentMethod();
            if (stripeRes.error) return;
        }

        const data = {
            customerId: userInfo.id || "f031ca8c-647e-4d0b-8afc-28e982068fd5", // Get customer id from zustand
            planId: form.planCode,
            planVariantId: form.variant ?.id,
            planFrequency: "weekly",
            restrictionComment: props.deliveryData.restrictions || "No puedo comer alimentos con lactosa", // Add restriction comment
            couponId: form.coupon ?.id,
            stripePaymentMethodId: form.paymentMethod ?.stripeId, // Add if it is a new payment method
            paymentMethodId: form.paymentMethod ?.id, // Add if customer uses an already saved payment method
            addressName: props.deliveryData.addressName,
            addressDetails: props.deliveryData.addressDetails,
            latitude: props.deliveryData.latitude,
            longitude: props.deliveryData.longitude,
            customerFirstName: props.deliveryData.firstName,
            customerLastName: props.deliveryData.lastName,
            phone1: props.deliveryData.phone1,
        };

        const res = await createSubscription(data);

        if (res.status === 200) {
            if (res.data.payment_status === "requires_action") {
                const confirmationResponse = await stripe.confirmCardPayment(res.data.client_secret, {
                    payment_method: form.paymentMethod ?.stripeId,
                });

                if (confirmationResponse.paymentIntent && confirmationResponse.paymentIntent.status === "succeeded") {
                    // TO DO: Confirm payments in DB
                    await updatePaymentOrderState(res.data.paymentOrderId, PaymentOrderState.PAYMENT_ORDER_BILLED);
                    enqueueSnackbar("Suscripción creada con éxito", { variant: "success" });
                    setSubscriptionId(res.data.subscriptionId);
                    setFirstOrderId(res.data.firstOrderId);
                    setFirstOrderShippingDate(res.data.firstOrderShippingDate);
                    setDeliveryInfo({
                        ...form.deliveryForm,
                        ...props.deliveryData,
                    });
                    updateUserInfoStoreIfNecessary(res.data.customerPaymentMethods);
                    form.canChooseRecipes ? goToNextView() : moveNSteps(2);
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
                } else {
                    // TO DO: Reject payment in DB
                    await handle3dSecureFailure(res.data.subscriptionId);
                    enqueueSnackbar(
                        confirmationResponse.error ? confirmationResponse.error.message : "Error al autenticar el método de pago",
                        { variant: "error" }
                    );
                }
            } else if (res.data.payment_status === "succeeded") {
                enqueueSnackbar("Suscripción creada con éxito", { variant: "success" });
                setSubscriptionId(res.data.subscriptionId);
                setFirstOrderId(res.data.firstOrderId);
                setFirstOrderShippingDate(res.data.firstOrderShippingDate);
                setDeliveryInfo({
                    ...form.deliveryForm,
                    ...props.deliveryData,
                });
                updateUserInfoStoreIfNecessary(res.data.customerPaymentMethods);
                form.canChooseRecipes ? goToNextView() : moveNSteps(2);
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
            } else {
                enqueueSnackbar("Error al completar el pago", { variant: "error" });
            }
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisLoadingPayment(false);
    };

    const updateUserInfoStoreIfNecessary = (paymentMethods) => {
        if (!!!userInfo.shippingAddress || !!!userInfo.paymentMethods || userInfo.paymentMethods.length === 0) {
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
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{ cursor: "default", pointerEvents: "none" }}
                >
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid item className={classes.title}>
                            <Image src="/icons/checkout/metodos-de-pago.svg" height={32} width={32} />
                            <Typography variant="h6" color="textSecondary" className={classes.titleMargin}>
                                Métodos de pago
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
                                    Pago seguro y garantizado
                                </Typography>
                                <img src="/icons/checkout/powered-by-stripe.png" alt="stripe" style={{ height: "24px" }} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <PaymentMethodForm
                                paymentMethods={userInfo.paymentMethods || []}
                                selectedOption={form.paymentMethod ?.type}
                                setselectedOption={(e) => handlePaymentMethodTypeChange(e)}
                                selectedSavedCard={form.paymentMethod ?.id}
                                setselectedSavedCard={(e) => handleSelectedCardChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={areTermsAccepted} onChange={() => setareTermsAccepted(!areTermsAccepted)} color="primary" name='acceptTerms' />
                                <Typography variant='body2' color='textSecondary' style={{ fontSize: '13px', marginLeft: theme.spacing(0.5) }}>
                                    He leído y acepto las <b onClick={props.handleOpenPurchaseConditionsModal} style={{ cursor: 'pointer' }}>condiciones generales de venta</b>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <RoundedButton
                                label="Realizar pago"
                                disabled={isPayButtonDisabled() || isLoadingPayment}
                                onClick={handleSubmitPayment}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default PaymentForm;
