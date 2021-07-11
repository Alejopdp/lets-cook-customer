import React, { useState, useEffect } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, Grid, makeStyles, TextField, useTheme } from "@material-ui/core";

import Modal from "../../atoms/modal/modal";


const PaymentMethodModal = (props) => {
    const theme = useTheme();
    const [value, setValue] = useState('card');
    const [card, setCard] = useState('');

    useEffect(() => {
        setCard(props.initialData.cards.filter(card => card.default === true)[0].id)
    }, [props.open]);

    const handleChangePaymentMethod = (event) => {
        setValue(event.target.value);
    };

    const handleChangeCards = (event) => {
        setCard(event.target.value);
    }

    const handleClickChangePaymentMethod = () => {
        props.handlePrimaryButtonClick(card)
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title='Modificar metodo de pago'
            fullScreen
            handlePrimaryButtonClick={handleClickChangePaymentMethod}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="paymentMethods" name="paymentMethods" value={value} onChange={handleChangePaymentMethod}>
                            <FormControlLabel value="card" control={<Radio />} label="Mis tarjetas guardadas" />
                            {value == 'card' && (
                                <div style={{ marginLeft: theme.spacing(4) }}>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="myCards" name="myCards" value={card} onChange={handleChangeCards}>
                                            {props.initialData.cards.map((card, index) => (
                                                <FormControlLabel key={index} value={card.id} control={<Radio />} label={`${card.name} - Expira el ${card.expirationDate}`} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            )}
                            <FormControlLabel value="newPaymentMehod" control={<Radio />} label="Ingresar nuevo metodo de pago" />
                            {value == 'newPaymentMehod' && (
                                <p>Stripe Elements</p>
                            )}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon style={{ color: "red", marginRight: theme.spacing(1) }} />
                    <i style={{ fontStyle: "italic" }}>El metodo de pago se modificara en todos los planes activos</i>
                </Grid>
            </Grid>
        </Modal>
    );
};



export default PaymentMethodModal;
