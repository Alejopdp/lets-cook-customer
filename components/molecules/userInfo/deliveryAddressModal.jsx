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
import LocationSearchInput from "../../atoms/locationSearchInput/locationSearchiInput";
import { getGeometry } from "../../../helpers/utils/geocode";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const DeliveryAddressModal = (props) => {
    const isMdUp = useMediaQuery("(min-width:960px)");

    const classes = useStyles();

    const [formData, setformData] = useState({
        name: props.shippingAddress.name,
        details: props.shippingAddress.details,
        preferredShippingHour: props.shippingAddress.preferredShippingHour,
        latitude: props.shippingAddress.latitude,
        longitude: props.shippingAddress.longitude,
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
            name: address.description,
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
            fullScreen={isMdUp ? false : true}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            handlePrimaryButtonClick={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{ fontSize: isMdUp ? "22px" : "20px" }}>
                        Modificar direccion de entrega
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <LocationSearchInput name="name" handleChange={handleGoogleInput} value={formData.name} />
                    </form>
                </Grid>

                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            name="details"
                            fullWidth
                            id="outlined-basic"
                            label="Piso / Puerta / Aclaraciones"
                            variant="outlined"
                            value={formData.details}
                            onChange={handleChange}
                            // style={{ width: "97%", marginTop: ".5rem" }}
                        />
                    </form>
                </Grid>

                <Grid item xs={12}>
                    <PreferredDeliveryTimeInput />
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
