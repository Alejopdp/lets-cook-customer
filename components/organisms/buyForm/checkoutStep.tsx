import React, { memo, useState } from "react";
import { useBuyFlow } from "@stores";
import { Container, Grid, Typography, useTheme } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";
import CheckoutDetails from "../checkoutDetails";
import { getGeometry } from "helpers/utils/geocode";

interface CheckoutStepProps {
    // handleSubmitPayment: () => void;
}

export const CheckoutStep = memo((props: CheckoutStepProps) => {
    const theme = useTheme();

    const form = useBuyFlow((state) => state.form);
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const [deliveryData, setdeliveryData] = useState({
        addressName: form.deliveryForm?.addressName || "",
        addressDetails: form.deliveryForm?.addressDetails || "",
        firstName: form.deliveryForm?.firstName || "",
        lastName: form.deliveryForm?.lastName || "",
        phone1: form.deliveryForm?.phone1 || "",
        latitude: form.deliveryForm?.latitude || "",
        longitude: form.deliveryForm?.longitude || "",
    });

    const handleChangeAccordion = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : expanded === "panel2" ? "panel2" : "panel1");
    };

    const changeToSecondStep = () => {
        setExpanded("panel2");
    };

    const handleDeliveryDataChange = (event) => {
        setdeliveryData({
            ...deliveryData,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddressChange = async (newAddress) => {
        if (newAddress) {
            const geometry = await getGeometry(newAddress.structured_formatting.main_text);

            setdeliveryData({
                ...deliveryData,
                addressName: newAddress.description,
                latitude: geometry.lat,
                longitude: geometry.lng,
            });
        }
    };

    const isDeliveryFormCompleted = (): boolean => {
        return (
            !!deliveryData.addressName &&
            !!deliveryData.latitude &&
            !!deliveryData.longitude &&
            !!deliveryData.firstName &&
            !!deliveryData.lastName &&
            !!deliveryData.phone1
        );
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} style={{ paddingTop: theme.spacing(8), paddingBottom: theme.spacing(6) }}>
                    <Container style={{ maxWidth: "650px" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src="/icons/checkout/verified.svg" width={24} height={24} />
                                    <Typography variant="h5" style={{ marginLeft: theme.spacing(1) }}>
                                        Pago 100% seguro
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <ShipmentForm
                                    deliveryData={deliveryData}
                                    isFormCompleted={isDeliveryFormCompleted}
                                    handleChange={handleDeliveryDataChange}
                                    handleAddressChange={handleAddressChange}
                                    expanded={expanded}
                                    handleChangeAccordion={handleChangeAccordion}
                                    handleChangeStep={changeToSecondStep}
                                    setDeliveryData={setdeliveryData}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PaymentForm
                                    expanded={expanded}
                                    handleChangeAccordion={handleChangeAccordion}
                                    deliveryData={deliveryData}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: theme.spacing(4) }}>
                                <IconsWithText />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CheckoutDetails />
                </Grid>
            </Grid>
        </Container>
    );
});

export default CheckoutStep;
