import React, { useState } from "react";
import { getGeometry } from "../../../helpers/utils/geocode";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Internal Components
import Modal from "../../atoms/modal/modal";
import LocationSearchInput from "../../atoms/locationSearchInput/locationSearchiInput";

const BillingAddressModal = (props) => {
    const lang = props.lang;

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
            title={lang.title}
            fullScreen
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            handlePrimaryButtonClick={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <LocationSearchInput name="addressName" handleChange={handleGoogleInput} value={formData.addressName} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label={lang.details}
                        variant="outlined"
                        name="details"
                        fullWidth
                        value={formData.details}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label={lang.customerName}
                        variant="outlined"
                        fullWidth
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label={lang.identification}
                        fullWidth
                        variant="outlined"
                        name="identification"
                        value={formData.identification}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default BillingAddressModal;
