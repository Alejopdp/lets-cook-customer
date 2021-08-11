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
import { BuyerInfoFormProps } from "./interfaces";
import { useBuyFlow, DeliveryForm, useUserInfoStore } from "@stores";
import PhoneNumberInput from "../../atoms/phoneNumberInput/phoneNumberInput";
import { useSnackbar } from "notistack";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
    })
);

export const BeneficiaryInfoForm = memo((props: BeneficiaryInfoFormProps) => {
    const theme = useTheme();
    const classes = useStylesAccordion();
    const { setDeliveryInfo, form } = useBuyFlow(({ setDeliveryInfo, form }) => ({ setDeliveryInfo, form }));
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getShippingCostIfAddressExists = async () => {
            const newLatitude = props.deliveryData ?.latitude || userInfo.shippingAddress ?.latitude;
            const newLongitude = props.deliveryData ?.longitude || userInfo.shippingAddress ?.longitude;

            if (!!!newLatitude && !!!newLongitude) return;

            const res = await getShippingCost(newLatitude, newLongitude);

            if (res.status === 200) {
                setDeliveryInfo({
                    ...form.deliveryForm,
                    shippingCost: res.data.cost,
                    shippingDayLabel: res.data.dayLabel,
                    nextShippingDate: res.data.nextShippingDate,
                });
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getShippingCostIfAddressExists();
    }, [props.deliveryData ?.latitude, props.deliveryData ?.longitude]);

    return (
        <>
            <Accordion
                className={classes.accordionContainer}
                expanded={props.expanded === props.panelNumber}
                onChange={props.handleChangeAccordion(props.panelNumber)}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{ cursor: "default" }}
                >
                    <Grid item container justify="space-between" alignItems="center">
                        <Grid item className={classes.title}>
                            <Image src="/icons/checkout/informacion-de-envio.svg" height={32} width={32} />
                            <Typography variant="h6" color="textSecondary" className={classes.titleMargin}>
                                Datos del beneficiario
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
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextInput
                                name="buyerName"
                                label="Nombre"
                                disabled={!!form.deliveryForm ?.addressName}
                                value={props.deliveryData.addressDetails}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                name="buyerSurname"
                                label="Apellido/s"
                                disabled={!!form.deliveryForm ?.addressName}
                                value={props.deliveryData.addressDetails}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PhoneNumberInput
                                value={props.deliveryData ?.phone1}
                                name="phone1"
                                handleChange={props.handleChange}
                                disabled={!!form.deliveryForm ?.phone1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput
                                name="buyerSurname"
                                label="Correo electrónico"
                                disabled={!!form.deliveryForm ?.addressName}
                                value={props.deliveryData.addressDetails}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={true}
                                        value={props.value}
                                        onChange={props.handleChange}
                                        color="primary"
                                        name={props.name}
                                    />
                                }
                                label='Quiero enviarle al beneficiario un correo electrónico con la información del plan y las instrucciones de uso'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RoundedButton
                                label="Continuar"
                                onClick={props.handleChangeStep}
                                style={{ width: "100%" }}
                                disabled={!props.isFormCompleted()}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
});

export default BeneficiaryInfoForm;
