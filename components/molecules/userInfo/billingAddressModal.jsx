import React, { useState } from "react";
import { getGeometry } from "../../../helpers/utils/geocode";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Internal Components
import Modal from "../../atoms/modal/modal";
import LocationSearchInput from "../../atoms/locationSearchInput/locationSearchiInput";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const BillingAddressModal = (props) => {
    const isMdUp = useMediaQuery("(min-width:960px)");
    const classes = useStyles();
    const [formData, setformData] = useState({
        addressName: props.billingData.addressName,
        details: props.billingData.details,
        customerName: props.billingData.customerName,
        identification: props.billingData.identification,
        latitude: props.billingData.latitude,
        longitude: props.billingData.longitude,
    });

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleGoogleInput = async (address) => {
        const geometry = await getGeometry(address.structured_formatting.main_text);

        setformData({
            ...formData,
            addressName: address.description,
            latitude: geometry.lat,
            longitude: geometry.lng,
        });
    };

    const handleSubmit = () => {
        props.handleSubmit(formData);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title="Modificar direccion de facturacion"
            fullScreen
            handlePrimaryButtonClick={handleChangeBillingAddress}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            handlePrimaryButtonClick={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{ fontSize: isMdUp ? "22px" : "20px" }}>
                        Modificar direccion de facturacion
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <LocationSearchInput name="addressName" handleChange={handleGoogleInput} value={formData.addressName} />
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="Piso / Puerta / Aclaraciones"
                            variant="outlined"
                            name="details"
                            fullWidth
                            value={formData.details}
                            onChange={handleChange}
                        />
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="Nombre Completo"
                            variant="outlined"
                            fullWidth
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                        />
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="DNI/NIE/CIF"
                            fullWidth
                            variant="outlined"
                            name="identification"
                            value={formData.identification}
                            onChange={handleChange}
                        />
                    </form>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default BillingAddressModal;
