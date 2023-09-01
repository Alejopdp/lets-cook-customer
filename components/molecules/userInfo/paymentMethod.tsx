import React, { useState, useEffect } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import StripeForm from "../stripeForm/stripeForm";
import { useSnackbar } from "notistack";
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@material-ui/core";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import Modal from "../../atoms/modal/modal";
import { setupFuturePaymentMethod } from "../../../helpers/serverRequests/customer";
import { SetupIntent, StripeError } from "@stripe/stripe-js";

const PaymentMethodModal = (props) => {
    const lang = props.lang;
    const { enqueueSnackbar } = useSnackbar();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [value, setValue] = useState("card");
    const [selectedSavedCard, setselectedSavedCard] = useState("");

    useEffect(() => {
        const setupFuturePaymentMethodCall = async () => {
            const res = await setupFuturePaymentMethod(props.customerId);

            if (res && res.status === 200) {
                setClientSecret(res.data.client_secret);
            }
            setIsLoading(false);
        };
        const defaultPaymentMethod = props.initialData.find((paymentMethod) => paymentMethod.isDefault);

        if (!!defaultPaymentMethod) {
            setselectedSavedCard(defaultPaymentMethod.id);
        }

        setupFuturePaymentMethodCall();
    }, []);

    const handleChangePaymentMethod = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = async () => {
        if (value === "newPaymentMethod") {
            await handleAddPaymentMethod();
        } else {
            handleChangeDefaultPayment();
        }
    };

    const handleChangeDefaultPayment = async () => {
        await props.handleUpdateDefaultPaymentMethod(selectedSavedCard);
    };

    const handleNewStripePaymentMethod = async () => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
        });

        return { error, paymentMethod };
    };

    const handleSetupIntentConfirmation = async (paymentMethod: string): Promise<{ error: StripeError; setupIntent: SetupIntent }> => {
        props.handleClose();
        const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, { payment_method: paymentMethod });

        console.log("Error: ", error);
        console.log("Setup intent: ", setupIntent);
        if (!!error || !!!setupIntent) {
            props.handleOpen();
        } else {
            if (setupIntent.status === "requires_action") {
                enqueueSnackbar("3d secure", { variant: "success" });
            }
        }

        return { error, setupIntent };
    };
    const handleAddPaymentMethod = async () => {
        const { error, paymentMethod } = await handleNewStripePaymentMethod();

        if (!!error) {
            enqueueSnackbar(error.message, { variant: "error" });
            return;
        }

        const { error: setupIntentError, setupIntent } = await handleSetupIntentConfirmation(paymentMethod.id);

        if (!!setupIntentError) {
            enqueueSnackbar(setupIntentError.message, { variant: "error" });
            return;
        }

        props.handleAddPaymentMethod(paymentMethod.id);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title={lang.title}
            fullScreen
            handlePrimaryButtonClick={handleSubmit}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangePaymentMethod}>
                    <FormControlLabel value="card" control={<Radio />} label={lang.mySavedCards} />
                    {value === "card" ? (
                        <RadioGroup
                            aria-label="gender"
                            name="savedCards"
                            value={selectedSavedCard}
                            onChange={(e) => setselectedSavedCard(e.target.value)}
                            style={{ marginLeft: "2rem" }}
                        >
                            {props.initialData
                                .filter((pm) => pm.id !== "wallet")
                                .map((paymentMethod) => (
                                    <FormControlLabel
                                        value={paymentMethod.id}
                                        control={<Radio />}
                                        label={`${paymentMethod.card} - ${paymentMethod.expirationDate}`}
                                        checked={paymentMethod.id === selectedSavedCard}
                                    />
                                ))}
                        </RadioGroup>
                    ) : null}
                    <FormControlLabel
                        value="newPaymentMethod"
                        control={<Radio />}
                        label={lang.addNewPaymentMethod}
                        // onClick={() => handleClickPaymentMethod()}
                    />
                    {value === "newPaymentMethod" ? <StripeForm /> : null}
                </RadioGroup>
            </FormControl>
            <div style={{ display: "flex", marginTop: ".7rem", alignItems: "center" }}>
                <ErrorOutlineIcon style={{ color: "red" }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>{lang.helperText}</i>
            </div>
        </Modal>
    );
};

export default PaymentMethodModal;
