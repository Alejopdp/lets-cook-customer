// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { createSubscription } from "../../../helpers/serverRequests/subscription";
import { useSnackbar } from "notistack";

// External components
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";

// Internal components
import { FormPaperWithIcons } from "@molecules";
import StripeForm from "../../molecules/stripeForm/stripeForm";
import { CustomCheckbox, CustomButton, RoundedButton } from "@atoms";
import { useRouter } from "next/router";
import PaymentMethodForm from "../paymentMethodForm/paymentMethodForm";
import { useBuyFlow, useUserInfoStore } from "@stores";
import { Grid, Typography, useTheme } from '@material-ui/core'

export const PaymentForm = (props) => {
    const { chckbox } = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const userInfo = useUserInfoStore(({ userInfo }) => userInfo);
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    const stripe = useStripe();
    const [isLoadingPayment, setisLoadingPayment] = useState(false);
    const elements = useElements();
    const { enqueueSnackbar } = useSnackbar();
    const { setPaymentMethod, form, setFirstOrderId, setSubscriptionId } = useBuyFlow(
        ({ setPaymentMethod, form, setFirstOrderId, setSubscriptionId }) => ({ setPaymentMethod, form, setFirstOrderId, setSubscriptionId })
    );
    
    const handleOnChange = () => {
        router.push("/aviso-legal");
    };

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
        setisLoadingPayment(true);
        if (form.paymentMethod.type === "newPaymentMethod") {
            await handleStripePaymentMethod();
        }

        const data = {
            customerId: userInfo.id || "f031ca8c-647e-4d0b-8afc-28e982068fd5", // Get customer id from zustand
            planId: form.planCode,
            planVariantId: form.variant ?.id,
            planFrequency: "Semanal",
            restrictionComment: form.deliveryForm.restrictions || "No puedo comer alimentos con lactosa", // Add restriction comment
            couponId: "",
            stripePaymentMethodId: form.paymentMethod ?.stripeId, // Add if it is a new payment method
            paymentMethodId: form.paymentMethod ?.id, // Add if customer uses an already saved payment method
            addressName: form.deliveryForm ?.addressName,
            addressDetails: form.deliveryForm ?.addressDetails,
            latitude: form.deliveryForm ?.latitude,
            longitude: form.deliveryForm ?.longitude,
            customerFirstName: form.deliveryForm ?.firstName,
            customerLastName: form.deliveryForm ?.lastName,
            phone1: form.deliveryForm ?.phone1,
        };

        const res = await createSubscription(data);

        if (res.status === 200) {
            if (res.data.payment_status === "requires_action") {
                await stripe.confirmCardPayment(res.data.client_secret, {
                    payment_method: form.paymentMethod ?.stripeId,
                });
            }
            enqueueSnackbar("Suscripción creada con éxito", { variant: "success" });
            console.log("RES: DATA: ", res.data);
            setSubscriptionId(res.data.subscriptionId);
            setFirstOrderId(res.data.firstOrderId);
            gotToNextView();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisLoadingPayment(false);
    };

    return (
        <FormPaperWithIcons title="Métodos de pago" initialIcon="/icons/checkout/metodos-de-pago.svg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <HttpsOutlinedIcon fontSize='small' />
                        <Typography variant='body2' style={{ fontSize: '14px', marginLeft: theme.spacing(1), marginRight: theme.spacing(2) }}>
                            Pago seguro y garantizado
                    </Typography>
                        <img src='/icons/checkout/powered-by-stripe.png' alt='stripe' style={{ height: '24px' }} />
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
                    <CustomCheckbox
                        name="acceptTerms"
                        label={
                            <p style={{ fontSize: '13px' }}>
                                He leído y acepto las <b>condiciones generales de venta</b>
                            </p>
                        }
                        className={chckbox}
                        checked={props.checked}
                        handleChange={props.onChange}
                    // rediretTo='/aviso-legal'
                    />
                </Grid>
                <Grid item xs={12}>
                    <RoundedButton label="Realizar pago" disabled={props.disabled} onClick={handleSubmitPayment} style={{ width: '100%' }} />
                </Grid>
            </Grid>
        </FormPaperWithIcons>
    );
};

export default PaymentForm;
