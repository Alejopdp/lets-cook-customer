import React, { useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Rating } from "@material-ui/lab";
import { useMediaQuery } from "@material-ui/core";
import * as ga from "../../../helpers/ga";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import PlanSelector from "./planSelector";
import CheckoutDetailItem from "./checkoutDetailItem/checkoutDetailItem";
import CheckoutDetailPlanPrice from "./checkoutDetailItem/checkoutDetailPlanPrice";
import { Box } from "@material-ui/core";
import CouponInputAccordion from "./couponInputAccordion/couponInputAccordion";
import { useBuyFlow, useUserInfoStore } from "@stores";
import { useSnackbar } from "notistack";
import { getCouponValidation } from "helpers/serverRequests/coupon";
import AppliedCouponBox from "./appliedCouponBox/appliedCouponBox";
import CheckoutValueItem from "./checkoutValueItem/checkoutValueItem";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    generalBoxContainer: {
        [theme.breakpoints.up("md")]: {
            padding: `${theme.spacing(5)}px ${theme.spacing(6)}px`,
            position: "fixed",
            maxWidth: 500,
            right: 0,
            minHeight: "100vh",
        },
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing(5)}px ${theme.spacing(3)}px`,
        [theme.breakpoints.down("sm")]: {
            borderRadius: '8px',
            border: '1px dashed rgba(0,0,0,0.1)'
        },
    }
}));

export default function CheckoutDetails() {
    const classes = useStyles();
    const theme = useTheme();
    const { form, setCoupon, toFirstStep } = useBuyFlow(({ form, setCoupon, toFirstStep }) => ({ form, setCoupon, toFirstStep }));
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
    const router = useRouter();

    const planVariantPrice = form.variant?.priceWithOffer || form.variant?.price;

    const totalValue = useMemo(() => {
        const shippingCost = form.deliveryForm?.shippingCost || 0;
        if (!form.coupon?.id) return planVariantPrice + shippingCost;

        return form.coupon?.discount_type.type === "percent"
            ? `${planVariantPrice - (planVariantPrice * form.coupon?.discount_type.value) / 100 + shippingCost}€`
            : form.coupon?.discount_type.type === "fix" || form.coupon?.discount_type.type === "fixed"
            ? `${planVariantPrice - form.coupon?.discount_type.value + shippingCost}€`
            : planVariantPrice;
    }, [form.coupon, form.deliveryForm?.shippingCost, form.variant?.priceWithOffer, form.variant?.price]);

    const handleCouponSubmit = async (couponCode: string) => {
        ga.event({
            action: "clic en aplicar cupon",
            params: {
                event_category: "checkout",
                event_label: "cupon de descuento",
            },
        });
        const res = await getCouponValidation(couponCode, userInfo.id, form.deliveryForm?.shippingCost, form.planCode, form.variant?.id);

        if (res.status === 200) {
            setCoupon(res.data);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleRemoveCoupon = () => {
        setCoupon({
            id: "",
            code: "",
            discount_type: {
                type: "",
                value: null,
            },
            minimum_requirement: {
                type: "none",
                value: null,
            },
            apply_to: {
                type: "all",
                value: [],
            },
            limites: [],
            coupons_by_subscription: {
                type: "only_fee",
                value: 0,
            },
            date_rage: {
                start: "2021-07-16T12:47:00.000Z",
                expire: "2021-07-24T12:51:00.000Z",
            },
        });
    };

    const handleClickEditPlan = () => {
        ga.event({
            action: "clic en editar plan",
            params: {
                event_category: "checkout",
                event_label: form.planSlug,
            },
        });
        toFirstStep();
    };

    console.log("form", form);
    return (
        <Box
            className={classes.generalBoxContainer}
            style={{
                // // display: "flex",
                // position: "fixed",
                // maxWidth: 500,
                // right: 0,
                // // flexDirection: "column",
                // backgroundColor: theme.palette.background.paper,
                // minHeight: "100vh",
                // padding: isSmDown ? `${theme.spacing(5)}px ${theme.spacing(2)}px` : `${theme.spacing(5)}px ${theme.spacing(6)}px`,
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                style={{
                    backgroundColor: theme.palette.background.paper,
                    // padding: isSmDown ? `${theme.spacing(5)}px ${theme.spacing(2)}px` : `${theme.spacing(5)}px ${theme.spacing(6)}px`,
                }}
            >
                <Typography variant="h5">Resumen de compra</Typography>
                <PlanSelector
                    planIcon={form.planImageUrl ? form.planImageUrl : "/icons/appbar/img-header-select-plan.svg"}
                    planName={form.planName}
                    planVariantLabel={form.variant.label}
                    onClick={handleClickEditPlan}
                />
                <Box paddingTop={4} borderTop="2px dashed #E5E5E5" borderBottom="2px solid #E5E5E5">
                    <CheckoutDetailPlanPrice
                        title="Valor del plan"
                        price={form.variant?.price}
                        priceWithOffer={form.variant?.priceWithOffer}
                    />
                    {!!form.deliveryForm.shippingCost && (
                        <CheckoutDetailItem title="Costes de envío" value={`${form.deliveryForm?.shippingCost}€` || "Envío gratis"} />
                    )}
                    {form.coupon?.id && (
                        <CheckoutDetailItem
                            title={`Descuento ${form.coupon?.discount_type.type === "percent" ? "del" : "de"} ${
                                form.coupon?.discount_type.value || form.deliveryForm?.shippingCost || 0
                            } ${form.coupon?.discount_type.type === "percent" ? "%" : "€"}`}
                            value={
                                form.coupon?.discount_type.type === "percent"
                                    ? `- ${(planVariantPrice * form.coupon?.discount_type.value) / 100}€`
                                    : form.coupon?.discount_type.type === "fix" || form.coupon?.discount_type.type === "fixed"
                                    ? `- ${form.coupon?.discount_type.value}€`
                                    : `${form.deliveryForm?.shippingCost || 0}€`
                            }
                            isDiscountItem={true}
                        />
                    )}
                </Box>
                {form.coupon?.id && form.coupon.coupons_by_subscription.type === "only_fee" ? (
                    <>
                        <CheckoutValueItem title="Precio final primer entrega" value={totalValue} />
                        <CheckoutValueItem
                            title="Precio a partir de la segunda entrega"
                            value={(planVariantPrice || 0) + form.deliveryForm?.shippingCost || 0}
                        />
                    </>
                ) : form.coupon?.id && form.coupon.coupons_by_subscription.type === "more_one_fee" ? (
                    <>
                        <CheckoutValueItem
                            title={`Precio final de las primeras ${form.coupon?.coupons_by_subscription.value} entregas`}
                            value={totalValue}
                        />
                        <CheckoutValueItem
                            title={`Precio luego de las ${form.coupon?.coupons_by_subscription.value} entregas`}
                            value={(planVariantPrice || 0) + form.deliveryForm?.shippingCost || 0}
                        />
                    </>
                ) : (
                    <CheckoutValueItem title="Precio final" value={totalValue} />
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: theme.spacing(0.5) }}>
                    <Typography variant="caption" color="textSecondary">
                        Impuestos incluidos
                    </Typography>
                </div>
                <div style={{ marginTop: theme.spacing(3) }}>
                    {form.coupon?.id ? (
                        <AppliedCouponBox couponCode={form.coupon.code} handleRemoveCoupon={handleRemoveCoupon} />
                    ) : (
                        <CouponInputAccordion handleSubmit={handleCouponSubmit} />
                    )}
                </div>
                <Box marginTop={4} paddingTop={4} borderTop="2px dashed #E5E5E5">
                    {form.deliveryForm.shippingDayLabel && (
                        <div style={{ display: "flex" }}>
                            <img width={24} height={24} src="/icons/checkout/informacion-de-envio.svg" />
                            <Typography variant="body2" style={{ fontSize: "14px", paddingLeft: theme.spacing(2) }}>
                                Tu primer pedido llegará este <strong>{form.deliveryForm.nextShippingDate}</strong>. Recibirás un correo con
                                el horario de entrega. Luego, todas las entregas se realizarán los {form.deliveryForm.shippingDayLabel}
                            </Typography>
                        </div>
                    )}
                    {/* Agregar foto del plan seleccionado */}
                    {/* <img
                        src={form.planImageUrl}
                        alt="checkout-image"
                        style={{ width: "100%", borderRadius: "8px", marginTop: theme.spacing(4) }}
                    /> */}
                    <Grid container spacing={2} alignItems="center" style={{ marginTop: theme.spacing(4) }}>
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: "flex", marginBottom: theme.spacing(1) }}>
                                <img src="/assets/img-google-logo.png" style={{ width: "80px", marginRight: theme.spacing(1) }} />
                                <Typography variant="subtitle1" style={{ fontSize: "14px" }}>
                                    Rating
                                </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                                <Typography variant="h6" style={{ fontSize: "14px", marginRight: theme.spacing(1) }}>
                                    <b>5.0</b>
                                </Typography>
                                <Rating name="read-only" value={5} readOnly />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" style={{ fontSize: "13px" }}>
                                Tenemos una calificación excelente en <strong>149 opiniones</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
