import React, { useState, useEffect } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import StripeForm from "../stripeForm/stripeForm";
import { useSnackbar } from "notistack";
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, Grid, makeStyles, TextField, useTheme } from "@material-ui/core";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import Modal from "../../atoms/modal/modal";

const PaymentMethodModal = (props) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const stripe = useStripe();
    const elements = useElements();
    const [value, setValue] = useState("card");
    const [selectedSavedCard, setselectedSavedCard] = useState("");

    useEffect(() => {
        const defaultPaymentMethod = props.initialData.find((paymentMethod) => paymentMethod.isDefault);

        if (!!defaultPaymentMethod) {
            setselectedSavedCard(defaultPaymentMethod.id);
        }
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

    const handleAddPaymentMethod = async () => {
        const { error, paymentMethod } = await handleNewStripePaymentMethod();

        if (!!error) {
            enqueueSnackbar(error.message, { variant: "error" });
            return;
        }

        props.handleAddPaymentMethod(paymentMethod.id);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title="Modificar metodo de pago"
            fullScreen
            handlePrimaryButtonClick={handleSubmit}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangePaymentMethod}>
                    <FormControlLabel value="card" control={<Radio />} label="Mis tarjetas guardadas" />
                    {value === "card" ? (
                        <RadioGroup
                            aria-label="gender"
                            name="savedCards"
                            value={selectedSavedCard}
                            onChange={(e) => setselectedSavedCard(e.target.value)}
                            style={{ marginLeft: "2rem" }}
                        >
                            {props.initialData.map((paymentMethod) => (
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
                        label="Ingresar nuevo metodo de pago"
                        // onClick={() => handleClickPaymentMethod()}
                    />
                    {value === "newPaymentMethod" ? <StripeForm /> : null}
                </RadioGroup>
            </FormControl>
            <div style={{ display: "flex", marginTop: ".7rem", alignItems: "center" }}>
                <ErrorOutlineIcon style={{ color: "red" }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>El metodo de pago se modificara en todos los planes activos</i>
            </div>
        </Modal>
    );
};

export default PaymentMethodModal;
