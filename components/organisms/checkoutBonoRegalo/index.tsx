import React, { memo, useState } from "react";
// import { useBuyFlow } from "@stores";
import { Container, Grid, Typography, useTheme } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";
import CheckoutDetails from "../../../components/organisms/checkoutDetails";
import { getGeometry } from "helpers/utils/geocode";
import { BuyerInfoForm } from "components/molecules/buyerInfoForm";
import { BeneficiaryInfoForm } from "components/molecules/beneficiaryInfoForm";

interface CheckoutStepProps {
    // handleSubmitPayment: () => void;
}

const CheckoutBonoRegalo = memo((props: CheckoutStepProps) => {
    const theme = useTheme();

    // let form = {
    //     planCode: "",
    //     planName: "",
    //     planDescription: "",
    //     planSlug: "",
    //     weekLabel: "",
    //     variant: {
    //         id: "",
    //         sku: "",
    //         name: "",
    //         numberOfPersons: 0,
    //         numberOfRecipes: 0,
    //         attributes: [],
    //         label: "",
    //     },
    //     deliveryForm: {
    //         addressName: "",
    //         addressDetails: "",
    //         firstName: "",
    //         lastName: "",
    //         phone1: "",
    //         restrictions: "",
    //         latitude: null,
    //         longitude: null,
    //         shippingCost: 0,
    //         shippingDayLabel: "",
    //         nextShippingDate: "",
    //     },
    //     paymentMethod: {
    //         id: "",
    //         type: "",
    //         stripeId: "",
    //     },
    //     coupon: {
    //         id: "",
    //         code: "",
    //         discount_type: {
    //             type: "",
    //             value: null,
    //         },
    //         minimum_requirement: {
    //             type: "none",
    //             value: null,
    //         },
    //         apply_to: {
    //             type: "all",
    //             value: [],
    //         },
    //         limites: [],
    //         coupons_by_subscription: {
    //             type: "",
    //             value: 0,
    //         },
    //         date_rage: {
    //             start: "",
    //             expire: "",
    //         },
    //     },
    //     recipes: [],
    //     subscriptionId: "",
    //     firstOrderId: "",
    //     firstOrderShippingDate: "",
    //     canChooseRecipes: true,
    // }

    const [expanded, setExpanded] = useState<string | false>("panel1");
    const [deliveryData, setdeliveryData] = useState({
        // addressName: form.deliveryForm ?.addressName || "",
        // addressDetaeils: form.deliveryForm ?.addressDetails || "",
        // firstName: form.deliveryForm ?.firstName || "",
        // lastName: form.deliveryForm ?.lastName || "",
        // phone1: form.deliveryForm ?.phone1 || "",
        // latitude: form.deliveryForm ?.latitude || "",
        // longitude: form.deliveryForm ?.longitude || "",
        addressName: "",
        addressDetaeils: "",
        firstName: "",
        lastName: "",
        phone1: "",
        latitude: "",
        longitude: "",
    });

    const handleChangeAccordion = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : expanded === "panel3" ? "panel3" : expanded === "panel2" ? "panel2" : "panel1");
    };

    const changeToSecondStep = () => {
        setExpanded("panel2");
    };

    const changeToThird = () => {
        setExpanded("panel3");
    };
    const handleDeliveryDataChange = (event) => {
        setdeliveryData({
            ...deliveryData,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddressChange = async (newAddress) => {
        if (newAddress) {
            const response = await getGeometry(newAddress.description);

            setdeliveryData({
                ...deliveryData,
                addressName: newAddress.description,
                latitude: response.results[0].geometry.location.lat,
                longitude: response.results[0].geometry.location.lng,
            });
        }
    };

    const isDeliveryFormCompleted = (): boolean => {
        // return (
        //     !!deliveryData.addressName &&
        //     !!deliveryData.latitude &&
        //     !!deliveryData.longitude &&
        //     !!deliveryData.firstName &&
        //     !!deliveryData.lastName &&
        //     !!deliveryData.phone1
        // );
        return true;
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
                                <BuyerInfoForm
                                    deliveryData={deliveryData}
                                    isFormCompleted={isDeliveryFormCompleted}
                                    handleChange={handleDeliveryDataChange}
                                    handleAddressChange={handleAddressChange}
                                    expanded={expanded}
                                    handleChangeAccordion={handleChangeAccordion}
                                    handleChangeStep={changeToSecondStep}
                                    setDeliveryData={setdeliveryData}
                                    panelNumber="panel1"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <BeneficiaryInfoForm
                                    deliveryData={deliveryData}
                                    isFormCompleted={isDeliveryFormCompleted}
                                    handleChange={handleDeliveryDataChange}
                                    handleAddressChange={handleAddressChange}
                                    expanded={expanded}
                                    handleChangeAccordion={handleChangeAccordion}
                                    handleChangeStep={changeToThird}
                                    setDeliveryData={setdeliveryData}
                                    panelNumber="panel2"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PaymentForm
                                    expanded={expanded}
                                    handleChangeAccordion={handleChangeAccordion}
                                    deliveryData={deliveryData}
                                    panelNumber="panel3"
                                />
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

export default CheckoutBonoRegalo;
