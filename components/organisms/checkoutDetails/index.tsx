import React, { useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Rating } from '@material-ui/lab';

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import PlanSelector from "./planSelector";
import CheckoutDetailItem from "./checkoutDetailItem/checkoutDetailItem";
import { Box } from "@material-ui/core";
import CouponInputAccordion from "./couponInputAccordion/couponInputAccordion";
import { useBuyFlow, useUserInfoStore } from "@stores";
import { useSnackbar } from "notistack";
import { getCouponValidation } from "helpers/serverRequests/coupon";
import AppliedCouponBox from "./appliedCouponBox/appliedCouponBox";
import CheckoutValueItem from "./checkoutValueItem/checkoutValueItem";


const useStyles = makeStyles((theme) => ({

}));

export default function CheckoutDetails() {
    const classes = useStyles();
    const theme = useTheme();
    const { form, setCoupon } = useBuyFlow(({ form, setCoupon }) => ({ form, setCoupon }));
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { enqueueSnackbar } = useSnackbar();

    // useEffect(() => {

    // }, [])

    const totalValue = useMemo(() => {
        const shippingCost = form.deliveryForm ?.shippingCost || 0;
        if (!form.coupon ?.id) return form.variant ?.price + shippingCost;

        return form.coupon ?.discount_type.type === "percentage"
            ? `${(form.variant ?.price / form.coupon ?.discount_type.value + shippingCost) * 100}€`
            : `${form.variant ?.price - form.coupon ?.discount_type.value + shippingCost}€`;
    }, [form.coupon, form.deliveryForm ?.shippingCost]);

    const handleCouponSubmit = async (couponCode: string) => {
        console.log("EL FORM PAPAI: ", form);
        const res = await getCouponValidation(couponCode, userInfo.id, form.deliveryForm ?.shippingCost, form.planCode, form.variant ?.id);

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

    return (
        <Box style={{
            dispay: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            height: '100%',
            padding: `${theme.spacing(5)}px ${theme.spacing(6)}px`
        }}>
            <Typography variant="h5">Resumen de compra</Typography>
            <PlanSelector
                planIcon="http://localhost:3000/development/plans/Plan_test/Plan_test.png"
                planName="Plan Familiar"
                planVariantLabel="4 recetas para 3 personas a 3,33 €/ración"
            />
            <Box paddingTop={4} borderTop="2px dashed #E5E5E5" borderBottom="2px solid #E5E5E5">
                <CheckoutDetailItem title="Valor del plan" value={`${form.variant ?.price} €/ semana`} />
                <CheckoutDetailItem title="Costes de envío" value={`${form.deliveryForm ?.shippingCost}€` || "Envío gratis"} />
                {form.coupon ?.id && (
                    <CheckoutDetailItem
                        title={`Descuento ${form.coupon ?.discount_type.type === "percentage" ? "del" : "de"} ${
                            form.coupon ?.discount_type.value
                        } ${form.coupon ?.discount_type.type === "percentage" ? "%" : "€"}`}
                        value={
                            form.coupon ?.discount_type.type === "percentage"
                                ? `- ${form.coupon ?.discount_type.value}%`
                                : `- ${form.coupon ?.discount_type.value}€`
                        }
                    />
                )}
            </Box>
            {form.coupon ?.id && form.coupon.coupons_by_subscription.type === "only_fee" ? (
                <>
                    <CheckoutValueItem title="Valor del primer cargo" value={totalValue} />
                    <CheckoutValueItem
                        title="Valor a partir del segundo cargo"
                        value={(form.variant ?.price || 0) + form.deliveryForm ?.shippingCost || 0}
                    />
                </>
            ) : form.coupon ?.id && form.coupon.coupons_by_subscription.type === "more_one_fee" ? (
                <>
                    <CheckoutValueItem
                        title={`Valor de los primeros ${form.coupon ?.coupons_by_subscription.value} cargos`}
                        value={totalValue}
                    />
                    <CheckoutValueItem
                        title="Valor a partir del XXX cargo"
                        value={(form.variant ?.price || 0) + form.deliveryForm ?.shippingCost || 0}
                    />
                </>
            ) : (
                    <CheckoutValueItem title="Valor total" value={totalValue} />
                )}
            {form.coupon ?.id ? (
                <AppliedCouponBox couponCode={form.coupon.code} handleRemoveCoupon={handleRemoveCoupon} />
            ) : (
                    <CouponInputAccordion handleSubmit={handleCouponSubmit} />
                )}
            <Box marginTop={4} paddingTop={4} borderTop="2px dashed #E5E5E5">
                <div style={{ display: 'flex' }}>
                    <img
                        width={24}
                        height={24}
                        src='/icons/checkout/informacion-de-envio.svg'
                    />
                    <Typography variant='body2' style={{ fontSize: '14px', paddingLeft: theme.spacing(2) }}>
                        Tu primer pedido llegará este <strong>martes 25 de mayo</strong>. Recibirás un correo con el horario de entrega. Luego, todas las entregas se realizarán los martes.
                    </Typography>
                </div>
                <img src='/assets/empty-image-checkout.png' alt='checkout-image' style={{ width: '100%', borderRadius: '8px', marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }} />
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} sm={6}>
                        <div style={{ display: 'flex', marginBottom: theme.spacing(1) }}>
                            <img src="/assets/img-google-logo.png" style={{ width: '80px', marginRight: theme.spacing(1) }} />
                            <Typography variant="subtitle1" style={{ fontSize: '14px' }}>Rating</Typography>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Typography variant="h6" style={{ fontSize: '14px', marginRight: theme.spacing(1) }}><b>5.0</b></Typography>
                            <Rating name="read-only" value={5} readOnly />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='body2' style={{ fontSize: '13px' }}>Tenemos una calificación excelente en <strong>108 opiniones</strong></Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
