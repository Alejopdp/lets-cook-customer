import React, { useState } from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

// Internal Components
import Modal from "../../atoms/modal/modal";
import PreferredDeliveryTimeInput from "../../atoms/preferredDeliveryTimeInput/preferredDeliveryTimeInput";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "30ch",
            [theme.breakpoints.down("sm")]: {
                width: "35ch",
            },
        },
        marginLeft: "-0.6rem",
    },
}));

const DeliveryAddressModal = (props) => {
    const isMdUp = useMediaQuery("(min-width:960px)");

    const classes = useStyles();

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
                                Modificar direccion de entrega
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Direccion de Entrega"
                                    variant="outlined"
                                    style={{ width: "97%", marginTop: "1rem" }}
                                />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Piso / Puerta / Aclaraciones"
                                    variant="outlined"
                                    style={{ width: "97%", marginTop: ".5rem" }}
                                />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PreferredDeliveryTimeInput />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ display: "flex", marginTop: ".7rem", alignItems: "center" }}>
                <ErrorOutlineIcon style={{ color: "red" }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>
                    La direccion de entrega se modificara en todos los planes activos
                </i>
            </div>
        </Modal>
    );
};

export default DeliveryAddressModal;
