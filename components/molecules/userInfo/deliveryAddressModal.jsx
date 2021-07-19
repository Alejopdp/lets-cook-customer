import React, { useState, useEffect } from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

// Internal Components
import Modal from "../../atoms/modal/modal";
import PreferredDeliveryTimeInput from "../../atoms/preferredDeliveryTimeInput/preferredDeliveryTimeInput";
import LocationSearchInput from "../../atoms/locationSearchInput/locationSearchiInput";
import { getGeometry } from "../../../helpers/utils/geocode";

const DeliveryAddressModal = (props) => {
    const theme = useTheme();
    const [formData, setformData] = useState({
        name: props.shippingAddress.name,
        details: props.shippingAddress.details,
        preferredShippingHour: props.shippingAddress.preferredShippingHour,
        latitude: props.shippingAddress.latitude,
        longitude: props.shippingAddress.longitude,
    });

    const handleChangeDeliveryAddress = () => {
        props.handlePrimaryButtonClick(formData);
    };

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
            title="Modificar direccion de entrega"
            fullScreen
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            handlePrimaryButtonClick={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <LocationSearchInput name="name" handleChange={handleGoogleInput} value={formData.name} />
                </Grid>

                <Grid item xs={12}>
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
