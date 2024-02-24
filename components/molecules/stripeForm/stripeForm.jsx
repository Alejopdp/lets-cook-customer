// Utils & config
import React, { useState, useEffect } from "react";
import styles from "./stripeForm.module.scss";

// External components
import { CardNumberElement, CardCvcElement, CardExpiryElement, PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core";

// Internal components

const StripeForm = (props) => {
    const theme = useTheme();
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: "ES",
                currency: "eur",
                total: {
                    label: "Demo total",
                    amount: 1099,
                },
                requestPayerName: false,
                requestPayerEmail: false,
            });
            pr.canMakePayment()
                .then((result) => {
                    if (result) {
                        setPaymentRequest(pr);
                    }
                })
                .catch((err) => console.log("error: ", err));
        }
    }, [stripe]);

    const handleSubmit = () => {};
    return (
        <form onSubmit={handleSubmit}>
            {paymentRequest && <PaymentRequestButtonElement options={{ paymentRequest }} />}
            <CardNumberElement
                options={{
                    classes: { base: styles.cardElement },
                    style: { base: { color: theme.palette.primary.main, fontFamily: "Fraunces" } },
                }}
            />
            <Box display="flex" justifyContent="space-between">
                <Box flex={1} paddingRight={1}>
                    <CardExpiryElement
                        options={{
                            classes: { base: styles.cardElement + " " + styles.flex1 },
                            style: { base: { color: theme.palette.primary.main, fontFamily: "Fraunces" } },
                        }}
                    />
                </Box>
                <Box flex={1} paddingLeft={1}>
                    <CardCvcElement
                        options={{
                            classes: { base: styles.cardElement + " " + styles.flex1 },
                            style: { base: { color: theme.palette.primary.main, fontFamily: "Fraunces" } },
                        }}
                    />
                </Box>
            </Box>
        </form>
    );
};

StripeForm.propTypes = {};

export default StripeForm;
