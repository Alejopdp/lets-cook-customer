import React, { memo, useState, useEffect } from "react";
import { getGeometry } from "../../../helpers/utils/geocode";
import { getShippingCost } from "@helpers";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// External components
import { Box, Typography, useTheme } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStylesAccordion = makeStyles((theme: Theme) =>
    createStyles({
        accordionContainer: {
            padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
            borderRadius: "8px !important",
            boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
            webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
            mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        },
        title: {
            display: "flex",
            alignItems: "center",
        },
        titleMargin: {
            marginLeft: theme.spacing(1.5),
        },
        alignIcons: {
            display: "flex",
            alignItems: "center",
        },
        boxChangeProfileDataLater: {
            backgroundColor: "rgba(0,165,85,0.1)",
            padding: "16px",
            color: theme.palette.text.primary,
            border: "1px dashed #707070",
            borderRadius: "4px",
        },
        shipmentFormContainer: {
            "& div.MuiInputBase-root.Mui-disabled": {
                color: theme.palette.text.secondary,
                opacity: "0.3",
            },
            "& div.react-tel-input input.form-control[disabled]": {
                color: theme.palette.text.secondary,
                opacity: "0.3",
                cursor: "default",
            },
            "& div.react-tel-input input.form-control:focus": {
                borderColor: theme.palette.primary.main,
                borderWidth: "2px",
                boxShadow: "none",
            },
        },
    })
);

export const ShipmentForm = memo((props: ShipmentFormProps) => {
    const theme = useTheme();
    const classes = useStylesAccordion();
    const { setDeliveryInfo, form } = useBuyFlow(({ setDeliveryInfo, form }) => ({ setDeliveryInfo, form }));
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();
    const [isShippingAddressInvalid, setisShippingAddressInvalid] = useState(false);

    useEffect(() => {
        const getShippingCostIfAddressExists = async () => {
            const newLatitude = props.deliveryData?.latitude || userInfo.shippingAddress?.latitude;
            const newLongitude = props.deliveryData?.longitude || userInfo.shippingAddress?.longitude;

            if (!!!newLatitude && !!!newLongitude) return;

            const res = await getShippingCost(newLatitude, newLongitude);

            if (res.status === 200) {
                setDeliveryInfo({
                    ...form.deliveryForm,
                    shippingCost: res.data.cost,
                    shippingDayLabel: res.data.dayLabel,
                    nextShippingDate: res.data.nextShippingDate,
                });
                setisShippingAddressInvalid(false);
            } else {
                setisShippingAddressInvalid(true);
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getShippingCostIfAddressExists();
    }, [props.deliveryData?.latitude, props.deliveryData?.longitude]);

    return (
        <>
            <Accordion
                className={classes.accordionContainer}
                expanded={props.expanded === props.panelNumber}
                onChange={props.handleChangeAccordion(props.panelNumber)}
            >
                <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header" style={{ cursor: "default" }}>
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid item className={classes.title}>
                            <Image src="/icons/checkout/informacion-de-envio.svg" height={32} width={32} />
                            <Typography variant="h6" color="textSecondary" className={classes.titleMargin}>
                                Datos de entrega
                            </Typography>
                        </Grid>
                        {props.expanded !== props.panelNumber && (
                            <Grid item className={classes.alignIcons}>
                                <IconButton style={{ padding: "0px", marginRight: theme.spacing(2) }}>
                                    <EditIcon fontSize="medium" />
                                </IconButton>
                                <CheckCircleIcon fontSize="medium" color="primary" />
                            </Grid>
                        )}
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} className={classes.shipmentFormContainer}>
                        <Grid item xs={12}>
                            <LocationSearchInput
                                name="addressName"
                                label="Dirección"
                                disabled={!!form.deliveryForm?.addressName}
                                value={props.deliveryData.addressName}
                                handleChange={props.handleAddressChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput
                                name="addressDetails"
                                label="Piso / puerta / aclaraciones"
                                disabled={!!form.deliveryForm?.addressName}
                                value={props.deliveryData.addressDetails}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                name="firstName"
                                label="Nombre"
                                value={props.deliveryData.firstName}
                                onChange={props.handleChange}
                                disabled={!!form.deliveryForm?.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                name="lastName"
                                label="Apellido/s"
                                value={props.deliveryData?.lastName}
                                onChange={props.handleChange}
                                disabled={!!form.deliveryForm?.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PhoneNumberInput
                                name="phone1"
                                label="WhatsApp o móvil"
                                value={props.deliveryData?.phone1}
                                handleChange={props.handleChange}
                                disabled={!!form.deliveryForm?.phone1}
                            />
                        </Grid>
                        {form.deliveryForm?.addressName && (
                            <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                                <Box display="flex" alignItems="center" className={classes.boxChangeProfileDataLater}>
                                    <ErrorIcon fontSize="small" style={{ marginRight: "8px" }} />
                                    <Typography variant="body1" style={{ fontSize: "14px" }}>
                                        Podrás actualizar los datos en tu perfil
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Typography variant="body2" style={{ marginBottom: theme.spacing(1) }}>
                                ¿Tienes alguna restricción con algún tipo de ingrediente?
                            </Typography>
                            <TextInput
                                name="restrictions"
                                label="Indica aquí tus restricciones (solo si aplica)"
                                value={props.deliveryData?.restrictions}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RoundedButton
                                label="Continuar"
                                onClick={props.handleChangeStep}
                                style={{ width: "100%" }}
                                disabled={!props.isFormCompleted() || isShippingAddressInvalid}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
});

export default ShipmentForm;
