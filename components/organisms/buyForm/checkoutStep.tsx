import React, { useState, useEffect } from "react";
import { useBuyFlow, useUserInfoStore } from "@stores";
import { Container, Grid, Typography, useTheme } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";
import CheckoutDetails from "../checkoutDetails";
import { getGeometry } from "helpers/utils/geocode";
import PurchaseConditionsModal from "../../molecules/legalModals/purchaseConditionsModal";
import * as ga from "../../../helpers/ga";
import { useLang } from "@hooks";
import { updateSubscriber } from "helpers/serverRequests/mailingList";
import { getFormattedAddressFromGoogle, OtherAddressInformation } from "helpers/utils/utils";
import TagManager from "react-gtm-module";

export const skuPlanMap = {
    PLGOUR: {
        name: "Plan Gourmet",
        wordpressId: "4410",
        index: 1,
    },
    PLFML1: {
        name: "Plan Familiar",
        wordpressId: "4394",
        index: 2,
    },
    PLVEGE: {
        name: "Plan Vegetariano",
        wordpressId: "4352",
        index: 3,
    },
    PLVEGA: {
        name: "Plan Vegano",
        wordpressId: "4330",
        index: 4,
    },
    PLAHOR: {
        name: "Plan Sorpresa",
        wordpressId: "4021",
        index: 5,
    },
};

interface CheckoutStepProps {
    // handleSubmitPayment: () => void;
}

export const CheckoutStep = (props: CheckoutStepProps) => {
    const [lang] = useLang("checkoutStep");
    const theme = useTheme();
    const form = useBuyFlow((state) => state.form);
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const { userInfo, setuserInfo } = useUserInfoStore(({ userInfo, setuserInfo }) => ({ userInfo, setuserInfo }));
    const [deliveryData, setdeliveryData] = useState({
        addressName: form.deliveryForm?.addressName || "",
        addressDetails: form.deliveryForm?.addressDetails || "",
        firstName: form.deliveryForm?.firstName || "",
        lastName: form.deliveryForm?.lastName || "",
        phone1: form.deliveryForm?.phone1 || "",
        latitude: form.deliveryForm?.latitude || "",
        longitude: form.deliveryForm?.longitude || "",
        restrictions: "",
        city: form.deliveryForm?.city ?? "",
        province: form.deliveryForm?.province ?? "",
        country: form.deliveryForm?.country ?? "",
        postalCode: form.deliveryForm?.postalCode ?? "",
    });
    const [openPurchaseConditionsModal, setOpenPurchaseConditionsModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        TagManager.dataLayer({
            dataLayer: {
                event: "begin_checkout",
                ecommerce: {
                    items: [
                        {
                            item_name: skuPlanMap[form.planSku as keyof typeof skuPlanMap].name,
                            item_id: skuPlanMap[form.planSku as keyof typeof skuPlanMap].wordpressId,
                            price: form.variant?.priceWithOffer ?? form.variant?.price,
                            item_brand: "LetsCook",
                            item_category: form.variant?.numberOfPersons,
                            item_category2: form.variant?.numberOfRecipes,
                            index: skuPlanMap[form.planSku as keyof typeof skuPlanMap].index,
                            quantity: 1,
                        },
                    ],
                },
            },
        });
    }, []);

    const handleChangeAccordion = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : expanded === "panel2" ? "panel2" : "panel1");
    };

    const changeToSecondStep = async () => {
        // ga.event({
        //     action: "clic en continuar",
        //     params: {
        //         event_category: "checkout",
        //         event_label: "datos de entrega",
        //     },
        // });

        const googleAddress = await getGeometry(deliveryData.addressName);
        const moreAddresInformation: OtherAddressInformation = getFormattedAddressFromGoogle(googleAddress.results[0]?.address_components);

        updateSubscriber(userInfo.email, {
            phone: deliveryData.phone1,
            name: deliveryData.firstName,
            last_name: deliveryData.lastName,
            country: moreAddresInformation.country ?? deliveryData.addressName ?? "España",
            city: moreAddresInformation.city ?? deliveryData.addressName,
            state: moreAddresInformation.province ?? deliveryData.addressName,
            zip: moreAddresInformation.postalCode ?? deliveryData.addressName,
            shopify_note: deliveryData.restrictions,
        });

        TagManager.dataLayer({
            dataLayer: {
                event: "add_shipping_info",
                ecommerce: {
                    items: [
                        {
                            item_name: skuPlanMap[form.planSku as keyof typeof skuPlanMap].name,
                            item_id: skuPlanMap[form.planSku as keyof typeof skuPlanMap].wordpressId,
                            item_brand: "LetsCook",
                            item_category: form.variant?.numberOfPersons,
                            item_category2: form.variant?.numberOfRecipes,
                            price: form.variant?.priceWithOffer ?? form.variant?.price,
                            index: skuPlanMap[form.planSku as keyof typeof skuPlanMap].index,
                            quantity: 1,
                        },
                    ],
                },
            },
        });
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
            const response = await getGeometry(newAddress.description);
            const moreAddresInformation: OtherAddressInformation = getFormattedAddressFromGoogle(response.results[0]?.address_components);

            setdeliveryData({
                ...deliveryData,
                addressName: newAddress.description,
                latitude: response.results[0].geometry.location.lat,
                longitude: response.results[0].geometry.location.lng,
                city: moreAddresInformation.city,
                province: moreAddresInformation.province,
                country: moreAddresInformation.country,
                postalCode: moreAddresInformation.postalCode,
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
            !!deliveryData.phone1 &&
            deliveryData.phone1.length > 7
        );
    };

    // Purchase Conditions Modal Functions

    const handleOpenPurchaseConditionsModal = () => {
        setOpenPurchaseConditionsModal(true);
    };

    const handleClosePurchaseConditionsModal = () => {
        setOpenPurchaseConditionsModal(false);
    };

    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} style={{ paddingTop: theme.spacing(8), paddingBottom: theme.spacing(6) }}>
                        <Container style={{ maxWidth: "650px" }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src="/icons/checkout/verified.svg" width={24} height={24} />
                                        <Typography variant="h5" style={{ marginLeft: theme.spacing(1) }} color="primary">
                                            {lang.title}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <ShipmentForm
                                        lang={lang.shipmentForm}
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
                                    <PaymentForm
                                        lang={lang.paymentForm}
                                        expanded={expanded}
                                        handleChangeAccordion={handleChangeAccordion}
                                        deliveryData={deliveryData}
                                        panelNumber="panel2"
                                        handleOpenPurchaseConditionsModal={handleOpenPurchaseConditionsModal}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: theme.spacing(4) }}>
                                    <IconsWithText lang={lang.iconsWithText} />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CheckoutDetails lang={lang.checkoutDetails} />
                    </Grid>
                </Grid>
            </Container>
            <PurchaseConditionsModal open={openPurchaseConditionsModal} handleClose={handleClosePurchaseConditionsModal} />
        </>
    );
};

export default CheckoutStep;
