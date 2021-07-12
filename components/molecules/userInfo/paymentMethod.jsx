import React, { useState, useEffect } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import StripeForm from "../../molecules/stripeForm/stripeForm";

import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, Grid, makeStyles, TextField, useTheme } from "@material-ui/core";

import Modal from "../../atoms/modal/modal";

const PaymentMethodModal = (props) => {
    const theme = useTheme();
    const [value, setValue] = useState("card");
    const [card, setCard] = useState("");

    const [value, setValue] = useState("");
    const [card, setCard] = useState(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState(false);
    const [selectedSavedCard, setselectedSavedCard] = useState("visa");

    const handleChangePaymentMethod = (event) => {
        setValue(event.target.value);
    };

    const handleChangeCards = (event) => {
        setCard(event.target.value);
    };

    const handleClickChangePaymentMethod = () => {
        props.handlePrimaryButtonClick(card);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title="Modificar metodo de pago"
            fullScreen
            handlePrimaryButtonClick={handleClickChangePaymentMethod}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{ fontSize: isMdUp ? "22px" : "20px" }}>
                        Modificar metodo de pago
                    </Typography>
                </Grid>
            </Grid>
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="card" control={<Radio />} label="Mis tarjetas guardadas" onClick={() => handleClickCard()} />
                    {value === "card" ? (
                        <RadioGroup
                            aria-label="gender"
                            name="savedCards"
                            value={selectedSavedCard}
                            onChange={(e) => setselectedSavedCard(e.target.value)}
                            style={{ marginLeft: "2rem" }}
                        >
                            <FormControlLabel value="visa" control={<Radio />} label="Visa terminada en 1234 - Expira el 12/25" />
                            <FormControlLabel
                                value="mastercard"
                                control={<Radio />}
                                label="MasterCard terminada en 1234 - Expira el 12/25"
                            />
                        </RadioGroup>
                    ) : null}
                    <FormControlLabel
                        value="newPaymentMethod"
                        control={<Radio />}
                        label="Ingresar nuevo metodo de pago"
                        onClick={() => handleClickPaymentMethod()}
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

{
    /* <>
                            <Grid item xs={12}>
                                boton 1
                            </Grid>
                            <Grid item xs={12}>
                                boton 2
                            </Grid>
                            <Grid item xs={12}>
                                <form className={classes.textfield} noValidate autoComplete="off">
                                    <TextField id="outlined-basic" label="Direccion de Entrega" variant="outlined" />
                                </form>
                            </Grid>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">
                                    <TextField
                                        className={classes.root}
                                        id="outlined-basic"
                                        label="Fecha de Vencimiento (MM/AA)"
                                        variant="outlined"
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">
                                    <TextField className={classes.root} id="outlined-basic" label="CVC" variant="outlined" />
                                </form>
                            </Grid>
                        </> */
}
