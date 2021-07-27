import React, { memo, useState, useEffect } from "react";
import { getGeometry } from "../../../helpers/utils/geocode";
import { getShippingCost } from "@helpers";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// External components
import { Box, Typography, useTheme } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import Grid from "@material-ui/core/Grid";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Image from "next/image";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Internal components
import { FormPaperWithIcons } from "@molecules";
import { TextInput, CustomButton, RoundedButton } from "@atoms";
import { ShipmentFormProps } from "./interfaces";
import { useBuyFlow, DeliveryForm, useUserInfoStore } from "@stores";
import LocationSearchInput from "components/atoms/locationSearchInput/locationSearchiInput";
import PhoneNumberInput from "components/atoms/phoneNumberInput/phoneNumberInput";
import { useSnackbar } from "notistack";

// Icons & Images
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const useStylesAccordion = makeStyles((theme: Theme) =>
    createStyles({
        accordionContainer: {
            padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
            borderRadius: '8px !important',
            boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
            webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
            mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        },
        title: {
            display: "flex",
            alignItems: "center",
        },
        titleMargin: {
            marginLeft: theme.spacing(1.5)
        },
        alignIcons: {
            display: "flex",
            alignItems: "center"
        },
    }),
);



export const ShipmentForm = memo((props: ShipmentFormProps) => {
    const theme = useTheme();
    const classes = useStylesAccordion();
    const { setDeliveryInfo, form } = useBuyFlow(({ setDeliveryInfo, form }) => ({ setDeliveryInfo, form }));
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getShippingCostIfAddressExists = async () => {
            const newLatitude = form.deliveryForm ?.latitude || userInfo.shippingAddress ?.latitude;
            const newLongitude = form.deliveryForm ?.longitude || userInfo.shippingAddress ?.longitude;

            if (!!!newLatitude && !!!newLongitude) return;

            const res = await getShippingCost(newLatitude, newLongitude);

            if (res.status === 200) {
                setDeliveryInfo({
                    ...form.deliveryForm,
                    shippingCost: res.data,
                });
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getShippingCostIfAddressExists();
    }, [form.deliveryForm ?.latitude, form.deliveryForm ?.longitude]);

    const handleChange = (event) => {
        setDeliveryInfo({
            ...form.deliveryForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddressChange = async (newAddress) => {
        if (newAddress) {
            const geometry = await getGeometry(newAddress.structured_formatting.main_text);

            setDeliveryInfo({
                ...form.deliveryForm,
                addressName: newAddress.description,
                latitude: geometry.lat,
                longitude: geometry.lng,
            });
        }
    };

    return (
        <>
            <Accordion className={classes.accordionContainer} expanded={props.expanded === 'panel1'} onChange={props.handleChangeAccordion('panel1')}>
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{ cursor: 'default' }}
                >
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid item className={classes.title}>
                            <Image src='/icons/checkout/informacion-de-envio.svg' height={32} width={32} />
                            <Typography variant="h6" color="textSecondary" className={classes.titleMargin}>
                                Datos de entrega
                        </Typography>
                        </Grid>
                        {props.expanded !== 'panel1' && (
                            <Grid item className={classes.alignIcons}>
                                {/* <Button onClick={props.onClick}>
                                    <EditIcon fontSize="medium" />
                                </Button> */}
                                <IconButton style={{ padding: '0px', marginRight: theme.spacing(2) }}>
                                    <EditIcon fontSize="medium" />
                                </IconButton>
                                <CheckCircleIcon fontSize="medium" color="primary" />
                            </Grid>
                        )}
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <LocationSearchInput value={form.deliveryForm ?.addressName} handleChange={handleAddressChange} name="addressName" />
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
                        <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                            <Box display="flex" alignItems="center" color="#F89719">
                                <ErrorIcon fontSize='small' style={{ marginRight: "8px" }} />
                                <Typography variant="body1" style={{ fontSize: '14px' }}>
                                    Luego podrás cambiar los datos de entrega desde tu perfil
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" style={{ marginBottom: theme.spacing(1) }}>
                                ¿Tienes alguna restricción a la hora de ingerir algún tipo de alimento?
                            </Typography>
                            <TextInput
                                name="restrictions"
                                label="Ingrese aquí sus restricciones (solo si aplica)"
                                value={form.deliveryForm.restrictions}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RoundedButton label="Continuar" onClick={props.handleChangeStep} style={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>










            {/* <FormPaperWithIcons title="Datos de entrega" initialIcon="/icons/checkout/informacion-de-envio.svg" finalIcons>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <LocationSearchInput value={form.deliveryForm ?.addressName} handleChange={handleAddressChange} name="addressName" />
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

                    <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                        <Box display="flex" alignItems="center" color="#F89719">
                            <ErrorIcon fontSize='small' style={{ marginRight: "8px" }} />
                            <Typography variant="body1" style={{ fontSize: '14px' }}>
                                Luego podrás cambiar los datos de entrega desde tu perfil
                        </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" style={{ marginBottom: theme.spacing(1) }}>
                            ¿Tienes alguna restricción a la hora de ingerir algún tipo de alimento?
                    </Typography>
                        <TextInput
                            name="restrictions"
                            label="Ingrese aquí sus restricciones (solo si aplica)"
                            value={form.deliveryForm.restrictions}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <RoundedButton label="Continuar" onClick={props.onClick} style={{ width: '100%' }} />
                    </Grid>
                </Grid>
            </FormPaperWithIcons> */}
        </>
    );
});

export default ShipmentForm;




