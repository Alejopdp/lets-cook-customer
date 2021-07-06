import React, { useState } from "react";

import { useMediaQuery } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, Grid, makeStyles, TextField } from "@material-ui/core";

import Modal from "../../atoms/modal/modal";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "29ch",
            [theme.breakpoints.down("sm")]: {
                width: "36ch",
            },
        },
        marginLeft: "-0.6rem",
    },
    textfield: {
        "& > *": {
            margin: theme.spacing(1),
            width: "69.5ch",
            [theme.breakpoints.down("sm")]: {
                width: "41ch",
            },
        },
        marginLeft: "-0.6rem",
        marginBottom: ".6rem",
    },
}));

const PaymentMethodModal = (props) => {
    const isMdUp = useMediaQuery("(min-width:960px)");
    const classes = useStyles();

    const [value, setValue] = useState("");
    const [card, setCard] = useState(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClickCard = () => {
        setCard(!card);
        setNewPaymentMethod(false);
    };

    const handleClickPaymentMethod = () => {
        setCard(false);
        setNewPaymentMethod(!newPaymentMethod);
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
                    <FormControlLabel value="card" control={<Radio />} label="Mis tarjetas guardadas" onClick={() => handleClickCard()} />
                    {card ? (
                        <div style={{ marginLeft: "2rem" }}>
                            <FormControlLabel value="visa" control={<Radio />} label="Visa terminada en 1234 - Expira el 12/25" />
                            <FormControlLabel
                                value="mastercard"
                                control={<Radio />}
                                label="MasterCard terminada en 1234 - Expira el 12/25"
                            />
                        </div>
                    ) : null}
                    <FormControlLabel
                        value="newPaymentMehod"
                        control={<Radio />}
                        label="Ingresar nuevo metodo de pago"
                        onClick={() => handleClickPaymentMethod()}
                    />
                    {newPaymentMethod ? (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            boton 1
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            boton 2
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <form className={classes.textfield} noValidate autoComplete="off">
                                                <TextField id="outlined-basic" label="Direccion de Entrega" variant="outlined" />
                                            </form>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
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
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <form noValidate autoComplete="off">
                                                <TextField className={classes.root} id="outlined-basic" label="CVC" variant="outlined" />
                                            </form>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    ) : null}
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
