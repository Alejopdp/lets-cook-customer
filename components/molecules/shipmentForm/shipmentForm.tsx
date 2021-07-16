import React, { memo, useState, useEffect } from "react";
import { getGeometry } from "../../../helpers/utils/geocode";
import { getShippingCost } from "@helpers";

// External components
import { Box, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import Grid from "@material-ui/core/Grid";

// Internal components
import { FormPaperWithIcons } from "@molecules";
import { TextInput, CustomButton } from "@atoms";
import { ShipmentFormProps } from "./interfaces";
import { useBuyFlow, DeliveryForm, useUserInfoStore } from "@stores";
import LocationSearchInput from "components/atoms/locationSearchInput/locationSearchiInput";
import PhoneNumberInput from "components/atoms/phoneNumberInput/phoneNumberInput";

export const ShipmentForm = memo((props: ShipmentFormProps) => {
    const { setDeliveryInfo, form } = useBuyFlow(({ setDeliveryInfo, form }) => ({ setDeliveryInfo, form }));
    const userInfo = useUserInfoStore((state) => state.userInfo);

    useEffect(() => {
        const getShippingCostIfAddressExists = async () => {
            if (!userInfo.shippingAddress) return;

            const res = await getShippingCost(userInfo.shippingAddress?.latitude, userInfo.shippingAddress?.longitude);
            alert(res.data);

            if (res.status === 200) {
                setDeliveryInfo({
                    ...form.deliveryForm,
                    shippingCost: res.data,
                });
            }
        };

        getShippingCostIfAddressExists();
    }, []);

    const handleChange = (event) => {
        setDeliveryInfo({
            ...form.deliveryForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddressChange = async (newAddress) => {
        const geometry = await getGeometry(newAddress.structured_formatting.main_text);

        setDeliveryInfo({
            ...form.deliveryForm,
            addressName: newAddress.description,
            latitude: geometry.lat,
            longitude: geometry.lng,
        });
    };

    return (
        <FormPaperWithIcons title="Datos de entrega" initialIcon="/icons/checkout/informacion-de-envio.svg" finalIcons>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <LocationSearchInput value={form.deliveryForm?.addressName} handleChange={handleAddressChange} name="addressName" />
                </Grid>

                <Grid item xs={12}>
                    <TextInput
                        name="addressDetails"
                        label="Piso / puerta / aclaraciones"
                        value={form.deliveryForm.addressDetails}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextInput name="firstName" label="Nombre" value={form.deliveryForm.firstName} onChange={handleChange} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextInput name="lastName" label="Apellido/s" value={form.deliveryForm.lastName} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <PhoneNumberInput value={form.deliveryForm.phone1} name="phone1" handleChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" color="#F89719">
                        <ErrorIcon style={{ marginRight: "8px" }} />

                        <Typography variant="body1">
                            <b>Luego podrás cambiar los datos de entrega desde tu perfil</b>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body2" paragraph>
                        <b>¿Tienes alguna restricción a la hora de ingerir algún tipo de alimento?</b>
                    </Typography>

                    <TextInput
                        name="restrictions"
                        label="Ingrese aquí sus restricciones (solo si aplica)"
                        value={form.deliveryForm.restrictions}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <CustomButton text="Continuar" onClick={props.onClick} />
        </FormPaperWithIcons>
    );
});

export default ShipmentForm;
