import React, { useState } from "react";
import { OtherAddressInformation, getFormattedAddressFromGoogle } from "helpers/utils/utils";

// External components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

// Internal Components
import Modal from "../../atoms/modal/modal";
import PreferredDeliveryTimeInput from "../../atoms/preferredDeliveryTimeInput/preferredDeliveryTimeInput";
import LocationSearchInput from "../../atoms/locationSearchInput/locationSearchiInput";
import { getGeometry } from "../../../helpers/utils/geocode";

const DeliveryAddressModal = (props) => {
    const lang = props.lang;
    const [formData, setformData] = useState({
        name: props.shippingAddress.addressName,
        details: props.shippingAddress.addressDetails,
        preferredShippingHour: props.shippingAddress.preferredShippingHour,
        latitude: props.shippingAddress.latitude,
        longitude: props.shippingAddress.longitude,
        city: props.shippingAddress.city,
        country: props.shippingAddress.country,
        postalCode: props.shippingAddress.postalCode,
        province: props.shippingAddress.province,
    });

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleGoogleInput = async (address) => {
        const response = await getGeometry(address.description);
        const moreAddresInformation: OtherAddressInformation = getFormattedAddressFromGoogle(response.results[0]?.address_components);

        setformData({
            ...formData,
            name: address.description,
            latitude: response.results[0].geometry.location.lat,
            longitude: response.results[0].geometry.location.lng,
            city: moreAddresInformation.city,
            province: moreAddresInformation.province,
            country: moreAddresInformation.country,
            postalCode: moreAddresInformation.postalCode,
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
                    <LocationSearchInput name="name" handleChange={handleGoogleInput} value={formData.name} label={""} disabled={false} />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="details"
                        fullWidth
                        id="outlined-basic"
                        label={lang.details}
                        variant="outlined"
                        value={formData.addressDetails}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <PreferredDeliveryTimeInput
                        handleChange={handleChange}
                        value={formData.preferredShippingHour}
                        name="preferredShippingHour"
                    />
                </Grid>
            </Grid>

            <div style={{ display: "flex", marginTop: ".7rem", alignItems: "center" }}>
                <ErrorOutlineIcon style={{ color: "red" }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>{lang.helperText}</i>
            </div>
        </Modal>
    );
};

export default DeliveryAddressModal;
