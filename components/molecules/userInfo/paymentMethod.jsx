import React, { useState } from "react";

import { useMediaQuery } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, Grid } from "@material-ui/core";

import Modal from "../../atoms/modal/modal";

const PaymentMethodModal = (props) => {
    const isMdUp = useMediaQuery("(min-width:960px)");

    const [value, setValue] = React.useState("female");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            fullScreen={isMdUp ? false : true}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ fontSize: isMdUp ? "22px" : "20px" }}>
                                Modificar metodo de pago
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="card" control={<Radio />} label="Mis tarjetas guardadas" />
                    <FormControlLabel value="newPaymentMehod" control={<Radio />} label="Ingresar nuevo metodo de pago" />
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
