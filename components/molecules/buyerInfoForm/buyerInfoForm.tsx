import React, { memo, useEffect } from "react";
import { getShippingCost } from "@helpers";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// External components
import { Typography, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Image from "next/image";
import IconButton from "@material-ui/core/IconButton";

// Internal components
import { TextInput, RoundedButton } from "@atoms";
import { BuyerInfoFormProps } from "./interfaces";
import { useBuyFlow, useUserInfoStore } from "@stores";
import PhoneNumberInput from "../../atoms/phoneNumberInput/phoneNumberInput";
import { useSnackbar } from "notistack";

// Icons & Images
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useLang } from "@hooks";

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

export const BuyerInfoForm = memo((props: BuyerInfoFormProps) => {
    const theme = useTheme();
    const [lang] = useLang("bonoRegalo");
    const classes = useStylesAccordion();
    const { setDeliveryInfo, form } = useBuyFlow(({ setDeliveryInfo, form }) => ({ setDeliveryInfo, form }));
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();

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
            } else {
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
                                {lang.buyerInfoForm.title}
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
                                label={lang.buyerInfoForm.accordionDetails.name.label}
                                disabled={!!form.deliveryForm?.addressName}
                                value={props.deliveryData.addressDetails}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextInput
                                name="buyerSurname"
                                label={lang.buyerInfoForm.accordionDetails.surname.label}
                                disabled={!!form.deliveryForm?.addressName}
                                value={props.deliveryData.addressDetails}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PhoneNumberInput
                                value={props.deliveryData?.phone1}
                                name={lang.buyerInfoForm.accordionDetails.phone.label}
                                handleChange={props.handleChange}
                                disabled={!!form.deliveryForm?.phone1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RoundedButton
                                label={lang.buyerInfoForm.accordionDetails.continue.label}
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

export default BuyerInfoForm;
